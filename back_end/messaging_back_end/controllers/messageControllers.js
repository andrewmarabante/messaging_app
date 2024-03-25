const User = require("../models/user")
const Message = require('../models/message')
const Chat = require('../models/chat')

function getChats(req,res){
    userId = req.userInfo.userId
    Chat.find({ users: userId})
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch((err) => res.status(500).json(err))
}

module.exports = {
    getChats
}