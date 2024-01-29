import '../styles/Mypage.scss';
import Footer from '../components/Footer';
import SearchUserHeader from '../components/SearchUser/SearchUserHeader';
import Topbar from '../components/Topbar';
import SearchUserProfile from '../components/SearchUser/SearchUserProfile';
import MypagePost from '../components/Mypage/MypagePost';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Post, User } from '../types/types';
import { useNavigate, useParams } from 'react-router-dom';

const socket = io('http://localhost:4000');

function SearchUser() {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(true);
    const userid = useParams().userid;

    function toggleView(isProfile: boolean) {
        if ((isProfile && showProfile) || (!isProfile && !showProfile)) {
            return;
        }
        setShowProfile(!showProfile);
    }
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const [followingNum, setFollowingNum] = useState<Number>(0);
    const [followerNum, setFollowerNum] = useState<Number>(0);
    const [profileImg, setProfileImg] = useState<string>('');
    const [userData, setUserData] = useState<User>();
    const [learningLang, setLearningLang] = useState();
    const idCookie = cookies['id'];

    const getMyPage = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/userinfo/${userid}`,
                withCredentials: true,
            });
            setUserData(res.data.userDataObj);
            setFollowingNum(res.data.followingCount);
            setFollowerNum(res.data.followerCount);
            console.log(res.data);
            setProfileImg(res.data.userDataObj.MypageImage.path);
            setLearningLang(res.data.learningLang);
            const { postCulDatas, postLangDatas } = res.data;
            for (const postCulData of postCulDatas) {
                postCulData.type = 'cul';
            }
            for (const postLangData of postLangDatas) {
                postLangData.type = 'lang';
            }
            const postDatas = postCulDatas.concat(postLangDatas);
            const sortedPostDatas = postDatas.sort(function (a: Post, b: Post) {
                const aDate = new Date(a.createdAt).getTime();
                const bDate = new Date(b.createdAt).getTime();
                return bDate - aDate;
            });
            // 요거 찍어보십쇼
            console.log(res.data);
            console.log(sortedPostDatas);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleAddRoom = async () => {
        socket.emit('createRoom', {
            roomName: userid,
            userid: idCookie,
            useridTo: userid,
            restrictedLang: '',
        });

        const res = await axios({
            method: 'get',
            url: `/getuserroomid/${userid}`,
        });
        if (res.data.isError === false) {
            navigate(`/chat/${res.data.roomNum}`);
        }
    };

    useEffect(() => {
        getMyPage();
    }, []);

    if (!userData) {
        return null; // 또는 로딩 스피너 등을 보여줄 수 있음.
    }

    return (
        <>
            <Topbar />
            <div className="mypage-container">
                <SearchUserHeader
                    followingNum={followingNum}
                    followerNum={followerNum}
                    userData={userData}
                    learningLang={learningLang}
                    profileImg={profileImg}
                    handleAddRoom={handleAddRoom}
                />
                <div className="clickDiv">
                    {/* click 이벤트 추가 */}
                    <div
                        className={`profileClick ${
                            showProfile ? 'active changed' : ''
                        } `}
                        onClick={() => toggleView(true)}
                    >
                        Profile
                    </div>
                    <div
                        className={`postClick ${
                            !showProfile ? 'active changed' : ''
                        } `}
                        onClick={() => toggleView(false)}
                    >
                        POST
                    </div>
                </div>
                {showProfile ? (
                    <SearchUserProfile
                        userData={userData}
                        learningLang={learningLang}
                    />
                ) : (
                    <MypagePost />
                )}
            </div>
            <Footer />
        </>
    );
}

export default SearchUser;
