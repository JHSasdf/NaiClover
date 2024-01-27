import { Link } from 'react-router-dom';
import '../../styles/MypageHeader.scss';

function MypageHeader(props: any) {
    const shortName = (nation: string): string | undefined => {
        if (nation === 'China' || nation === 'Chinese') {
            return 'CN';
        } else if (nation === 'America' || nation === 'English') {
            return 'US';
        } else if (nation === 'France' || nation === 'French') {
            return 'FR';
        } else if (nation === 'Germany' || nation === 'German') {
            return 'GM';
        } else if (nation === 'Japan' || nation === 'Japanese') {
            return 'JP';
        } else {
            return 'KR';
        }
    };
    const { followingNum, followerNum, userData, learningLang } = props;
    console.log(learningLang);
    return (
        <div className="mypageHeaderC">
            <div className="logoC">
                <div>
                    <img src="images/MypageLogo.png" alt="" />
                </div>
                <Link to={'/mypage/option'}>
                    <div>
                        <img src="images/Gear.png" alt="" />
                    </div>
                </Link>
            </div>
            <div className="followC">
                <div className="aDiv">
                    <div>팔로워</div>
                    <div>
                        <img src="/images/Divider.png" alt="" />
                    </div>
                    <div>{followerNum}</div>
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
                                {userData.gender == 'm' ? (
                                    <img src="images/manIcon.png" alt="man" />
                                ) : (
                                    <img
                                        src="images/womanIcon.png"
                                        alt="woman"
                                    />
                                )}
                            </div>
                            <div>{userData.name}</div>
                        </div>
                        {/* db랑 연동해보고 글자 사이즈 및 간격 조절 해야할듯. */}
                        <div className="countryInfo">
                            <div>{userData.nation}</div>
                        </div>
                        <div className="languageInfo">
                            <div className="languageDiv">
                                {shortName(userData.firLang)}
                            </div>
                            <div className="arrowImage">
                                <img src="images/Arrow.png" alt="" />
                            </div>
                            <div className="languageDiv">
                                {shortName(learningLang[0])}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cDiv">
                    <div>팔로잉</div>
                    <img src="/images/Divider.png" alt="" />
                    <div>{followingNum}</div>
                </div>
            </div>
        </div>
    );
}

export default MypageHeader;
