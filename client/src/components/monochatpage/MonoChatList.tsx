import { io } from 'socket.io-client';
import '../../styles/MonoChatList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandler from '../../utils/useErrorHandler';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:4000');

function MonoChatList() {
    const [monoRooms, setMonoRooms] = useState<any>();

    const { errorHandler } = useErrorHandler();
    const fetchMonoRooms = async () => {
        try {
            const res = await axios({
                url: '/fetch/monorooms',
                method: 'get',
            });
            console.log('monoRoomsData : ', res.data);
            setMonoRooms(res.data.monoRooms);
        } catch (err: any) {
            errorHandler(err.response.status);
        }
    };
    useEffect(() => {
        // 데이터베이스에 있는 room 불러오기
        fetchMonoRooms();
    }, []);
    return (
        <>
            {!(monoRooms === undefined) &&
                monoRooms.map((elem: any) => {
                    return (
                        <div key={elem.roomNum}>
                            <Link to={`/chat/${elem.roomNum}`}>
                                <div className="allchatroom-container">
                                    <div className="allheader-container">
                                        <div className="all-title">KR</div>
                                        <div className="allchatroom-title">
                                        {elem.roomName}
                                        </div>
                                    </div>
                                    <div className="allfooter-container">
                                        <div className="all-participants-container">
                                            <div className="all-participant-container">
                                                <div className="all-participant">
                                                    <img
                                                        src="/images/flag/Korea.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="all-flag">
                                                    <img
                                                        src="/images/flag/japan.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="etc-roomboss-name">
                                                name
                                            </div>
                                            <div className="etc-information">
                                                <div className="all-participant-date">
                                                    개설일 : 2024-01-25
                                                </div>

                                                <div className="all-participants">
                                                    32
                                                </div>
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

export default MonoChatList;
