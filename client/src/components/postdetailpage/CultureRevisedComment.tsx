// Import necessary modules or components here
import '../../styles/PostDetailComment.scss';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../../types/types';
import { Link } from 'react-router-dom';

interface CultureRevisedCommentProps {
    index: number;
    profileImgPath: string;
    userid: string;
    time: string;
    name: string;
    nation: string;
    getcomment: () => void;
    content: string;
}

function CultureRevisedComment(props: CultureRevisedCommentProps) {
    const [cookies] = useCookies(['id']);
    const idCookie = cookies['id'];
    const [userData, setUserData] = useState<User>();
    const [profileImg, setProfileImg] = useState<string>('');

    const deleteComment = async () => {
        try {
            const res = await axios({
                method: 'delete',
                url: `/cul/comments/${props.index}`,
                withCredentials: true,
            });
            props.getcomment();
        } catch (error) {
            console.log('error', error);
        }
    };

    const getMyPage = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `/userinfo/${props.userid}`,
                params: {
                    userid: props.userid,
                },
                withCredentials: true,
            });
            setUserData(res.data.userDataObj);
            setProfileImg(props.profileImgPath);
        } catch (error) {
            console.log('error???', error);
        }
    };

    useEffect(() => {
        getMyPage();
    }, []);

    const filteredContentArray = props.content.split('&&&&').filter(part => part.includes('/./'));

    return (
        <>
            <div className="comment-container">
                <div className="comment-image-container">
                    <img
                        className="comment-profile-pic"
                        src={profileImg}
                        alt=""
                        onClick={() => {
                            window.location.href = `/searchUser/${props.userid}`;
                        }}
                    />
                    <img
                        className="comment-flag-pic"
                        src={`/images/flag/${idCookie === props.userid ? userData?.nation : props.nation}.png`}
                        alt=""
                    />
                </div>

                <div className="comment-inside-container">
                    <div className="comment-header-container">
                        <Link
                            className="comment-username"
                            to={`/searchUser/${props.userid}`}
                        >
                            {props.name}
                        </Link>
                        {props.userid === idCookie && (
                            <div
                                className="comment-more"
                                onClick={() => {
                                    deleteComment();
                                }}
                            />
                        )}
                    </div>
                    <div className="comment-content">
                        {filteredContentArray.map((filteredContent, i) => {
                            const subContents = filteredContent.split('/./');
                            return (
                                <div key={i}>
                                    <div className='before-comment-content'>
                                        <div>{subContents[0]}</div>
                                        <div className='beforecheck-text'>Before</div>
                                    </div>
                                    <div className='after-comment-content'>
                                        <div>{subContents.slice(1).join('/./')}</div>
                                        <div className='correction-text'>After</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="comment-footer-container">
                        <div className="comment-date">{props.time}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CultureRevisedComment;
