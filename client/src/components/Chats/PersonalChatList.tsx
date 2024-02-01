import { io } from 'socket.io-client';
import '../../styles/PersonalChatList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrnetData } from '../../utils/getCurrentData';
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
        socket.on('needReload', () => {
            fetchPersonalRooms();
        });
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
                                                src={
                                                    elem.realRoomName[0]
                                                        .profileImgPath
                                                }
                                                alt=""
                                            />
                                            {/* 데이트 쓰는 방법 */}
                                        </div>
                                        <div className="chat-FlagImage">
                                            <img
                                                src={`/images/flag/${elem.realRoomName[0].nation}.png`}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    {/* 채팅 내용 */}
                                    <div className="chat-content">
                                        <div className="chat-detail1">
                                            {/* 닉네임 */}
                                            <div className="chat-nickname">
                                                {elem.realRoomName[0].name}
                                            </div>
                                            {/* 날짜 */}
                                            <div className="chat-date">
                                                {getCurrnetData(
                                                    new Date(
                                                        elem.Chats[0].createdAt
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="chat-detail2">
                                            {/* 마지막 내용 */}
                                            <div className="chat-lastcontent">
                                                {elem.Chats[0].content}
                                            </div>
                                            <div className="chat-notCheck">
                                                <div>2</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
        </>
    );
}

export default PersonalChatList;
