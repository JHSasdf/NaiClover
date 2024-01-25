import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function ConfirmModal({ show, setShow }: any) {
    const handleClose = () => {
        setShow({ show: false });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Learning Languages change completed.</Modal.Body>
                <Modal.Footer>
                    <Link to="/mypage/option">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModal;
