import '../styles/Mypage.scss';
import Footer from '../components/Footer';
import MypageHeader from '../components/Mypage/MypageHeader';
import Topbar from '../components/Topbar';

function Mypage() {
    return (
        <>
            <Topbar />
            <div className="mypage-container">
                <MypageHeader />
                <div className="clickDiv">
                    <div className="profileClick">프로필</div>
                    <div className="postClick">POST</div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Mypage;
