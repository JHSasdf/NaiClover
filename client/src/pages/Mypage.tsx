import '../styles/Mypage.scss';
import Footer from '../components/Footer';
import MypageHeader from '../components/Mypage/MypageHeader';
import Topbar from '../components/Topbar';
import MypageProfile from '../components/Mypage/MypageProfile';

function Mypage() {
    return (
        <>
            <Topbar />
            <div className="mypage-container">
                <MypageHeader />
                <div className="clickDiv">
                    {/* click 이벤트 추가 */}
                    <div className="profileClick">프로필</div>
                    <div className="postClick">POST</div>
                </div>
                <MypageProfile />
            </div>
            <Footer />
        </>
    );
}

export default Mypage;
