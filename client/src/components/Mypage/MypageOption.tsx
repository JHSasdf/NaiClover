import '../../styles/MypageOption.scss';
import Topbar from '../Topbar';

function MypageOption() {
    return (
        <>
            <Topbar />
            <div className="myPageOption-container">
                {/* 설정 헤드 부분 */}
                <div className="myPageOption-C-Header">
                    <div>
                        <img src="/images/BackPoint.png" alt="" />
                    </div>
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
                    <div className="myInformation-container">
                        <div className="settingDetail-Header">
                            <div>
                                <img src="/images/DecoBar.png" alt="" />
                            </div>
                            <div className="settingDetail-Header-text">
                                My Info
                            </div>
                        </div>
                        <div className="settingDetail-Content">
                            <div className="settingDetail-Content-items">
                                <div>Password</div>
                                <div className="result-Content-items">
                                    Change
                                </div>
                                <div>
                                    <img src="/images/RightPoint.png" alt="" />
                                </div>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>성별</div>
                                <div className="result-Content-items">남</div>
                            </div>
                            <div className="settingDetail-Content-items">
                                <div>유저 네임</div>
                                <div className="result-Content-items">Sam</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="settingDetail-Header">
                            <div>
                                <img src="/images/DecoBar.png" alt="" />
                            </div>
                            <div className="settingDetail-Header-text">
                                Learn Laguage Info
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="settingDetail-Header">
                            <div>
                                <img src="/images/DecoBar.png" alt="" />
                            </div>
                            <div className="settingDetail-Header-text">
                                Service Info
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MypageOption;
