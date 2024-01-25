// SendComment.tsx
import React, { useState, ChangeEvent } from 'react';
import '../../styles/PostDetailSendComment.scss';

interface SendCommentProps {
    onSendComment: (content: string) => void;
}

const SendComment: React.FC<SendCommentProps> = ({ onSendComment }) => {
    const [comment, setComment] = useState('');

    const handleSendComment = () => {
        if (comment.trim() !== '') {
            onSendComment(comment);
            setComment('');
        }
    };

    return (
        <div className='entire-comment-container'>
            <div className='send-comment-container'>
                <input
                    type="text"
                    placeholder="Type something here..."
                    value={comment}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                />
                <div className="send-comment" onClick={handleSendComment}>
                    Send
                </div>
            </div>
        </div>
    );
};

export default SendComment;
