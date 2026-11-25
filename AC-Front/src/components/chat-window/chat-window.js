import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './chat-window.css';
import CrossingInput from '../crossing-input/crossing-input';
import CrossingButton from '../crossing-button/crossing-button';

const getMessageDate = (message) => {
  const messageDate = new Date(message.createdAt || message.updatedAt || Date.now());
  return Number.isNaN(messageDate.getTime()) ? new Date() : messageDate;
};

const getDateKey = (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const formatDayHeading = (date) => {
  const day = date.getDate();
  const lastTwoDigits = day % 100;
  const suffix = lastTwoDigits >= 11 && lastTwoDigits <= 13
    ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th');
  const weekdayAndMonth = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
  }).replace(',', '');

  return `${weekdayAndMonth} ${day}${suffix}`;
};

const formatMessageTime = (date) => date.toLocaleTimeString([], {
  hour: 'numeric',
  minute: '2-digit',
});

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
          createdAt: new Date().toISOString(),
        }

        socket.emit('send_global_message', chatMessageData);

        setChatHistory((prev) => [...prev, chatMessageData]);
        setChatMessage('');
    }

    return (
    <div className='crossing-chat-title'>
      <h2>Crossing Chat</h2>
      
      <div className='chat-box'>
        {chatHistory.map((msg, index) => {
          const messageDate = getMessageDate(msg);
          const previousMessage = chatHistory[index - 1];
          const startsNewDay = !previousMessage
            || getDateKey(getMessageDate(previousMessage)) !== getDateKey(messageDate);

          return (
            <React.Fragment key={msg._id || `${messageDate.toISOString()}-${index}`}>
              {startsNewDay && (
                <div className='chat-day-divider'>
                  <span>{formatDayHeading(messageDate)}</span>
                </div>
              )}
              <div
                className='chat-history'
                style={{ textAlign: msg.senderId === userId ? 'right' : 'left' }}
              >
                <div className='chat-message-meta'>
                  <strong>{msg.senderName}: </strong>
                  <time className='chat-time' dateTime={messageDate.toISOString()}>
                    {formatMessageTime(messageDate)}
                  </time>
                </div>
                <span className='chat-bubble' style={{ backgroundColor: msg.senderId === userId ? '#daf7a6' : '#eee' }}>
                  {msg.text}
                </span>
              </div>
            </React.Fragment>
          );
        })}
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



