const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chat_name : {
        type : String,
        required : true
    },
    users : {
        type : Array,
        required : true
    }
}, {timestamps: true})

const Chat = new mongoose.model('Chat', chatSchema);

module.exports = Chat;