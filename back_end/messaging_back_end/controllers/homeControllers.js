const User = require('../models/user')

function getUserInfo(req, res){
    userId = req.userInfo.userId;
    User.find({_id : userId})
    .then(result => {res.status(200).json(result[0])})
    .catch(err => res.status(500).json(err))
}

function getFriends(req, res){
    friendIds = req.userInfo.friends
    User.find({_id : { $in : friendIds }})
    .then((result) => res.json(result))
    .catch(err => res.json(err))
}

function getSuggested(req, res){
    friendIds = req.userInfo.friends
    User.find({_id: {$nin : friendIds}})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}



module.exports = {
    getUserInfo,
    getFriends,
    getSuggested
}