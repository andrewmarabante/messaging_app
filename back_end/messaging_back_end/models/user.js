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
    imageURL : {
        type : String,
    },
    online : {
        type : Boolean,
    },
    friends : {
        type : Array,
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;