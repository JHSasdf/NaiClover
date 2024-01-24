// CulturePostDetailPage.tsx
import React, { useState } from 'react';
import Topbar from "../components/Topbar";
import CultureComment from "../components/postdetailpage/CultureComment";
import PostDetailHeader from "../components/postdetailpage/PostDetailHeader";
import SendComment from "../components/postdetailpage/SendComment";
import CulturePost from "../components/postspage/CulturePost";
import '../styles/PostDetailPage.scss'

interface CommentItem {
    id: number;
    content: string;
}

function CulturePostDetailPage() {
    const [comments, setComments] = useState<CommentItem[]>([]);

    const addComment = (content: string) => {
        const newComment: CommentItem = {
            id: Date.now(), // Assuming unique identifier for each comment
            content: content,
        };
        setComments((prevComments) => [...prevComments, newComment]);
    };

    return (
        <>
            <div className="postdetailpage-container">
                <Topbar />
                <PostDetailHeader />
                <CulturePost />
                <div className="culturecomment-container">
                    {comments.map((comment) => (
                        <CultureComment key={comment.id} content={comment.content} />
                    ))}
                </div>
                <SendComment onSendComment={addComment} />
            </div>
        </>
    );
}

export default CulturePostDetailPage;
