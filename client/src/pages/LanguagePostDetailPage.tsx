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
import { User } from '../types/types';
import useErrorHandler from '../utils/useErrorHandler';
import LanguageRevisedComment from '../components/postdetailpage/LanguageRevisedComment';

interface CommentItem {
    index: number;
    content: string;
    userid: string;
    createdAt: string;
    User: User;
    profileImgPath: string;
    isrevised: boolean;
}

function LanguagePostDetailPage() {
    const { id } = useParams();
    const { errorHandler } = useErrorHandler();
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
                url: `/lang/comments/createcomment/${id}`,
                data: {
                    postUserId: languagePost.userid,
                    content: content,
                    //일단 isrevised는 디폴트로 false해둘게요.
                    isrevised: false,
                    postType: languagePost.postType,
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
                url: `/lang/comments/${id}`,
                withCredentials: true,
            });
            setComments(res.data.Comments);
            console.log('?????', res.data);
        } catch (error: any) {
            errorHandler(error.response.status);
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
                    type={languagePost.postType}
                    content={languagePost.content}
                    createdAt={languagePost.createdAt}
                    userid={languagePost.userid}
                    profileImgPath={languagePost?.User?.profileImgPath}
                    id={languagePost.postId}
                    nation={languagePost.User?.nation}
                    name={languagePost.User?.name}
                />
                <div className="languagecomment-container">
                    {comments?.map((comment, index) => {
                        if (!comment.isrevised) {
                            return (
                                <LanguageComment
                                    key={index}
                                    index={comment.index}
                                    type={languagePost.postType}
                                    profileImgPath={
                                        comment.User?.profileImgPath
                                    }
                                    content={comment.content}
                                    userid={comment.userid}
                                    time={comment.createdAt}
                                    name={comment.User?.name}
                                    nation={comment.User?.nation}
                                    getcomment={getComments}
                                />
                            );
                        } else {
                            return (

                                <LanguageRevisedComment
                                    key={index}
                                    index={comment.index}
                                    profileImgPath={
                                        comment.User?.profileImgPath
                                    }
                                    content={comment.content}
                                    userid={comment.userid}
                                    time={comment.createdAt}
                                    name={comment.User?.name}
                                    nation={comment.User?.nation}
                                    getcomment={getComments}
                                />
                            ); 
                        }
                    })}
                </div>
                <SendComment
                    onSendComment={addComment}
                    postUserId={languagePost.userid}
                />
            </div>
        </>
    );
}

export default LanguagePostDetailPage;
