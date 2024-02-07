import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../Topbar';
import '../../styles/MypageEditLanguage.scss';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import ConfirmModal from '../Modals/ConfirmModal';

function MypageEditLanguage() {
    const [cookies] = useCookies(['id']);
    // cookies call cookies는 객체라서 [] 접근법으로 불러옵니다.
    const idCookie = cookies['id'];

    const navigate = useNavigate();
    const [displaySelectBoxDiv2, setDisplaySelectBoxDiv2] =
        useState<boolean>(false);
    const [displaySelectBoxDiv3, setDisplaySelectBoxDiv3] =
        useState<boolean>(false);

    // 모달 창 상태 변화
    const [showConfirmModal, setShowConfirmModal] = useState<any>({
        // 모달 초기 상태 false!
        show: false,
    });

    const [editlangErrorMsg, setEditlangErrorMsg] = useState<String>('');

    // useRef hook으로 요소 선택
    const chooseLangRef = useRef<HTMLSelectElement>(null);
    const chooseLangRef2 = useRef<HTMLSelectElement>(null);
    const chooseLangRef3 = useRef<HTMLSelectElement>(null);

    // 폼 데이터 전송 함수
    const submitEditLangForm = async (e: React.MouseEvent<HTMLElement>) => {
        // 이벤트의 기본 동작을 방지
        e.preventDefault();
        // 데이터를 담아서 보내줄 배열 생성.
        const learningLangs: Array<string | undefined> = [];

        const firstLangValue = chooseLangRef.current?.value.trim();
        // 첫 번째 값 추출
        if (firstLangValue) {
            learningLangs.push(firstLangValue);
        }
        // 두 번째 값 추출 (항목이 보일 때)
        if (displaySelectBoxDiv2) {
            const secondLangValue = chooseLangRef2.current?.value.trim();
            learningLangs.push(secondLangValue);
        }
        // 세 번째 값 추출 (항목이 보일 때)
        if (displaySelectBoxDiv3) {
            const thirdLangValue = chooseLangRef3.current?.value.trim();
            learningLangs.push(thirdLangValue);
        }
        try {
            const res = await axios({
                method: 'patch',
                url: `${process.env.REACT_APP_SERVERURL}/mypage/changeuserlang`,
                data: {
                    userid: idCookie,
                    learningLangs: learningLangs,
                },
                withCredentials: true,
            });
            if (res.data.isError === false) {
                handleConfirmModal();
            } else if (res.data.isError === true) {
                setEditlangErrorMsg(res.data.msg);
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
                    <div className="settingBack">Edit Language</div>
                </div>

                {/* 내용 */}
                <div className="editLanguage-Container">
                    <div className="editContainer-title">Language</div>
                    <div className="editContainer-smalltitle">
                        Please enter the{' '}
                        <span style={{ color: 'plum', fontWeight: 'bold' }}>
                            Language
                        </span>{' '}
                        to be modified
                    </div>
                    <form action="" className="editLanguage-Form">
                        <label>Learning Language</label>
                        <div className="chooseSelectBoxDiv">
                            <select
                                name="chooseSelect"
                                id=""
                                ref={chooseLangRef}
                            >
                                <option value="">Choose here...</option>
                                <option value="Chinese">Chinese</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Korean">Korean</option>
                            </select>
                            <div className="chooseSelect-plus-minus-btn">
                                <img
                                    src="/images/elementplus.png"
                                    alt="plus"
                                    onClick={() => {
                                        setDisplaySelectBoxDiv2(true);
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className={` ${
                                displaySelectBoxDiv2
                                    ? 'showMeTheSelect chooseSelectBoxDiv2'
                                    : 'hideMeTheSelect'
                            }`}
                        >
                            <select
                                name="chooseSelect"
                                id=""
                                ref={chooseLangRef2}
                            >
                                <option value="">Choose here...</option>
                                <option value="Chinese">Chinese</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Korean">Korean</option>
                            </select>
                            <div className="chooseSelect-plus-minus-btn">
                                <img
                                    src="/images/elementplus.png"
                                    alt=""
                                    onClick={() => {
                                        setDisplaySelectBoxDiv3(true);
                                    }}
                                />

                                <img
                                    src="/images/elementminus.png"
                                    alt=""
                                    onClick={() => {
                                        setDisplaySelectBoxDiv2(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className={` ${
                                displaySelectBoxDiv3
                                    ? 'showMeTheSelect chooseSelectBoxDiv3'
                                    : 'hideMeTheSelect'
                            }`}
                        >
                            <select
                                name="chooseSelect"
                                id=""
                                ref={chooseLangRef3}
                            >
                                <option value="">Choose here...</option>
                                <option value="Chinese">Chinese</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Korean">Korean</option>
                            </select>
                            <div className="chooseSelect-plus-minus-btn">
                                <img
                                    src="/images/elementminus.png"
                                    alt=""
                                    onClick={() => {
                                        setDisplaySelectBoxDiv3(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="getred editlangErrorMsg">
                            {editlangErrorMsg}
                        </div>
                    </form>
                    <button
                        className="edit-ConfirmBtn"
                        onClick={(e: React.MouseEvent<HTMLElement>) =>
                            submitEditLangForm(e)
                        }
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
}

export default MypageEditLanguage;
