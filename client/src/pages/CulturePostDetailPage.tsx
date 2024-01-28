import { useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Topbar from '../components/Topbar';
import CultureComment from '../components/postdetailpage/CultureComment';
import PostDetailHeader from '../components/postdetailpage/PostDetailHeader';
import SendComment from '../components/postdetailpage/SendComment';
import CulturePost from '../components/postspage/CulturePost';
import '../styles/PostDetailPage.scss';

interface CommentItem {
    id: number;
    content: string;
}

function CulturePostDetailPage() {
    const { id } = useParams();

    const [culturePost, setCulturePost] = useState<any>([]);

    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];

    const getSingleCulturePost = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/cul/posts/${id}`,
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setCulturePost(res.data.posts);
            console.log(culturePost);
        } catch (error) {
            console.log('error', error);
        }
    };

    const [comments, setComments] = useState<CommentItem[]>([]);

    const addComment = (content: string) => {
        const newComment: CommentItem = {
            id: Date.now(), // Assuming unique identifier for each comment
            content: content,
        };
        setComments((prevComments) => [...prevComments, newComment]);
    };

    useEffect(() => {
        getSingleCulturePost();
    }, []);

    return (
        <>
            <div className="postdetailpage-container">
                <Topbar />
                <PostDetailHeader />
                <CulturePost
                    content={culturePost.content}
                    userid={culturePost.userid}
                    id={culturePost.postId}
                    createdAt={culturePost.createdAt}
                    name={culturePost.User?.name}
                    images={culturePost}
                />
                <div className="culturecomment-container">
                    {comments.map((comment) => (
                        <CultureComment
                            key={comment.id}
                            content={comment.content}
                        />
                    ))}
                </div>
                <SendComment onSendComment={addComment} />
            </div>
        </>
    );
}

export default CulturePostDetailPage;
