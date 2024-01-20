import { Link } from 'react-router-dom';
import '../../styles/MypageHeader.scss';

function MypageHeader() {
    return (
        <div className="mypageHeaderC">
            <div className="logoC">
                <div>
                    <img src="images/MypageLogo.png" alt="" />
                </div>
                <Link to={'/mypageoption'}>
                    <div>
                        <img src="images/Gear.png" alt="" />
                    </div>
                </Link>
            </div>
            <div className="followC">
                <div className="aDiv">
                    <div>팔로워</div>
                    <img src="/images/Divider.png" alt="" />
                    <div>000</div>
                </div>
                <div className="bDiv">
                    {/* 프로필 이미지 */}
                    <div className="imageC">
                        <div className="profile-image"></div>
                        <div className="flag-image"></div>
                    </div>
                    {/* 프로필 요약정보 */}
                    <div className="contentC">
                        <div className="nameInfo">
                            <div>
                                <img src="images/menIcon.png" alt="" />
                            </div>
                            <div>Sam</div>
                        </div>
                        {/* db랑 연동해보고 글자 사이즈 및 간격 조절 해야할듯. */}
                        <div className="countryInfo">
                            <div>Seoul</div>
                            <div>
                                <img src="images/Label.png" alt="" />
                            </div>
                            <div>South Korea</div>
                        </div>
                        <div className="languageInfo">
                            <div className="languageDiv">EN</div>
                            <div className="arrowImage">
                                <img src="images/Arrow.png" alt="" />
                            </div>
                            <div className="languageDiv">KR</div>
                        </div>
                    </div>
                </div>
                <div className="cDiv">
                    <div>팔로잉</div>
                    <img src="/images/Divider.png" alt="" />
                    <div>000</div>
                </div>
            </div>
        </div>
    );
}

export default MypageHeader;
