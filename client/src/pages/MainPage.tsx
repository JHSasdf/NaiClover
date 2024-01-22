// MainPage.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import './App.css'; // Import the styling file

const socket = io('http://localhost:4000');

const MainPage: React.FC = () => {
  const [newRoomName, setNewRoomName] = useState<string>('');
  const [chatRooms, setChatRooms] = useState<{ id: string; name: string }[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const savedChatRooms = Cookies.get('chatRooms');
    if (savedChatRooms) {
      const parsedChatRooms = JSON.parse(savedChatRooms);
      if (JSON.stringify(chatRooms) !== JSON.stringify(parsedChatRooms)) {
        setChatRooms(parsedChatRooms);
      }
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
        const updatedChatRooms = [...chatRooms, { id: roomId, name: roomName }];
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

  return (
    <div>
      <h1>Chat Room List</h1>
      <div className="chat-room-list">
        {chatRooms.map((room) => (
          <div key={room.id} className="chat-room-item">
            <Link to={`/chat/${room.id}`} className="room-link">
              {room.name}
            </Link>
            <button
              className="enter-button"
              onClick={() => navigate(`/chat/${room.id}`)}
            >
              Enter Room
            </button>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default MainPage;
