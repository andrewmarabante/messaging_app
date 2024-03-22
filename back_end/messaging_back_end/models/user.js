const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profilePic : {
        type : Image,
        required : true
    },
    online : {
        type : Boolean,
        required : true
    },
    friends : {
        type : Array,
        required : true
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;