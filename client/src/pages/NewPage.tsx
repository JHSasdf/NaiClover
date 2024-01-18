// ChatPage.tsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { generateUniqueId } from '../App';

const socket = io();

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<
    { id: string; message: string; sender: string }[]
  >([]);

  useEffect(() => {
    socket.on(
      'chat message',
      (msg: { id: string; message: string; sender: string }) => {
        setChat((prevChat) => [...prevChat, msg]);
      }
    );

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = () => {
    const newMessage = { id: generateUniqueId(), message, sender: 'me' };
    setChat((prevChat) => [...prevChat, newMessage]);
    socket.emit('chat message', newMessage);
    setMessage('');
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '200px',
          marginBottom: '10px',
        }}
      >
        {chat.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'me' ? '#DCF8C6' : '#FFFFFF',
              padding: '8px',
              borderRadius: '8px',
              margin: '4px',
              maxWidth: '70%',
            }}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
