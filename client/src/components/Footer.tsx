import { useEffect, useState } from 'react';
import '../styles/Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
    const navMessage = '/images/Chats.png';
    const navMessageColor = '/images/ChatsColor.png';
    const navPosts = '/images/GlobeSimple.png';
    const navPostsColor = '/images/GlobeSimpleColor.png';
    const navusersfour = '/images/UsersFour.png';
    const navusersfourColor = '/images/UsersFourColor.png';
    const navFavorites = '/images/Bookmarks.png';
    const navFavoritesColor = '/images/BookmarksColor.png';
    const navMypage = '/images/User.png';
    const navMypageColor = '/images/UserColor.png';

    const [hoveredDiv, setHoverdDiv] = useState('');
    const [clickedDiv, setClickedDiv] = useState('');

    // 페이지 로드 시 로컬 스토리지에서 클릭된 상태 가져오기
    useEffect(() => {
        const storedClickedDiv = localStorage.getItem('clickedDiv');
        if (storedClickedDiv) {
            setClickedDiv(storedClickedDiv);
        }
    }, []);

    const onMouseOver = (divName: string) => {
        setHoverdDiv(divName);
    };

    const onMouseLeave = () => {
        setHoverdDiv('');
    };

    // 클릭 시 변경된 이미지 고정.
    const clickMouse = (divName: string) => {
        setClickedDiv(divName);
        // 클릭된 상태를 로컬 스토리지에 저장
        localStorage.setItem('clickedDiv', divName);
    };

    return (
        <footer className="footer">
            <Link to={'/message'}>
                <div
                    className={`footer-div footerMessage ${
                        hoveredDiv === 'footerMessage' && 'hovered'
                        // 클래스가 footerMessage 이면 hovered, text-change 클래스를 가진다.
                    } ${clickedDiv === 'footerMessage' && 'text-change'}`}
                    onMouseOver={() => onMouseOver('footerMessage')}
                    onMouseLeave={() => onMouseLeave()}
                    onClick={() => clickMouse('footerMessage')}
                >
                    <img
                        className="footer-div-message-img"
                        src={
                            hoveredDiv === 'footerMessage' ||
                            clickedDiv === 'footerMessage'
                                ? navMessageColor
                                : navMessage
                        }
                        alt=""
                    />
                    <div className="text">Message</div>
                </div>
            </Link>
            <Link to={'/posts'}>
                <div
                    className={`footer-div posts ${
                        hoveredDiv === 'posts' && 'hovered'
                    }
          ${clickedDiv === 'posts' && 'text-change'}`}
                    onMouseOver={() => onMouseOver('posts')}
                    onMouseLeave={() => onMouseLeave()}
                    onClick={() => clickMouse('posts')}
                >
                    <img
                        src={
                            hoveredDiv === 'posts' || clickedDiv === 'posts'
                                ? navPostsColor
                                : navPosts
                        }
                        alt=""
                    />
                    <div className="text">Posts</div>
                </div>
            </Link>
            <Link to={'/monochat'}>
                <div
                    className={`footer-div usersfour ${
                        hoveredDiv === 'usersfour' && 'hovered'
                    } ${clickedDiv === 'usersfour' && 'text-change'}`}
                    onMouseOver={() => onMouseOver('usersfour')}
                    onMouseLeave={() => onMouseLeave()}
                    onClick={() => clickMouse('usersfour')}
                >
                    <img
                        src={
                            hoveredDiv === 'usersfour' ||
                            clickedDiv === 'usersfour'
                                ? navusersfourColor
                                : navusersfour
                        }
                        alt=""
                    />
                    <div className="text">MonoChat</div>
                </div>
            </Link>
            <Link to={'/errorlog'}>
                <div
                    className={`footer-div favorites ${
                        hoveredDiv === 'favorites' && 'hovered'
                    } ${clickedDiv === 'favorites' && 'text-change'}`}
                    onMouseOver={() => onMouseOver('favorites')}
                    onMouseLeave={() => onMouseLeave()}
                    onClick={() => clickMouse('favorites')}
                >
                    <img
                        src={
                            hoveredDiv === 'favorites' ||
                            clickedDiv === 'favorites'
                                ? navFavoritesColor
                                : navFavorites
                        }
                        alt=""
                    />
                    <div className="text">ErrorLog</div>
                </div>
            </Link>
            <Link to={'/mypage'}>
                <div
                    className={`footer-div mypage ${
                        hoveredDiv === 'mypage' && 'hovered'
                    } ${clickedDiv === 'mypage' && 'text-change'}`}
                    onMouseOver={() => onMouseOver('mypage')}
                    onMouseLeave={() => onMouseLeave()}
                    onClick={() => clickMouse('mypage')}
                >
                    <img
                        src={
                            hoveredDiv === 'mypage' || clickedDiv === 'mypage'
                                ? navMypageColor
                                : navMypage
                        }
                        alt=""
                    />
                    <div className="text">MyPage</div>
                </div>
            </Link>

            <div className="edge"></div>
        </footer>
    );
}

export default Footer;
