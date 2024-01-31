import { io } from 'socket.io-client';
import '../../styles/PersonalChatList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:4000');

function PersonalChatList() {
    const [personalRooms, setPersonalRooms] = useState<any>();

    const fetchPersonalRooms = async () => {
        const res = await axios({
            url: '/fetch/personalrooms',
            method: 'get',
        });
        console.log('personalRoomsData : ', res.data);
        setPersonalRooms(res.data.personalRooms);
    };

    useEffect(() => {
        // 데이터베이스에 있는 room 불러오기
        fetchPersonalRooms();
    }, []);

    return (
        <>
            {!(personalRooms === undefined) &&
                personalRooms.map((elem: any) => {
                    return (
                        <div key={elem.roomNum}>
                            <Link to={`/chat/${elem.roomNum}`}>
                                <div className="persnoalChatList-container">
                                    {/* 채팅 프로필 이미지 */}
                                    <div className="chat-ImageDiv">
                                        <div className="chat-ProfileImage">
                                            <img
                                                src="/images/flag/korea.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="chat-FlagImage">
                                            <img
                                                src="/images/flag/japan.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    {/* 채팅 내용 */}
                                    <div className="chat-content">
                                        {/* 닉네임 */}
                                        <div className="chat-nickname">
                                            {elem.realRoomName}
                                        </div>
                                        {/* 날짜 */}
                                        <div className="chat-date">
                                            {elem.updatedAt}
                                        </div>
                                    </div>
                                </div>
                                {/* <li>{elem.realRoomName}</li> */}
                            </Link>
                        </div>
                    );
                })}
        </>
    );
}

export default PersonalChatList;
