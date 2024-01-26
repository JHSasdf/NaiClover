import '../styles/Mypage.scss';
import Footer from '../components/Footer';
import MypageHeader from '../components/Mypage/MypageHeader';
import Topbar from '../components/Topbar';
import MypageProfile from '../components/Mypage/MypageProfile';
import MypagePost from '../components/Mypage/MypagePost';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ListFormat } from 'typescript';
import { User } from '../types/types';

function Mypage() {
    const [showProfile, setShowProfile] = useState(true);

    function toggleView(isProfile: boolean) {
        if ((isProfile && showProfile) || (!isProfile && !showProfile)) {
            return;
        }
        setShowProfile(!showProfile);
    }
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const [followingNum, setFollowingNum] = useState<Number>(0);
    const [followerNum, setFollowerNum] = useState<Number>(0);
    const idCookie = cookies['id'];

    const [userData, setUserData] = useState<User>();
    const [learningLang, setLearningLang] = useState();
    const getMyPage = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/getMyPage',
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setUserData(res.data.userDataObj);
            setLearningLang(res.data.learningLang);
        } catch (error) {
            console.log('error', error);
        }
    };

    const followNumGet = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/followNumGet',
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setFollowingNum(res.data.followingNumber);
            setFollowerNum(res.data.followerNumber);
        } catch (error) {
            console.log('error:', error);
        }
    };

    useEffect(() => {
        getMyPage();
        followNumGet();
    }, []);

    if (!userData) {
        return null; // 또는 로딩 스피너 등을 보여줄 수 있음.
    }

    return (
        <>
            <Topbar />
            <div className="mypage-container">
                <MypageHeader
                    followingNum={followingNum}
                    followerNum={followerNum}
                    userData={userData}
                    learningLang={learningLang}
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
                    <MypageProfile
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

export default Mypage;
