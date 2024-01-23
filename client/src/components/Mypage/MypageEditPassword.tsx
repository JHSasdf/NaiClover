import axios from 'axios';
import { Link } from 'react-router-dom';
import Topbar from '../Topbar';
import '../../styles/MypageEditPassword.scss';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';

function MypageEditPassword() {
    const [cookies] = useCookies(['id']);

    // cookies call cookies는 객체라서 [] 접근법으로 불러옵니다.
    const idCookie = cookies['id'];

    const inputCurrentPasswordRef = useRef<HTMLInputElement>(null);
    const inputNewPasswordRef = useRef<HTMLInputElement>(null);
    const inputConfirmNewPasswordRef = useRef<HTMLInputElement>(null);

    const submitEditForm = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const currentPassword = inputCurrentPasswordRef.current?.value;
        const newPassword = inputNewPasswordRef.current?.value;
        const confirmNewPassword = inputConfirmNewPasswordRef.current?.value;

        try {
            const res = await axios({
                method: 'patch',
                url: '/mypage/changeuserpassword',
                data: {
                    userid: idCookie,
                    currentPassword,
                    newPassword,
                    confirmPassword: confirmNewPassword,
                },
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

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
                        <input
                            className=""
                            type="password"
                            ref={inputCurrentPasswordRef}
                        />
                        <br />
                        <label htmlFor="">변경할 비밀번호</label>
                        <br />
                        <input type="password" ref={inputNewPasswordRef} />
                        <br />
                        <label htmlFor="">변경할 비밀번호 재확인</label>
                        <br />
                        <input
                            type="password"
                            ref={inputConfirmNewPasswordRef}
                        />
                        <br />
                        <button
                            className="edit-ConfirmBtn"
                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                                submitEditForm(e)
                            }
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default MypageEditPassword;
