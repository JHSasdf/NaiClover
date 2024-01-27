import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';

import Topbar from "../components/Topbar";
import LanguageComment from "../components/postdetailpage/LanguageComment";
import PostDetailHeader from "../components/postdetailpage/PostDetailHeader";
import SendComment from "../components/postdetailpage/SendComment";
import LanguagePost from "../components/postspage/LanguagePost";
import '../styles/PostDetailPage.scss'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

interface CommentItem {
    id: number;
    content: string;
}

function LanguagePostDetailPage() {
    const {id} = useParams();

    const [languagePost, setLanguagePost] = useState<any>([]);

    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];

    const getSingleLanguagePost = async () => {
        try{
            const res = await axios({
                method: 'get',
                url: `/lang/posts/${id}`,
                params: {
                    userid: idCookie,
                }
            });
            setLanguagePost(res.data.posts);
            console.log(languagePost);
        }catch(error){
            console.log('error', error);
        }
    }

    const [comments, setComments] = useState<CommentItem[]>([]);

    const addComment = async (content: string) => {
        try {
            const res = await axios({
                method: 'post',
                url: `/lang/comments/createcomment/${id}`,
                data: {
                    content: content,
                    userid: idCookie,
                }
            });

            const newComment: CommentItem = res.data.comment;
            setComments((prevComments) => [...prevComments, newComment]);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(()=>{
        getSingleLanguagePost();
    }, []);

    return ( 
        <>
            <div className="postdetailpage-container">
                <Topbar/>
                <PostDetailHeader/>
                <LanguagePost content={languagePost.content} createdAt={languagePost.createdAt} name={languagePost.User?.name}/>
                <div className="languagecomment-container">
                    {comments.map((comment) => (
                        <LanguageComment key={comment.id} content={comment.content}/>
                    ))}
                </div>
                <SendComment onSendComment={addComment} />
            </div>
        </>
     );
}

export default LanguagePostDetailPage;