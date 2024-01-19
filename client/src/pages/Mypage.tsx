import '../styles/Mypage.scss';
import Footer from '../components/Footer';
import MypageHeader from '../components/Mypage/MypageHeader';
import Topbar from '../components/Topbar';
import MypageProfile from '../components/Mypage/MypageProfile';
import { useState } from 'react';
import MypagePost from '../components/Mypage/MypagePost';

function Mypage() {
    const [showProfile, setShowProfile] = useState(true);

    function toggleView(isProfile: boolean) {
        if ((isProfile && showProfile) || (!isProfile && !showProfile)) {
            return;
        }
        setShowProfile(!showProfile);
    }

    return (
        <>
            <Topbar />
            <div className="mypage-container">
                <MypageHeader />
                <div className="clickDiv">
                    {/* click 이벤트 추가 */}
                    <div
                        className={`profileClick ${
                            showProfile ? 'active colorChange divChange' : ''
                        } `}
                        onClick={() => toggleView(true)}
                    >
                        프로필
                    </div>
                    <div
                        className={`postClick ${
                            !showProfile ? 'active colorChange divChange' : ''
                        } `}
                        onClick={() => toggleView(false)}
                    >
                        POST
                    </div>
                </div>
                {showProfile ? <MypageProfile /> : <MypagePost />}
            </div>
            <Footer />
        </>
    );
}

export default Mypage;
