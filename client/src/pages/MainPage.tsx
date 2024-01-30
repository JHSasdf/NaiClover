import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import './App.css'; // Import the styling file

const socket = io('http://localhost:4000');

const MainPage: React.FC = () => {
    const [cookies] = useCookies(['id']);
    const userid = cookies['id'];
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [useridTo, setUseridTo] = useState<string>('monoChat');
    const [restrictedLang, setRestrictLang] = useState<String | null>(null);
    const [chatRooms, setChatRooms] = useState<{ id: string; name: string }[]>(
        []
    );
    const [enteredRoomUrl, setEnteredRoomUrl] = useState<string>('');
    const [userChatRooms, setUserChatRooms] = useState<string[]>([]);
    const [personalRooms, setPersonalRooms] = useState<any>();
    const [monoRooms, setMonoRooms] = useState<any>();

    const fetchPersonalRooms = async () => {
        const res = await axios({
            url: '/fetch/personalrooms',
            method: 'get',
        });
        console.log('personalRoomsData : ', res.data);
        setPersonalRooms(res.data.personalRooms);
    };

    const fetchMonoRooms = async () => {
        const res = await axios({
            url: '/fetch/monorooms',
            method: 'get',
        });
        console.log('monoRoomsData : ', res.data);
        setMonoRooms(res.data.monoRooms);
    };

    useEffect(() => {
        // 데이터베이스에 있는 room 불러오기
        fetchPersonalRooms();
        fetchMonoRooms();

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
            roomNum,
            roomName,
            userId,
        }: {
            roomNum: string;
            roomName: string;
            userId: string;
        }) => {
            fetchMonoRooms();
            const isUniqueId = !chatRooms.some((room) => room.id === roomId);

            if (isUniqueId) {
                const updatedChatRooms = [
                    ...chatRooms,
                    { id: roomNum, name: roomName },
                ];
                setChatRooms(updatedChatRooms);
                Cookies.set('chatRooms', JSON.stringify(updatedChatRooms));

                // 방이 생성되면 해당 방으로 이동
                window.location.href = `/chat/${roomNum}`;
            }
        };

        socket.on('roomCreated', handleRoomCreated);

        return () => {
            socket.off('roomCreated', handleRoomCreated);
        };
    }, [chatRooms]);

    // 방 생성 버튼 함수
    // useridTo === 'monoChat' 일때
    // 모노챗으로 생성

    const handleAddRoom = () => {
        if (newRoomName.trim() !== '') {
            socket.emit('createRoom', {
                roomName: newRoomName,
                userid: userid,
                useridTo: useridTo,
                restrictedLang: restrictedLang,
            });
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

        // 입력 필드 초기화t
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
            <div>
                {/* DB 이용, personalRooms */}
                {!(personalRooms === undefined) &&
                    personalRooms.map((elem: any) => {
                        return (
                            <ul key={elem.roomNum}>
                                <Link to={`/chat/${elem.roomNum}`}>
                                    <li>{elem.realRoomName}</li>
                                </Link>
                            </ul>
                        );
                    })}
            </div>
            <div>
                {/* DB 이용, monoRooms */}
                {!(monoRooms === undefined) &&
                    monoRooms.map((elem: any) => {
                        return (
                            <ul key={elem.roomNum}>
                                <Link to={`/chat/${elem.roomNum}`}>
                                    <li>{elem.roomName}</li>
                                    <li>{elem.restrictedLang}</li>
                                </Link>
                            </ul>
                        );
                    })}
            </div>

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
                <input
                    type="text"
                    placeholder="to userid"
                    value={useridTo}
                    onChange={(e) => setUseridTo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Restricted Lang"
                    onChange={(e) => setRestrictLang(e.target.value)}
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
