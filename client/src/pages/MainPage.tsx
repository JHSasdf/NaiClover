import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import './App.css'; // Import the styling file

const socket = io('http://localhost:4000');

const MainPage: React.FC = () => {
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [chatRooms, setChatRooms] = useState<{ id: string; name: string }[]>(
        []
    );
    const [enteredRoomUrl, setEnteredRoomUrl] = useState<string>('');
    const [userChatRooms, setUserChatRooms] = useState<string[]>([]);

    useEffect(() => {
        const savedChatRooms = Cookies.get('chatRooms');
        const savedUserChatRooms = Cookies.get('userChatRooms');

        if (savedChatRooms) {
            const parsedChatRooms = JSON.parse(savedChatRooms);
            if (JSON.stringify(chatRooms) !== JSON.stringify(parsedChatRooms)) {
                setChatRooms(parsedChatRooms);
            }
        }

        if (savedUserChatRooms) {
            const parsedUserChatRooms = JSON.parse(savedUserChatRooms);
            setUserChatRooms(parsedUserChatRooms);
        }

        const handleRoomCreated = ({
            roomId,
            roomName,
        }: {
            roomId: string;
            roomName: string;
        }) => {
            const isUniqueId = !chatRooms.some((room) => room.id === roomId);

            if (isUniqueId) {
                const updatedChatRooms = [
                    ...chatRooms,
                    { id: roomId, name: roomName },
                ];
                setChatRooms(updatedChatRooms);
                Cookies.set('chatRooms', JSON.stringify(updatedChatRooms));
            }
        };

        socket.on('roomCreated', handleRoomCreated);

        return () => {
            socket.off('roomCreated', handleRoomCreated);
        };
    }, [chatRooms]);

    const handleAddRoom = () => {
        if (newRoomName.trim() !== '') {
            socket.emit('createRoom', { roomName: newRoomName });
            setNewRoomName('');
        }
    };

    const handleEnterRoom = (roomUrl: string) => {
        // URL이 이미 채팅방 목록에 있는지 확인
        const isRoomExist = chatRooms.some(
            (room) => `/chat/${room.id}` === roomUrl
        );

        // URL이 채팅방 목록에 없을 경우에만 새로운 버튼 생성
        if (!isRoomExist) {
            const roomId = roomUrl.split('/').pop() || '';
            const roomName = `Room ${roomId}`;
            const updatedChatRooms = [
                ...chatRooms,
                { id: roomId, name: roomName },
            ];
            setChatRooms(updatedChatRooms);
            Cookies.set('chatRooms', JSON.stringify(updatedChatRooms));
        }

        // 입력 필드 초기화
        setEnteredRoomUrl('');
    };

    const handleEnterUrl = () => {
        if (enteredRoomUrl.trim() !== '') {
            const roomUrl = enteredRoomUrl;

            // URL이 이미 채팅방 목록에 있는지 확인
            const isRoomExist = chatRooms.some(
                (room) => `/chat/${room.id}` === roomUrl
            );

            // URL이 채팅방 목록에 없을 경우에만 새로운 버튼 생성
            if (!isRoomExist) {
                const roomId = roomUrl.split('/').pop() || '';
                const roomName = `Room ${roomId}`;
                const updatedChatRooms = [
                    ...chatRooms,
                    { id: roomId, name: roomName },
                ];
                setChatRooms(updatedChatRooms);
                Cookies.set('chatRooms', JSON.stringify(updatedChatRooms));
            }

            // 새 창 열기
            window.open(roomUrl, '_blank');

            // 입력 필드 초기화
            setEnteredRoomUrl('');
        }
    };

    return (
        <div>
            <h1>Chat Room List</h1>
            {chatRooms.map((room) => (
                <div key={room.id} className="chat-room-item">
                    <Link to={`/chat/${room.id}`} className="room-link">
                        {room.name}
                    </Link>
                </div>
            ))}

            {userChatRooms.map((roomUrl, index) => (
                <div key={index} className="user-chat-room-item">
                    <Link to={roomUrl} className="room-link">
                        {roomUrl}
                    </Link>
                </div>
            ))}
            <div className="create-room-container">
                <input
                    type="text"
                    placeholder="Enter new room name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                />
                <button onClick={handleAddRoom} className="enter-button">
                    Create Room
                </button>
            </div>
            <div className="enter-room-container">
                <input
                    type="text"
                    placeholder="Enter room URL"
                    value={enteredRoomUrl}
                    onChange={(e) => setEnteredRoomUrl(e.target.value)}
                />
                <button onClick={handleEnterUrl} className="enter-url">
                    Enter url
                </button>
            </div>
        </div>
    );
};

export default MainPage;
