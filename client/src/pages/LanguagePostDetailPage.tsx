import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import Topbar from '../components/Topbar';
import LanguageComment from '../components/postdetailpage/LanguageComment';
import PostDetailHeader from '../components/postdetailpage/PostDetailHeader';
import SendComment from '../components/postdetailpage/SendComment';
import LanguagePost from '../components/postspage/LanguagePost';
import '../styles/PostDetailPage.scss';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

interface CommentItem {
    index: number;
    content: string;
    userid: string;
}

function LanguagePostDetailPage() {
    const { id } = useParams();

    const [languagePost, setLanguagePost] = useState<any>([]);

    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];

    const getSingleLanguagePost = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/lang/posts/${id}`,
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setLanguagePost(res.data.posts);
            console.log(languagePost);
        } catch (error) {
            console.log('error', error);
        }
    };

    const [comments, setComments] = useState<CommentItem[]>([]);

    const addComment = async (content: string) => {
        try {
            const res = await axios({
                method: 'post',
                url: `/lang/comments/createcomment/${id}`,
                data: {
                    content: content,
                    //일단 isrevised는 디폴트로 false해둘게요.
                    isrevised: false,
                },
                withCredentials: true,
            });
            const newComment: CommentItem = res.data.comment;
            setComments((prevComments) => [...prevComments, newComment]);
        } catch (error) {
            console.log('error', error);
        }
    };
    const getComments = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/lang/comments/${id}`,
                withCredentials: true,
            });
            setComments(res.data.Comments);
        } catch (error) {
            console.log('error', error);
        }
    };
    useEffect(() => {
        getComments();
        getSingleLanguagePost();
    }, []);

    return (
        <>
            <div className="postdetailpage-container">
                <Topbar />
                <PostDetailHeader />
                <LanguagePost
                    key={languagePost.postId}
                    content={languagePost.content}
                    createdAt={languagePost.createdAt}
                    userid={languagePost.userid}
                    id={languagePost.postId}
                    name={languagePost.User?.name}
                />
                <div className="languagecomment-container">
                    {comments?.map((comment, index) => (
                        <LanguageComment
                            key={index}
                            index={comment.index}
                            content={comment.content}
                            name={comment.userid}
                        />
                    ))}
                </div>
                <SendComment onSendComment={addComment} />
            </div>
        </>
    );
}

export default LanguagePostDetailPage;
