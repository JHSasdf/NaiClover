import React from 'react';
import '../styles/Footer.scss'

function Footer() {
    return ( 
    <footer className='footer'>
        <div className='footer-div message'>
            <img src="images/chats.png" alt="" />
            <div>Message</div>
        </div>
        <div className='footer-div posts'>
            <img src="images/globesimple.png" alt="" />
            <div>Posts</div>
        </div>
        <div className='footer-div search'>
            <img src="images/magnifyingglass.png" alt="" />
            <div>Search</div>
        </div>
        <div className='footer-div favorites'>
            <img src="images/bookmarks.png" alt="" />
            <div>Favorites</div>
        </div>
        <div className='footer-div mypage'>
            <img src="images/user.png" alt="" />
            <div>My Page</div>
        </div>
    </footer> );
}

export default Footer;