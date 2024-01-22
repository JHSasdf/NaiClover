import React, { useState } from 'react';
import CulturePost from '../components/postspage/CulturePost';
import LanguagePost from '../components/postspage/LanguagePost';
import '../styles/PostCategory.scss';
import Search from '../components/postspage/Search';
import Header from '../components/postspage/PostsHeader';
import Topbar from '../components/Topbar';
import '../styles/PostsPage.scss';
import Footer from '../components/Footer';

function PostsPage() {
    const [showLanguagePosts, setShowLanguagePosts] = useState(true);
    const [showCulturePosts, setShowCulturePosts] = useState(false);

    const handleLanguageClick = () => {
        setShowLanguagePosts(!showLanguagePosts);
        setShowCulturePosts(false);
    };

    const handleCultureClick = () => {
        setShowLanguagePosts(false);
        setShowCulturePosts(!showCulturePosts);
    };

    return (
        <div className="postspage-container">
            <Topbar />
            <Header />
            <Search />
            <div className="category-component">
                <div
                    className={`btn_lang ${
                        showLanguagePosts
                            ? 'active category-component-changed'
                            : ''
                    }`}
                    onClick={handleLanguageClick}
                >
                    언어
                </div>
                <br />
                <div
                    className={`btn_culture ${
                        showCulturePosts
                            ? 'active category-component-changed'
                            : ''
                    }`}
                    onClick={handleCultureClick}
                >
                    문화
                </div>
                <br />
            </div>

            {showLanguagePosts && (
                <div className="language-posts-container">
                    <LanguagePost />
                    <LanguagePost />
                    <LanguagePost />
                </div>
            )}

            {showCulturePosts && (
                <div className="culture-posts-container">
                    <CulturePost />
                </div>
            )}

            <Footer />
        </div>
    );
}

export default PostsPage;
