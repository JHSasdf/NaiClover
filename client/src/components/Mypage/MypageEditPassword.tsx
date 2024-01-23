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
                    <div className="editContainer-title">Password</div>
                    <div className="editContainer-smalltitle">
                        Please enter the password to be modified
                    </div>
                    <form action="" className="editPassword-Form">
                        <label htmlFor="">현재 비밀번호</label>
                        <br />
                        <input className="" type="password" name="" id="" />
                        <br />
                        <label htmlFor="">변경할 비밀번호</label>
                        <br />
                        <input type="password" name="" id="" />
                        <br />
                        <label htmlFor="">변경할 비밀번호 재확인</label>
                        <br />
                        <input type="password" name="" id="" />
                        <br />
                        <button className="edit-ConfirmBtn">Confirm</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default MypageEditPassword;
