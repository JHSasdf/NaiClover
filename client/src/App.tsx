import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cookieConfig } from './utils/cookieConfig';
import { useCookies } from 'react-cookie';

import PostsPage from './pages/PostsPage';
import SignupPage from './pages/SignupPage';
import NewPostPage from './pages/NewPostPage';
import FollowPage from './pages/FollowPage';
import AlarmPage from './pages/AlarmPage';

import { v4 as uuidv4 } from 'uuid';

import Mypage from './pages/Mypage';
import LoginPage from './pages/LoginPage';
import MypageOption from './components/Mypage/MypageOption';
import MypageEditPassword from './components/Mypage/MypageEditPassword';
import PostDetailPage from './pages/LanguagePostDetailPage';
import CulturePostDetailPage from './pages/CulturePostDetailPage';
import LanguagePostDetailPage from './pages/LanguagePostDetailPage';
import AlertPage from './pages/AlertPage';
import MypageEditLanguage from './components/Mypage/MypageEditLanguage';
import 'bootstrap/dist/css/bootstrap.min.css';

export const generateUniqueId = () => {
    return uuidv4();
};

function App() {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unusedCookies = setCookies;
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/newpost" element={<NewPostPage />} />
                    <Route path="/posts" element={<PostsPage />} />
                    {cookies['id'] && cookies['id'].length > 3 ? (
                        <Route path="/" element={<PostsPage />} />
                    ) : (
                        <Route path="/" element={<LoginPage />} />
                    )}
                    <Route
                        path="/newpost"
                        element={<NewPostPage></NewPostPage>}
                    ></Route>
                    <Route path="/posts" element={<PostsPage />}></Route>
                    <Route
                        path="/c-postdetail"
                        element={<CulturePostDetailPage />}
                    ></Route>
                    <Route
                        path="/l-postdetail"
                        element={<LanguagePostDetailPage />}
                    ></Route>
                    <Route path="/alert" element={<AlertPage />}></Route>

                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/follow" element={<FollowPage />} />
                    <Route path="/alarm" element={<AlarmPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/mypage/option" element={<MypageOption />} />
                    <Route
                        path="/mypage/edit/password"
                        element={<MypageEditPassword />}
                    />
                    <Route
                        path="/mypage/edit/Language"
                        element={<MypageEditLanguage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
