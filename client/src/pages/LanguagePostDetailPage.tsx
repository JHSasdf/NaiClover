import {useState} from 'react';

import Topbar from "../components/Topbar";
import LanguageComment from "../components/postdetailpage/LanguageComment";
import PostDetailHeader from "../components/postdetailpage/PostDetailHeader";
import SendComment from "../components/postdetailpage/SendComment";
import LanguagePost from "../components/postspage/LanguagePost";
import '../styles/PostDetailPage.scss'

interface CommentItem {
    id: number;
    content: string;
}

function LanguagePostDetailPage() {

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
                <Topbar/>
                <PostDetailHeader/>
                <LanguagePost/>
                <div className="languagecomment-container">
                    {comments.map((comment) => (
                        <LanguageComment key={comment.id} content={comment.content} />
                    ))}
                </div>
                <SendComment onSendComment={addComment} />
            </div>
        </>
     );
}

export default LanguagePostDetailPage;