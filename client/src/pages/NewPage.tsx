import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './ChatRoomPage.css'; // Import the styling file

interface Message {
  text: string;
  isSentByMe?: boolean; // 추가: 자신이 보낸 메시지 여부
}

const socket = io('http://localhost:4000');

const ChatRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('chat message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log(`You: ${msg.text}`);
    });

    return () => {
      socket.off('chat message');
    };
  }, [roomId]);

  const handleSendMessage = () => {
    const message = `You: ${newMessage}`;
    socket.emit('chat message', {
      room: roomId,
      text: message,
      isSentByMe: true,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isSentByMe: true },
    ]);
    setNewMessage('');
  };

  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <ul>
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`message ${
                msg.isSentByMe ? 'sent-message' : 'received-message'
              }`}
            >
              {/* 자신이 보낸 메시지인 경우에만 출력 */}
              {msg.isSentByMe ? msg.text : `Server: ${msg.text}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
