import { SassColor } from 'sass';
import '../../styles/MypageOption.scss';
import Topbar from '../Topbar';
import { Link } from 'react-router-dom';

function MypageOption() {
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
                            <div>Sam</div>
                        </div>
                        <div className="countryInfo">
                            <div>Seoul</div>
                            <div>
                                <img src="images/Label.png" alt="" />
                            </div>
                            <div>South Korea</div>
                        </div>
                    </div>
                    <div className="editImage">
                        <img src="/images/EditButton.png" alt="" />
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
                                <div className="result-Content-items">Sam</div>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>Password</div>
                                <div className="result-Content-items">
                                    Change
                                </div>
                                <div className="rightPointImgDiv">
                                    <img src="/images/RightPoint.png" alt="" />
                                </div>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>Gender</div>
                                <div className="result-Content-items">Male</div>
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
                                    Korean
                                </div>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>Learning Language</div>
                                <div className="result-Content-items">
                                    English
                                </div>
                                <div>
                                    <img src="/images/RightPoint.png" alt="" />
                                </div>
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
