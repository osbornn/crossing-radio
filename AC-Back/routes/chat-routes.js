const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chat-model.js');

router.get('/chat-history', async (req, res) => {
    try {
        const chatMessages = await ChatMessage.find();
        res.status(200).json({chatMessages: chatMessages});
    } catch(error) {
        res.status(500).send("Something went wrong when loading the chat history");
    }
});

module.exports = router;