const mongoose = require('mongoose');

const ChatMessagesSchema = new mongoose.Schema({
    chatroomId: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'crossing-users', required: true },
    senderName: { type: String, required: true },
    text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('crossing-chatmessages', ChatMessagesSchema);