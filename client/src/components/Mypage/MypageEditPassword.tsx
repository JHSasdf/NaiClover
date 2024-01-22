import { Link } from 'react-router-dom';
import Topbar from '../Topbar';
import '../../styles/MypageEditPassword.scss';

function MypageEditPassword() {
    return (
        <>
            <Topbar />
            <div className="myPageOption-container">
                {/* 설정 헤드 부분 */}
                <div className="myPageOption-C-Header">
                    <Link to="/mypage/option">
                        <div>
                            <img src="/images/BackPoint.png" alt="" />
                        </div>
                    </Link>
                    <div className="settingBack">Edit Password</div>
                </div>

                {/* 내용 */}
                <div className="editPassword-Container">
                    <div>Password</div>
                    <div>변경해주세요</div>
                    <form action="">
                        <input className="" type="password" name="" id="" />
                        <input type="password" name="" id="" />
                        <input type="password" name="" id="" />
                        <button></button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default MypageEditPassword;
