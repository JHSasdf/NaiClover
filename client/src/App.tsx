import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cookieConfig } from './utils/cookieConfig.ts';
import { useCookies } from 'react-cookie';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import PostsPage from './pages/PostsPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import NewPostPage from './pages/NewPostPage.tsx';
import FollowPage from './pages/FollowPage.tsx';

import MainPage from './pages/MainPage.tsx';
import NewPage from './pages/NewPage.tsx';
import ChatRoomPage from './pages/NewPage.tsx'; // ChatRoomPage 추가
import { v4 as uuidv4 } from 'uuid';

import Mypage from './pages/Mypage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MypageOption from './components/Mypage/MypageOption.tsx';
import MypageEditPassword from './components/Mypage/MypageEditPassword.tsx';

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
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/newpage" element={<NewPage />} />
                    <Route path="/posts" element={<PostsPage />}></Route>
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/follow" element={<FollowPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/mypage/option" element={<MypageOption />} />
                    <Route
                        path="/mypage/edit/password"
                        element={<MypageEditPassword />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
