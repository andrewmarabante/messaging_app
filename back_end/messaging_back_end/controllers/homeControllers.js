const User = require('../models/user')

function getUserInfo(req, res){
    userId = req.userInfo.userId;
    User.find({_id : userId})
    .then(result => {res.status(200).json(result[0])})
    .catch(err => res.status(500).json(err))
}

function getFriends(req, res){
    userId = req.userInfo.userId
    User.find({_id : userId})
    .then(result => {
        friendList = result[0].friends
        console.log('check')
        User.find({_id : { $in : friendList }})
        .then((result) => res.json(result))
        .catch(err => res.json(err))
    })
    .catch((err)=> res.status(500).json(err))
}

function getSuggested(req, res){
    userId = req.userInfo.userId
    // friendIds = req.userInfo.friends
    User.find({_id:userId})
    .then((result) => {
        friendList = result[0].friends;
        User.find({_id: {$nin : friendList}})
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
    })
    .catch((err) => {res.status(500).json(err)})
}

function deleteFriend(req, res){
    const friendId = req.body.friendId;
    const userId = req.userInfo.userId;
    User.findByIdAndUpdate(userId, { $pull: { friends: friendId } })
    .then(res.status(200).json('deleted'))
    .catch((err) => res.status(500).json(err))
}

function addFriend(req, res){
    const friendId = req.body.friendId;
    const userId = req.userInfo.userId;

    User.findByIdAndUpdate(userId, {$push: { friends : friendId }})
    .then(res.status(200).json('added'))
    .catch((err)=>{res.status(500).json(err)})
    
}

module.exports = {
    getUserInfo,
    getFriends,
    getSuggested,
    deleteFriend,
    addFriend
}