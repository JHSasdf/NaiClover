import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import './ChatRoomPage.css'; // Import the styling file
import axios from 'axios';

interface Message {
    text: string;
    isSentByMe?: boolean;
    userId?: string | null; // userId를 string 또는 null로 타입 정의
}

interface ChatLog {
    chatIndex: number;
    roomNum: string;
    userid: string;
    content: string;
    createdAt: string;
    updataedAt: string;
}

const socket = io('http://localhost:4000');
const USER_ID_COOKIE_KEY = 'id'; // 사용자 ID를 저장한 쿠키의 키

const ChatRoomPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);
    const [chatLog, setChatLog] = useState<ChatLog[]>([]);

    const [cookies] = useCookies(['id']);
    const userid = cookies['id'];

    useEffect(() => {
        // 페이지 로드될 때 쿠키에서 ID를 가져와서 상단에 표시
        const userIdFromCookie = Cookies.get(USER_ID_COOKIE_KEY) || null;
        setUserId(userIdFromCookie);

        socket.emit('joinRoom', roomId);

        socket.on('chat message', (msg: Message) => {
            if (msg.userId !== userIdFromCookie) {
                setMessages((prevMessages) => [...prevMessages, msg]);
                console.log(`You: ${msg.text}`);
            }
            console.log(msg);
        });

        // 여기서 사용자의 ID를 쿠키에서 읽어와서 socket.id로 전달합니다.
        socket.emit('userId', userIdFromCookie);

        return () => {
            socket.off('chat message');
        };
    }, [roomId]);

    const fetchChatLog = async () => {
        const res = await axios({
            url: `/dummy/${roomId}`,
            method: 'get',
        });
        setChatLog(res.data.chatLog);
        console.log(res.data);
    };
    useEffect(() => {
        // 페이지 로드될 때 쿠키에서 ID를 가져와서 상단에 표시
        fetchChatLog();
    }, [messages]);

    const handleSendMessage = () => {
        const message = `You: ${newMessage}`;
        socket.emit('chat message', {
            room: roomId,
            text: message,
            isSentByMe: true,
            userId: userid, // 이미 상단에 표시된 userId 사용
        });
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                text: message,
                isSentByMe: false,
                userId: userid,
            },
        ]);
        setNewMessage('');
    };

    return (
        <div className="chat-room-container">
            {/* 상단에 사용자 ID 표시 */}
            {userId && (
                <div className="user-id"> {userId} 님이 입장했습니다.</div>
            )}

            <div className="messages-container">
                {chatLog.map((elem) => (
                    <ul
                        key={elem.chatIndex}
                        className={`message ${
                            elem.userid === userid
                                ? 'sent-message'
                                : 'received-message'
                        }`}
                    >
                        <li>
                            {userid}, {typeof userid}
                        </li>
                        <li>
                            {elem.userid}, {typeof elem.userid}
                        </li>
                        <li>{elem.userid}</li>
                        <li>{elem.content}</li>
                        <li>{elem.createdAt}</li>
                    </ul>
                ))}
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
