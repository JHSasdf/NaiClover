import '../../styles/PostDetailComment.scss';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function LanguageComment(props: any) {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];
    const deleteComment = async () => {
        try {
            const res = await axios({
                method: 'delete',
                url: `/lang/comments/${props.index}`,
                withCredentials: true,
            });
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <>
            <div className="comment-container">
                <div className="comment-image-container">
                    <div className="comment-profile-pic">
                        {/* <img src={profileImg} alt="" /> */}
                        {/* getSimpleUserInfo 함수 만들 예정. 해당 유저의 아이디, 프로필사진, 국기사진 가져옴. 댓글마다, 채팅마다 활용할 수 있게 사용 예정. */}
                    </div>
                    <div className="comment-flag-pic"></div>
                </div>

                <div className="comment-inside-container">
                    <div className="comment-header-container">
                        <div className="comment-username">{props.name}</div>
                        {props.name == idCookie ? (
                            <div
                                className="comment-more"
                                onClick={() => {
                                    deleteComment();
                                    window.location.reload();
                                }}
                            ></div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="comment-content">{props.content}</div>
                    <div className="comment-footer-container">
                        <div className="comment-date">2024-01-22</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LanguageComment;
