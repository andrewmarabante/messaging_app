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
            console.log(result)
            users.forEach((user)=>{
                result.forEach((chat) =>{
                    if(chat.users.includes(user._id) && chat.users.length === 1)
                    {
                        chat.chat_name = user.username
                    }
                })
                console.log(result)
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
    console.log('params:')
    console.log(req.params.id)
    res.json()
}

function newMessage(req,res){
    messageDetails = {
        chat_id : req.params.id,
        sender : req.userInfo.userId
    }

     const newMessage = new Message(messageDetails);

     newMessage.save()
     .then(res.json('saved'))
     .catch(err => res.status(500).json(err))

}

module.exports = {
    getChats,
    newChat,
    getMessages,
    newMessage
}