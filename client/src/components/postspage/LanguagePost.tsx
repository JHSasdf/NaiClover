import '../../styles/LanguagePost.scss';
import '../../styles/Font.scss';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function LanguagePost(props: any) {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];
    const deletePost = async () => {
        try {
            const res = await axios({
                method: 'delete',
                url: `/lang/posts/${props.id}`,
                data: {
                    userid: props.userid,
                },
                withCredentials: true,
            });
        } catch (error) {
            console.error('error', error);
        }
    };
    return (
        <div className="lang-post-container">
            <div className="lang-post">
                <div className="lang-profile-container">
                    <div className="lang-image-container">
                        <div className="lang-profile-image"></div>
                        <div className="lang-flag-image"></div>
                    </div>

                    <div className="lang-info-container">
                        <div className="lang-info">
                            <div className="lang-gender lang-male"></div>
                            <div className="lang-name">{props.name}</div>
                        </div>
                        <div className="lang-location">{props.nation}</div>

                        <div className="lang-language-container">
                            <div className="lang-native-language">EN</div>
                            <div className="lang-arrow"></div>
                            <div className="lang-learning-language">KR</div>
                        </div>
                    </div>
                </div>

                <div className="lang-more-container">
                    <div className="lang-time">{props.createdAt}</div>
                    {idCookie === props.userid ? (
                        <div
                            className="lang-more"
                            onClick={() => {
                                deletePost();
                                window.location.href = '/posts';
                            }}
                        ></div>
                    ) : (
                        <div>수정해주기버튼</div>
                    )}
                </div>

                <div
                    className="lang-content-text"
                    onClick={() => navigate(`/l-postdetail/${props.id}`)}
                >
                    {props.content}
                </div>

                <div className="lang-reaction-container">
                    <div className="lang-likes-container">
                        <div className="lang-likes"></div>
                        <div className="lang-likes-count">524</div>
                    </div>

                    <div
                        className="lang-comments-container"
                        onClick={() => navigate('/l-postdetail')}
                    >
                        <div className="lang-comments"></div>
                        <div className="lang-comments-count">8</div>
                    </div>

                    <div className="lang-bookmark-container">
                        <div className="lang-bookmark"></div>
                        <div className="lang-bookmark-text">저장</div>
                    </div>
                </div>
            </div>
            <div className="lang-line"></div>
        </div>
    );
}

export default LanguagePost;
