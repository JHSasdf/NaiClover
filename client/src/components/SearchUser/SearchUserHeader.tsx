import { Link } from 'react-router-dom';
import '../../styles/MypageHeader.scss';
import '../../styles/SearchUserHeader.scss';

function SearchUserHeader(props: any) {
    const { followingNum, followerNum, userData, learningLang, profileImg } =
        props;

    const currentFlag = userData.nation;

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

    console.log(learningLang);
    return (
        <div className="mypageHeaderC">
            <div className="logoC">
                <h1>{userData.userid}</h1>
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
                        <div className="profile-image">
                            <img src={profileImg} alt="" />
                        </div>
                        <div className="flag-image">
                            <img
                                src={`/images/flag/${currentFlag}.png`}
                                alt=""
                            />
                        </div>
                    </div>
                    {/* 프로필 요약정보 */}
                    <div className="contentC">
                        <div className="nameInfo">
                            <div>
                                {userData.gender == 'm' ? (
                                    <img src="/images/manIcon.png" alt="man" />
                                ) : (
                                    <img src="/images/womenIcon.png" alt="wo" />
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
                                <img src="/images/Arrow.png" alt="" />
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
            <div className="personal-container">
                <Link to={''}>
                    <button className="profile-followBtn">Follow</button>
                </Link>
                <Link to={''}>
                    <button className="profile-messageBtn">Message</button>
                </Link>
            </div>
        </div>
    );
}

export default SearchUserHeader;
