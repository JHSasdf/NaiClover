import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

import { useCookies } from 'react-cookie';

function DeleteModal({ show, setShow, navigate }: any) {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const handleClose = () => {
        setShow({ show: false });
        removeCookies('id');
        navigate('/login');
        userdelete();
    };
    const handleCancle = () => {
        setShow({ show: false });
    };

    // 계정 탈퇴 요청
    const userdelete = async () => {
        try {
            await axios({
                method: 'delete',
                url: `${process.env.REACT_APP_SERVERURL}/mypage/deleteuser`,
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {/* 변경 완료 되었을 시에 모달! */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title style={{ color: 'red', fontWeight: 'bold' }}>
                        Warning!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: 'bold' }}>
                    Are you absolutely certain you want to delete your account?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            handleCancle();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ backgroundColor: 'red', color: 'black' }}
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;
