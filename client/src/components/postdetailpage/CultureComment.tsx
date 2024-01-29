import '../../styles/PostDetailComment.scss';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { User } from '../../types/types';

function CultureComment(props: any) {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
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
            window.location.reload();
        } catch (error) {
            console.log('error', error);
        }
    };

    const getMyPage = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/getMyPage',
                params: {
                    userid: props.name,
                },
                withCredentials: true,
            });
            setUserData(res.data.userDataObj);
            setProfileImg(res.data.userDataObj.MypageImage.path);
        } catch (error) {
            console.log('error???', error);
        }
    };
    useEffect(() => {
        getMyPage();
    }, []);
    return (
        <>
            <div className="comment-container">
                <div className="comment-image-container">
                    <img
                        className="comment-profile-pic"
                        src={profileImg}
                        alt=""
                    />{' '}
                    <img
                        className="comment-flag-pic"
                        src={userData?.nation}
                        alt={userData?.nation}
                    ></img>
                </div>

                <div className="comment-inside-container">
                    <div className="comment-header-container">
                        <div className="comment-username">{props.name}</div>
                        {props.name == idCookie ? (
                            <div
                                className="comment-more"
                                onClick={() => {
                                    deleteComment();
                                }}
                            ></div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="comment-content">{props.content}</div>
                    <div className="comment-footer-container">
                        <div className="comment-date">{props.time}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CultureComment;
