import '../../styles/CulturePost.scss';
import '../../styles/Font.scss';
import { User } from '../../types/types';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect } from 'react';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import '../../styles/Swiper.scss';

function CulturePost(props: any) {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];
    const [profileImg, setProfileImg] = useState<string>('');
    const [userData, setUserData] = useState<User>();
    const [learningLang, setLearningLang] = useState();
    const deletePost = async () => {
        try {
            const res = await axios({
                method: 'delete',
                url: `/cul/posts/${props.id}`,
                data: {
                    userid: props.userid,
                },
                withCredentials: true,
            });
        } catch (error) {
            console.error('error', error);
        }
    };
    const { id } = props;
    // Load initial like status from local storage
    const initialLikeStatus = localStorage.getItem(`likeStatus_${props.id}`);
    const [isLiked, setIsLiked] = useState(
        initialLikeStatus ? JSON.parse(initialLikeStatus) : false
    );
    const shortName = (nation: string | undefined): string | undefined => {
        if (nation === 'China' || nation === 'Chinese') {
            return 'CN';
        } else if (nation === 'America' || nation === 'English') {
            return 'US';
        } else if (nation === 'France' || nation === 'French') {
            return 'FR';
        } else if (nation === 'Germany' || nation === 'German') {
            return 'GM';
        } else if (nation === 'Japan' || nation === 'Japanese') {
            return 'JP';
        } else {
            return 'KR';
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
            setLearningLang(res.data.learningLang);
        } catch (error) {
            console.log('error???', error);
        }
    };
    useEffect(() => {
        getMyPage();
        // Save the current like status to local storage
        localStorage.setItem(`likeStatus_${props.id}`, JSON.stringify(isLiked));
    }, [props.id, isLiked]);

    //문화 좋아요 버튼 토글
    const culToggleLike = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: `/cul/posts/${id}`,
                data: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            console.log(res.data);

            setIsLiked((prevIsLiked: any) => !prevIsLiked);
        } catch (error) {
            console.log('error', error);
        }
    };

    const hasImages =
        props.images.PostImages && props.images.PostImages.length > 0;

    return (
        <div className="cul-post-container">
            <div className="cul-post">
                <div className="cul-profile-container">
                    <div className="cul-image-container">
                        <img
                            className="cul-profile-image"
                            src={profileImg}
                            alt=""
                        ></img>
                        <img
                            className="cul-flag-image"
                            src={userData?.nation}
                            alt={userData?.nation}
                        ></img>
                    </div>

                    <div className="cul-info-container">
                        <div className="cul-info">
                            <div className="cul-gender cul-male"></div>
                            <div className="cul-name">{props.name}</div>
                        </div>
                        <div className="cul-location">{props.nation}</div>

                        <div className="cul-language-container">
                            <div className="cul-native-language">
                                {shortName(props.firLang)}
                            </div>
                            <div className="cul-arrow"></div>
                            <div className="cul-learning-language">
                                {' '}
                                {learningLang &&
                                    learningLang[0] &&
                                    shortName(learningLang[0])}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cul-more-container">
                    <div className="cul-time">{props.createdAt}</div>
                    {idCookie === props.userid ? (
                        <div
                            className="cul-more"
                            onClick={() => {
                                deletePost();
                                window.location.reload();
                            }}
                        ></div>
                    ) : (
                        '수정해주기버튼'
                    )}
                </div>

                {hasImages && (
                    <div className="cul-content-images">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            spaceBetween={10}
                            slidesPerView={1}
                        >
                            {props.images.PostImages?.map(
                                (image: string, index: number) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={
                                                props.images.PostImages[index]
                                                    .path
                                            }
                                            alt={image}
                                            className="eachImage"
                                        />
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>
                    </div>
                )}

                <div
                    className="cul-content-text"
                    onClick={() => navigate(`/c-postdetail/${props.id}`)}
                >
                    {props.content}
                </div>

                <div className="cul-reaction-container">
                    <div className="cul-likes-container">
                        <div
                            className={`cul-likes' ${
                                isLiked ? 'liked' : 'unliked'
                            }`}
                            onClick={culToggleLike}
                        ></div>
                        <div className="cul-likes-count">524</div>
                    </div>
                    <div
                        className="cul-comments-container"
                        onClick={() => navigate('/c-postdetail')}
                    >
                        <div className="cul-comments"></div>
                        <div className="cul-comments-count">8</div>
                    </div>
                    <div className="cul-bookmark-container"></div>
                </div>
            </div>
            <div className="cul-line"></div>
        </div>
    );
}

export default CulturePost;
