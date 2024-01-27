import '../../styles/MypageOption.scss';
import Topbar from '../Topbar';
import { Link } from 'react-router-dom';

import '../../styles/Mypage.scss';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { User } from '../../types/types';

function MypageOption() {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];

    const [userData, setUserData] = useState<User>();
    const [learningLang, setLearningLang] = useState('');
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
    useEffect(() => {
        getMyPage();
    }, []);

    if (!userData) {
        return null; // 또는 로딩 스피너 등을 보여줄 수 있음.
    }
    return (
        <>
            <Topbar />
            <div className="myPageOption-container">
                {/* 설정 헤드 부분 */}
                <div className="myPageOption-C-Header">
                    <Link to="/mypage">
                        <div>
                            <img src="/images/BackPoint.png" alt="" />
                        </div>
                    </Link>
                    <div className="settingBack">Setting</div>
                    <div className="settingLogout">Logout</div>
                    <div className="settingLogoutImage">
                        <img src="/images/Logout.png" alt="" />
                    </div>
                </div>
                {/* 프로필 수정 */}
                <div className="settingProfile">
                    <div className="imageC">
                        <div className="profile-image"></div>
                        <div className="flag-image"></div>
                    </div>
                    <div className="contentC">
                        <div className="nameInfo">
                            <div>{userData.userid}</div>
                        </div>
                        <div className="countryInfo">
                            <div>{userData.nation}</div>
                        </div>
                    </div>

                    <div className="editImage">
                        <Link to={'/multermypage'}>
                            <img src="/images/EditButton.png" alt="" />
                        </Link>
                    </div>
                </div>

                {/* 상세정보 수정 */}
                <div className="settingDetail">
                    {/* My Info */}
                    <div className="myInformation-container">
                        {/* 헤더 */}
                        <div className="settingDetail-Header">
                            <div>
                                <img src="/images/DecoBar.png" alt="" />
                            </div>
                            <div className="settingDetail-Header-text">
                                My Info
                            </div>
                        </div>
                        {/* 내용 */}
                        <div className="settingDetail-Content">
                            <div className="settingDetail-Content-items">
                                <div>Name</div>
                                <div className="result-Content-items">
                                    {userData.name}
                                </div>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>Password</div>
                                <div className="result-Content-items">
                                    Change
                                </div>
                                <Link to={'/mypage/edit/password'}>
                                    <div className="rightPointImgDiv">
                                        <img
                                            src="/images/RightPoint.png"
                                            alt=""
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>Gender</div>
                                <div className="result-Content-items">
                                    {userData.gender === 'm'
                                        ? 'male'
                                        : 'female'}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Learning Laguage Info */}
                    <div className="myInformation-container">
                        <div className="settingDetail-Header">
                            <div>
                                <img src="/images/DecoBar.png" alt="" />
                            </div>
                            <div className="settingDetail-Header-text">
                                Learning Laguage Info
                            </div>
                        </div>
                        {/* 내용 */}
                        <div className="settingDetail-Content">
                            <div className="settingDetail-Content-items">
                                <div>Native Language</div>
                                <div className="result-Content-items">
                                    {userData.firLang}
                                </div>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>Learning Language</div>
                                <div className="result-Content-items">
                                    {learningLang[0]}
                                </div>
                                <Link to={'/mypage/edit/language'}>
                                    <div>
                                        <img
                                            src="/images/RightPoint.png"
                                            alt=""
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sevice Info */}
                    <div className="myInformation-container">
                        <div className="settingDetail-Header">
                            <div>
                                <img src="/images/DecoBar.png" alt="" />
                            </div>
                            <div className="settingDetail-Header-text">
                                Service Info
                            </div>
                        </div>
                        {/* 내용 */}
                        <div className="settingDetail-Content">
                            <div className="settingDetail-Content-items">
                                <div className="withdrawal">Withdrawal</div>
                                <div className="result-Content-items"></div>
                                <div>
                                    <img src="/images/RightPoint.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MypageOption;
