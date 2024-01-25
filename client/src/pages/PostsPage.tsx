import CulturePost from '../components/postspage/CulturePost';
import LanguagePost from '../components/postspage/LanguagePost';
import '../styles/PostCategory.scss';
import Search from '../components/postspage/Search';
import Header from '../components/postspage/PostsHeader';
import Topbar from '../components/Topbar';
import '../styles/PostsPage.scss';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

function PostsPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];
    const [showLanguagePosts, setShowLanguagePosts] = useState(true);
    const [showCulturePosts, setShowCulturePosts] = useState(false);
    const [newAlarmNum, setNewAlarmNum] = useState<Number>(0);
    const handleLanguageClick = () => {
        setShowLanguagePosts(!showLanguagePosts);
        setShowCulturePosts(false);
    };

    const handleCultureClick = () => {
        setShowLanguagePosts(false);
        setShowCulturePosts(!showCulturePosts);
    };
    const newAlarmNumGet = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: 'newAlarmNumGet',
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setNewAlarmNum(res.data.newAlarmNumber);
        } catch (error) {
            console.log('error:', error);
        }
    };
    useEffect(() => {
        newAlarmNumGet();
    }, []);
    return (
        <div className="postspage-container">
            <Topbar />
            <Header newAlarmNum={newAlarmNum} />
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
                    Language
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
                    Culture
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
