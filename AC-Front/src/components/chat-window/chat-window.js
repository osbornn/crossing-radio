import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './chat-window.css';
import CrossingInput from '../crossing-input/crossing-input';
import CrossingButton from '../crossing-button/crossing-button';

const socket = io.connect(process.env.REACT_APP_CROSSING_API_URL);

function ChatWindow({ username, userId }) {
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatHistoryEndRef = useRef(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_CROSSING_API_URL + '/api/chat-history', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                setChatHistory(data.chatMessages);
            })
            .catch(error => console.error('Errror : ' + error.message));

        socket.on('receive_global_message', (incomingMessage) => {
            setChatHistory((prev) => [...prev, incomingMessage]);
        });

        return () => {
            socket.off('receive_global_message');
        }
    }, []);

    useEffect(() => {
      chatHistoryEndRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }, [chatHistory])

    const sendMessage = (e) => {
        e.preventDefault();
        if(!chatMessage.trim()) return;

        const chatMessageData = {
            senderId: userId,
            senderName: username,
            text: chatMessage,
        }

        socket.emit('send_global_message', chatMessageData);

        setChatHistory((prev) => [...prev, chatMessageData]);
        setChatMessage('');
    }

    return (
    <div className='crossing-chat-title'>
      <h2>Crossing Chat</h2>
      
      <div className='chat-box'>
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className='chat-history'
            style={{ 
              textAlign: msg.senderId === userId ? 'right' : 'left',
            }}
          >
            <strong>{msg.senderName}: </strong>
            <span className='chat-bubble' style={{ backgroundColor: msg.senderId === userId ? '#daf7a6' : '#eee' }}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={chatHistoryEndRef}/>
      </div>

      <form onSubmit={sendMessage}>
        <div className='chat-input'>
            <CrossingInput width="90%" inputType='text' inputValue={chatMessage} 
            placeholder={"Send something :)"} onChange={(e) => setChatMessage(e.target.value)}></CrossingInput>
        </div>
        <CrossingButton isSubmit text={"Send"}/>
      </form>
    </div>
  );

}

export default ChatWindow;



