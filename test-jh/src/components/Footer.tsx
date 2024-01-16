import React, { useState } from 'react';
import '../styles/Footer.scss'




function Footer() {
    const navMessage = "images/Chats.png";
    const navMessageColor = "images/ChatsColor.png";
    const navPosts = "images/globesimple.png"
    const navPostsColor = "images/globesimpleColor.png"
    const navSearch = "images/magnifyingglass.png"
    const navSearchColor = "images/magnifyingglassColor.png"
    const navFavorites = "images/bookmarks.png"
    const navFavoritesColor = "images/bookmarksColor.png"
    const navMypage = "images/user.png"
    const navMypageColor = "images/userColor.png"


    const [hoveredDiv, setHoverdDiv] = useState('');
    const onMouseOver = (divName : string) => {
        setHoverdDiv(divName);
    }

    const onMouseLeave = () => {
        setHoverdDiv('');
    }
    
    return ( 
    <footer className='footer'>
        <div className={`footer-div message ${hoveredDiv === 'message' && 'hovered'}`}
        onMouseOver={() => onMouseOver('message')} 
        onMouseLeave={() => onMouseLeave()}>
            <img className="footer-div-message-img" 
            src={hoveredDiv === 'message' ? navMessageColor : navMessage} alt="" />
            <div>Message</div>
        </div>
        <div className={`footer-div posts ${hoveredDiv === 'posts' && 'hovered'}`}
        onMouseOver={() => onMouseOver('posts')}
        onMouseLeave={() => onMouseLeave()}>
        <img src={hoveredDiv === 'posts' ? navPostsColor : navPosts} alt="" />
        <div>Posts</div>
      </div>
      <div className={`footer-div search ${hoveredDiv === 'search' && 'hovered'}`}
        onMouseOver={() => onMouseOver('search')}
        onMouseLeave={() => onMouseLeave()}>
        <img src={hoveredDiv === 'search' ? navSearchColor : navSearch} alt="" />
        <div>Search</div>
      </div>
      <div className={`footer-div favorites ${hoveredDiv === 'favorites' && 'hovered'}`}
        onMouseOver={() => onMouseOver('favorites')}
        onMouseLeave={() => onMouseLeave()}>
        <img src={hoveredDiv === 'favorites' ? navFavoritesColor : navFavorites} alt="" />
        <div>Favorites</div>
      </div>
      <div className={`footer-div mypage ${hoveredDiv === 'mypage' && 'hovered'}`}
        onMouseOver={() => onMouseOver('mypage')}
        onMouseLeave={() => onMouseLeave()}>
        <img src={hoveredDiv === 'mypage' ? navMypageColor : navMypage} alt="" />
        <div>My Page</div>
      </div>
    </footer> );
}

export default Footer;