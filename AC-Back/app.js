require('dotenv').config({path: './ac-back-db.env'});
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const ChatMessage = require('./models/chat-model');

const app = express();

const db_uri = process.env.RADIOCROSSING_DB;
const chat_server_url = process.env.CHAT_SERVER_URL;
console.log(db_uri);

const videoRoutes = require('./routes/video-routes');
const userRoutes = require('./routes/user-routes');
const chatRoutes = require('./routes/chat-routes');

mongoose.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to Crossing Radio!!");
    })
    .catch((error) => {
        console.error(error.message);
    });

app.use(cors());
app.use(express.json());
app.use('/api', videoRoutes);
app.use('/api', userRoutes);
app.use('/api', chatRoutes);

// Server configuration for chat system implementation
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: chat_server_url,
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    socket.join("global_chat");

    socket.on('send_global_message', async (data) => {
        socket.to("global_chat").emit('receive_global_message', data);

        try {
            const message = new ChatMessage({
                chatroomId: "global_chat",
                senderId: data.senderId,
                senderName: data.senderName,
                text: data.text
            });
            await message.save();   
        } catch (err) {
            console.error("Error saving chat message: ", err);
        }
    });
});

//Start server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 