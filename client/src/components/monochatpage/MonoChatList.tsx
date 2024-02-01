import { io } from 'socket.io-client';
import '../../styles/MonoChatList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandler from '../../utils/useErrorHandler';
import { Link } from 'react-router-dom';
import { getCurrentData2, getCurrnetData } from '../../utils/getCurrentData';

const socket = io('http://localhost:4000');
interface MonoChatListProps {
    selectedLanguage: string;
}
function MonoChatList({ selectedLanguage }: MonoChatListProps) {
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

    const languageText = (restrictedLang: string) => {
        switch (restrictedLang) {
            case 'Korean':
                return 'KR';
            case 'English':
                return 'EN';
            case 'Japanese':
                return 'JP';
            case 'Chinese':
                return 'CH';
            case 'French':
                return 'FR';
            case 'German':
                return 'GM';

            default:
                return '';
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
                    if (
                        languageText(elem.restrictedLang) === selectedLanguage
                    ) {
                        return (
                            <div key={elem.roomNum}>
                                <Link to={`/chat/${elem.roomNum}`}>
                                    <div className="allchatroom-container">
                                        <div className="allheader-container">
                                            <div className="all-title">
                                                {languageText(
                                                    elem.restrictedLang
                                                )}
                                            </div>
                                            <div className="allchatroom-title">
                                                {elem.roomName}
                                            </div>
                                        </div>
                                        <div className="allfooter-container">
                                            <div className="all-participants-container">
                                                <div className="all-participant-container">
                                                    <div className="all-participant">
                                                        <img
                                                            src={
                                                                elem.userInfo
                                                                    .profileImgPath
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="all-flag">
                                                        <img
                                                            src={`/images/flag/${elem.userInfo.nation}.png`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="etc-roomboss-name">
                                                    {elem.userInfo.name}
                                                </div>
                                                <div className="etc-information">
                                                    <div className="all-participant-date">
                                                        {getCurrentData2(
                                                            new Date(
                                                                elem.Chats[0].createdAt
                                                            )
                                                        )}
                                                    </div>

                                                    <div className="all-participants">
                                                        <div className="participants-users">
                                                            {
                                                                elem.numberOfPeople
                                                            }
                                                        </div>
                                                        명 참여중
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    }
                    // return null;
                })}
        </>
    );
}

export default MonoChatList;
