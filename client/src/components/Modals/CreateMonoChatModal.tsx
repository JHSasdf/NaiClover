import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../../styles/CreateMonoChatModal.scss';

function CreateMonoChatModal({ show, setShow, navigate }: any) {
    const handleClose = () => {
        setShow({ show: false });
        navigate('');
    };

    return (
        <>
            {/* 변경 완료 되었을 시에 모달! */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{
                            color: 'rgb(91, 91, 238)',
                            fontWeight: 'bold',
                        }}
                    >
                        Create Room
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Room Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Choose Language</Form.Label>
                            <Form.Control as="select">
                                <option value="">Korean</option>
                                <option value="">English</option>
                                <option value="">Chinese</option>
                                <option value="">Japanese</option>
                                <option value="">French</option>
                                <option value="">German</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ backgroundColor: '#dabca8b3', color: 'black' }}
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        style={{ backgroundColor: '#56eebbb3', color: 'black' }}
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateMonoChatModal;
