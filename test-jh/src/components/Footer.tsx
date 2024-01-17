import { useState } from 'react';
import '../styles/Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
  const navMessage = 'images/Chats.png';
  const navMessageColor = 'images/ChatsColor.png';
  const navPosts = 'images/globesimple.png';
  const navPostsColor = 'images/globesimpleColor.png';
  const navusersfour = 'images/UsersFour.png';
  const navusersfourColor = 'images/UsersFourColor.png';
  const navFavorites = 'images/bookmarks.png';
  const navFavoritesColor = 'images/bookmarksColor.png';
  const navMypage = 'images/user.png';
  const navMypageColor = 'images/userColor.png';

  const [hoveredDiv, setHoverdDiv] = useState('');
  const onMouseOver = (divName: string) => {
    setHoverdDiv(divName);
  };

  const onMouseLeave = () => {
    setHoverdDiv('');
  };

  return (
    <footer className="footer">
      <Link to={'/'}>
        <div
          className={`footer-div message ${
            hoveredDiv === 'message' && 'hovered'
          }`}
          onMouseOver={() => onMouseOver('message')}
          onMouseLeave={() => onMouseLeave()}
        >
          <img
            className="footer-div-message-img"
            src={hoveredDiv === 'message' ? navMessageColor : navMessage}
            alt=""
          />
          <div>Message</div>
        </div>
      </Link>
      <Link to={'/'}>
        <div
          className={`footer-div posts ${hoveredDiv === 'posts' && 'hovered'}`}
          onMouseOver={() => onMouseOver('posts')}
          onMouseLeave={() => onMouseLeave()}
        >
          <img src={hoveredDiv === 'posts' ? navPostsColor : navPosts} alt="" />
          <div>Posts</div>
        </div>
      </Link>
      <Link to={'/'}>
        <div
          className={`footer-div usersfour ${
            hoveredDiv === 'usersfour' && 'hovered'
          }`}
          onMouseOver={() => onMouseOver('usersfour')}
          onMouseLeave={() => onMouseLeave()}
        >
          <img
            src={hoveredDiv === 'usersfour' ? navusersfourColor : navusersfour}
            alt=""
          />
          <div>MonoChat</div>
        </div>
      </Link>
      <Link to={'/'}>
        <div
          className={`footer-div favorites ${
            hoveredDiv === 'favorites' && 'hovered'
          }`}
          onMouseOver={() => onMouseOver('favorites')}
          onMouseLeave={() => onMouseLeave()}
        >
          <img
            src={hoveredDiv === 'favorites' ? navFavoritesColor : navFavorites}
            alt=""
          />
          <div>Favorites</div>
        </div>
      </Link>
      <Link to={'/mypage'}>
        <div
          className={`footer-div mypage ${
            hoveredDiv === 'mypage' && 'hovered'
          }`}
          onMouseOver={() => onMouseOver('mypage')}
          onMouseLeave={() => onMouseLeave()}
        >
          <img
            src={hoveredDiv === 'mypage' ? navMypageColor : navMypage}
            alt=""
          />
          <div>My Page</div>
        </div>
      </Link>

      <div className="edge"></div>
    </footer>
  );
}

export default Footer;
