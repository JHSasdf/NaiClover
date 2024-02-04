import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../../styles/CreateMonoChatModal.scss';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SERVERURL}`);

function CreateMonoChatModal({ show, setShow, navigate }: any) {
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [restrictedLang, setRestrictLang] = useState<string | null>('Korean');
    const [cookies] = useCookies(['id']);
    const userid = cookies['id'];

    const handleClose = () => {
        setShow({ show: false });
    };
    // 방 추가 함수
    const handleAddRoom = () => {
        if (newRoomName.trim() !== '') {
            socket.emit('createRoom', {
                roomName: newRoomName,
                userid: userid,
                useridTo: 'monoChat',
                restrictedLang: restrictedLang, // 이 부분 수정
            });
            setNewRoomName('');
            handleClose();
        }
    };

    const handleRoomCreated = ({ roomNum }: { roomNum: string }) => {
        // 방이 생성되면 해당 방으로 이동
        window.location.href = `/chat/${roomNum}`;
    };
    socket.on('roomCreated', handleRoomCreated);
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
                                placeholder="Enter new room name (max 18 characters)"
                                autoFocus
                                maxLength={18} // 글자 18자 제한
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Choose Language</Form.Label>
                            <Form.Control
                                as="select"
                                value={restrictedLang || ''}
                                onChange={(e) =>
                                    setRestrictLang(e.target.value)
                                }
                            >
                                <option value="Korean">Korean</option>
                                <option value="English">English</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Japanese">Japanese</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
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
                        onClick={handleAddRoom}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateMonoChatModal;
