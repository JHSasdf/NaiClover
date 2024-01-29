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
    const [culturePosts, setCulturePosts] = useState([]);
    const [languagePosts, setLanguagePosts] = useState([]);

    const handleLanguageClick = () => {
        setShowLanguagePosts(!showLanguagePosts);
        setShowCulturePosts(false);
    };

    const handleCultureClick = async () => {
        setShowLanguagePosts(false);
        setShowCulturePosts(!showCulturePosts);
    };

    const getCulturePosts = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/cul/posts',
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setCulturePosts(res.data.PostsDatas);
            console.log(culturePosts);
        } catch (error) {
            console.log('error', error);
        }
    };

    const getLanguagePosts = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/lang/posts',
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            console.log(res.data);
            setLanguagePosts(res.data.PostsDatas);
            console.log('ㅇㅇ?', languagePosts);
        } catch (error) {
            console.log('error', error);
        }
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
        getLanguagePosts();
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
                    onClick={() => {
                        handleCultureClick();
                        getCulturePosts();
                    }}
                >
                    Culture
                </div>
                <br />
            </div>

            {showLanguagePosts && (
                <div className="language-posts-container">
                    {languagePosts
                        .slice(0)
                        .reverse()
                        .map((languagePostData: any) => {
                            return (
                                <LanguagePost
                                    key={languagePostData[0].postId}
                                    userid={languagePostData[0].userid}
                                    name={languagePostData[0].User.name}
                                    id={languagePostData[0].postId}
                                    nation={languagePostData[0].User.nation}
                                    firLang={languagePostData[0].User.firLang}
                                    createdAt={languagePostData[0].createdAt}
                                    content={languagePostData[0].content}
                                    likecount={languagePostData[1]}
                                    commentcount={languagePostData[3]}
                                />
                            );
                        })}
                </div>
            )}

            {showCulturePosts && (
                <div className="culture-posts-container">
                    {culturePosts
                        .slice(0)
                        .reverse()
                        .map((culturePostData: any) => {
                            return (
                                <CulturePost
                                    key={culturePostData[0].postId}
                                    id={culturePostData[0].postId}
                                    userid={culturePostData[0].userid}
                                    name={culturePostData[0].User.name}
                                    nation={culturePostData[0].User.nation}
                                    firLang={culturePostData[0].User.firLang}
                                    learningLang={
                                        culturePostData[0].User.firLang
                                    }
                                    createdAt={culturePostData[0].createdAt}
                                    content={culturePostData[0].content}
                                    images={culturePostData[0]}
                                    likecount={culturePostData[1]}
                                    commentcount={culturePostData[3]}
                                />
                            );
                        })}
                </div>
            )}

            <Footer />
        </div>
    );
}

export default PostsPage;
