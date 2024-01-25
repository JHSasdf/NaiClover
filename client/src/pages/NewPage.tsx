// ChatRoomPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import './ChatRoomPage.css'; // Import the styling file

interface Message {
    text: string;
    isSentByMe?: boolean;
    userId?: string | null; // userId를 string 또는 null로 타입 정의
}

const socket = io('http://localhost:4000');
const USER_ID_COOKIE_KEY = 'id'; // 사용자 ID를 저장한 쿠키의 키

const ChatRoomPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        socket.emit('joinRoom', roomId);

        socket.on('chat message', (msg: Message) => {
            if (msg.userId !== Cookies.get(USER_ID_COOKIE_KEY)) {
                setMessages((prevMessages) => [...prevMessages, msg]);
                console.log(`You: ${msg.text}`);
            }
            console.log(msg);
        });

        // 여기서 사용자의 ID를 쿠키에서 읽어와서 socket.id로 전달합니다.
        socket.emit('userId', Cookies.get(USER_ID_COOKIE_KEY));

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
            userId: Cookies.get(USER_ID_COOKIE_KEY), // 사용자 ID 쿠키에서 읽어옴
        });
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                text: message,
                isSentByMe: false,
                userId: Cookies.get(USER_ID_COOKIE_KEY),
            },
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
                                msg.isSentByMe
                                    ? 'sent-message'
                                    : 'received-message'
                            }`}
                        >
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
