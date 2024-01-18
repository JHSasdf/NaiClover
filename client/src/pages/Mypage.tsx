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
                <div></div>
                <div></div>
            </div>
            <Footer />
        </>
    );
}

export default Mypage;
