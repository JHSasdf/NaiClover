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
    userId?: string | null;
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
const USER_ID_COOKIE_KEY = 'id';

const ChatRoomPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);
    const [chatLog, setChatLog] = useState<ChatLog[]>([]);
    const [language, setLanguage] = useState<string>(''); // 언어 상태 추가
    const [koreanButtonActive, setKoreanButtonActive] =
        useState<boolean>(false); // 한국어 버튼 활성화 상태 추가
    const [englishButtonActive, setEnglishButtonActive] =
        useState<boolean>(false); // 영어 버튼 활성화 상태 추가

    const [cookies] = useCookies(['id']);
    const userid = cookies['id'];

    useEffect(() => {
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

        socket.emit('userId', userIdFromCookie);

        return () => {
            socket.off('chat message');
        };
    }, [roomId]);

    const fetchChatLog = async () => {
        const res = await axios({
            url: `/getchatlog/${roomId}`,
            method: 'get',
        });
        setChatLog(res.data.chatLog);
        console.log(res.data);
    };

    useEffect(() => {
        fetchChatLog();
    }, [messages]);

    const handleSendMessage = () => {
        if (language === 'korean' && !isKorean(newMessage)) {
            alert('한국어로 작성해주세요.');
            return;
        } else if (language === 'english' && !isEnglish(newMessage)) {
            alert('영어로 작성해주세요.');
            return;
        }

        const message = `${userId}: ${newMessage}`;
        socket.emit('chat message', {
            room: roomId,
            text: message,
            isSentByMe: true,
            userId: userid,
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

    const handleLanguageChange = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);

        // 버튼 활성화 상태 업데이트
        setKoreanButtonActive(selectedLanguage === 'korean');
        setEnglishButtonActive(selectedLanguage === 'english');
    };

    const isKorean = (text: string) => {
        const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return koreanRegex.test(text);
    };

    const isEnglish = (text: string) => {
        const englishRegex = /^[a-zA-Z\s]*$/;
        return englishRegex.test(text);
    };

    return (
        <div className="chat-room-container">
            {userId && (
                <div className="user-id">{userId} 님이 입장했습니다.</div>
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
                        <li>{userid}</li>

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

                {/* 언어 선택 버튼에 동적 스타일 적용 */}
                <button
                    onClick={() => handleLanguageChange('korean')}
                    className={`language-button ${
                        koreanButtonActive ? 'active' : ''
                    }`}
                >
                    한국어
                </button>
                <button
                    onClick={() => handleLanguageChange('english')}
                    className={`language-button ${
                        englishButtonActive ? 'active' : ''
                    }`}
                >
                    English
                </button>

                <button onClick={handleSendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoomPage;
