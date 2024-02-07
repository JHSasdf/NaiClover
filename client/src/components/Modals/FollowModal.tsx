import React from 'react';
import { Link } from 'react-router-dom';

type FollowModalProps = {
    closeModal: () => void;
    title: string;
    userId: string;
    users: any[]; // 사용자 목록에 대한 타입
    modalContent: string | null;
};

const FollowModal: React.FC<FollowModalProps> = ({
    closeModal,
    title,
    userId,
    users,
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={closeModal}>&times;</button>
                </div>
                <div className="modal-body">
                    {/* 사용자 목록 렌더링 */}
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>
                                <Link to={`/searchUser/${user.id}`}>
                                    {user.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FollowModal;
