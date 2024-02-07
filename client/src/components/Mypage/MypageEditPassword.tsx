import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../Topbar';
import '../../styles/MypageEditPassword.scss';
import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import ConfirmModal from '../Modals/ConfirmModal';

function MypageEditPassword() {
    const [cookies] = useCookies(['id']);
    // cookies call cookies는 객체라서 [] 접근법으로 불러옵니다.
    const idCookie = cookies['id'];

    const [editPasswordErrorMsg, setEditPasswordErrorMsg] =
        useState<String>('');

    const navigate = useNavigate();
    // 모달 창 상태 변화
    const [showConfirmModal, setShowConfirmModal] = useState<any>({
        // 모달 초기 상태 false!
        show: false,
    });
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
                url: `${process.env.REACT_APP_SERVERURL}/mypage/changeuserpassword`,
                data: {
                    userid: idCookie,
                    currentPassword,
                    newPassword,
                    confirmPassword: confirmNewPassword,
                },
                withCredentials: true,
            });
            if (res.data.isError === false) {
                handleConfirmModal();
            } else if (res.data.isError === true) {
                setEditPasswordErrorMsg(res.data.msg);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // 모달 창 실행 함수
    const handleConfirmModal = () => {
        // 실행 되면 모달 상태를 true로!
        setShowConfirmModal({
            show: true,
        });
    };

    return (
        <>
            <Topbar />
            {/* 모달 컴포넌트 */}
            <ConfirmModal
                show={showConfirmModal.show}
                setShow={setShowConfirmModal}
                navigate={navigate}
            />
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
                        <div className="getred editPasswordErrorMsg">
                            {editPasswordErrorMsg}
                        </div>
                    </form>
                    <button
                        className="edit-ConfirmBtn"
                        onClick={(e: React.MouseEvent<HTMLElement>) =>
                            submitEditForm(e)
                        }
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
}

export default MypageEditPassword;
