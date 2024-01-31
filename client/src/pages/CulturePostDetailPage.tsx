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
import { User } from '../types/types';
import useErrorHandler from '../utils/useErrorHandler';

interface CommentItem {
    index: number;
    content: string;
    userid: string;
    createdAt: string;
    User: User;
    profileImgPath: string;
}

function CulturePostDetailPage() {
    const { id } = useParams();

    const [culturePost, setCulturePost] = useState<any>([]);
    const { errorHandler } = useErrorHandler();
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
            console.log('getSingleCulturePost', res.data.posts);
        } catch (error: any) {
            errorHandler(error.response.status);
            console.log('error', error);
        }
    };

    const [comments, setComments] = useState<CommentItem[]>([]);

    const addComment = async (content: string) => {
        try {
            const res = await axios({
                method: 'post',
                url: `/cul/comments/createcomment/${id}`,
                data: {
                    content: content,
                    postUserId: culturePost.userid,
                    //일단 isrevised는 디폴트로 false해둘게요.
                    isrevised: false,
                    postType: culturePost.postType,
                },
                withCredentials: true,
            });
            getComments();
        } catch (error: any) {
            errorHandler(error.response.status);
            console.log('error', error);
        }
    };
    const getComments = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/cul/comments/${id}`,
                withCredentials: true,
            });
            setComments(res.data.Comments);
        } catch (error: any) {
            errorHandler(error.response.status);
            console.log('error', error);
        }
    };
    useEffect(() => {
        getComments();
        getSingleCulturePost();
    }, []);
    useEffect(() => {
        console.log('???', culturePost); // culturePost가 변경될 때마다 로그 출력
    }, [culturePost]);
    return (
        <>
            <div className="postdetailpage-container">
                <Topbar />
                <PostDetailHeader />
                <CulturePost
                    content={culturePost.content}
                    userid={culturePost.userid}
                    id={culturePost.postId}
                    profileImgPath={culturePost?.User?.profileImgPath}
                    createdAt={culturePost.createdAt}
                    name={culturePost.User?.name}
                    nation={culturePost.User?.nation}
                    images={culturePost}
                />
                <div className="culturecomment-container">
                    {comments?.map((comment, index) => (
                        <CultureComment
                            key={index}
                            index={comment.index}
                            content={comment.content}
                            profileImgPath={comment.User?.profileImgPath}
                            userid={comment.userid}
                            time={comment.createdAt}
                            name={comment.User?.name}
                            nation={comment.User?.nation}
                            getcomment={getComments}
                        />
                    ))}
                </div>
                <SendComment
                    onSendComment={addComment}
                    postUserId={culturePost.userid}
                />
            </div>
        </>
    );
}

export default CulturePostDetailPage;
