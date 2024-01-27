import '../styles/MulterMypage.scss';
import { useRef, useState } from 'react';
import axios from 'axios';
import Topbar from '../components/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/Modals/ConfirmModal';
function MulterMypage() {
    const image = useRef<any>(null);
    const [pathState, setPathState] = useState('');
    // 기본 이미지
    const defaultImagePath = '/images/basicIcon.png';

    const navigate = useNavigate();

    // 모달 창 상태 변화
    const [showConfirmModal, setShowConfirmModal] = useState<any>({
        // 모달 초기 상태 false!
        show: false,
    });
    const change = () => {
        // URL.createObjectURL 함수 사용하여 이미지 파일 업로드 시 바로 사진 변경
        if (image.current.files.length > 0) {
            // 이미지 파일이 선택된 경우에만 createObjectURL 함수 호출
            setPathState(URL.createObjectURL(image.current.files[0]));
            console.log(URL.createObjectURL(image.current.files[0]));
        }
    };

    const postMulter = async () => {
        const formData = new FormData();
        console.log('이미지 파일 이름 출력', image.current.files[0].name);
        formData.append('file', image.current.files[0]);

        const res = await axios({
            method: 'post',
            url: '/multermypage',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },

            // 세션 쿠키 한번에
            withCredentials: true,
        });
        handleConfirmModal();
        console.log('res.data >', res.data);
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
                    <div className="settingBack">Edit Profile Image</div>
                </div>
                <div className="multer-form-container">
                    {/* 이미지 출력 공간 */}
                    <div className="profile-image">
                        {/* 조건부로 렌더링 이미지 표시 */}
                        <img src={pathState} alt="" />
                    </div>
                    <form action="">
                        <label
                            className="input-file-button"
                            htmlFor="input-file"
                        >
                            프로필 설정
                        </label>
                        <input
                            type="file"
                            id="input-file"
                            ref={image}
                            accept=".jpg, .png, .jpeg"
                            // 이미지 업로드시 파일 바로 변환
                            onChange={change}
                        />
                    </form>
                    {/* 서버에 데이터 전송 */}
                    <button
                        className="edit-ConfirmBtn"
                        type="button"
                        onClick={postMulter}
                    >
                        {' '}
                        확인
                    </button>
                </div>
            </div>
        </>
    );
}

export default MulterMypage;
