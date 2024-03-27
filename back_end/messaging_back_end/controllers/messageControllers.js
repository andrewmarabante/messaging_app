const User = require("../models/user")
const Message = require('../models/message')
const Chat = require('../models/chat')


function getChats(req,res){
    userId = req.userInfo.userId;

    Chat.find({ users: userId})
    .then(result => {
        ids = [];
        for(let i = 0; i<result.length;i++){
            if(result[i].users.length === 2){
                let index = result[i].users.indexOf(userId);
                result[i].users.splice(index,1)
                let otherUser = result[i].users;
                ids.push(otherUser)
            }
        }
        User.find({_id : {$in : ids}})
        .then((users) => {
            users.forEach((user)=>{
                result.forEach((chat) =>{
                    if(chat.users.includes(user._id) && chat.users.length === 1)
                    {
                        chat.chat_name = user.username
                    }
                })
            })
            res.status(200).json(result)
        })
    })
    .catch((err) => res.status(500).json(err))
}

function newChat(req,res){

    groupName = req.body.groupName
    userId = req.userInfo.userId
    otherChatIds = req.body.chatIds;
    otherChatIds.push(userId)

    if(groupName){
        const chatDetails = {
            chat_name : groupName,
            users : otherChatIds
        }
        const newChat = new Chat(chatDetails)

        newChat.save()
        .then(res.status(200).json('chat saved'))
        .catch((err) => res.status(500).json(err))
    }
}

function getMessages(req,res){

    chatId = req.params.id
    userId = req.userInfo.userId

    console.log(chatId)
    Message.find({chat_id : chatId})
    .then(result => {
        result.push(userId)
        res.status(200).json(result)})
    .catch(err => res.status(500).json(err))
}

function newMessage(req,res){

    messageDetails = {
        chat_id : req.params.id,
        sender : req.userInfo.userId,
        body : req.body.message
    }

     const newMessage = new Message(messageDetails);

     newMessage.save()
     .then(res.json('saved'))
     .catch(err => res.status(500).json(err))

}

function deleteMessage(req,res){
    messageId = req.body.messageId;

    Message.findByIdAndDelete({_id:messageId})
    .then(result => {
        res.status(200).json('Deleted')})
    .catch(err => res.status(500).json(err))
}

function deleteChat(req,res){
    //Yeah So I guess when I sent the params in before, it included the colon, I don't want
    //to go back and change all that jazz. so I'ma just add it in here and call it a day.
    chatId = req.body.chatId;
    Chat.findByIdAndDelete({ _id : chatId })
    .then(
        Message.deleteMany({chat_id : ':'+chatId})
        .then(result => {
            res.status(200).json('Deleted')}))
        .catch(err => {res.status(500).json(err)})
}

module.exports = {
    getChats,
    newChat,
    getMessages,
    newMessage,
    deleteMessage,
    deleteChat
}