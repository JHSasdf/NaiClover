import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostsPage from './pages/PostsPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import NewPostPage from './pages/NewPostPage.tsx';
import FollowPage from './pages/FollowPage.tsx';

import { v4 as uuidv4 } from 'uuid';

import Mypage from './pages/Mypage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MypageOption from './components/Mypage/MypageOption.tsx';

export const generateUniqueId = () => {
    return uuidv4();
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/newpost" element={<NewPostPage />} />
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/follow" element={<FollowPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/mypageoption" element={<MypageOption />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
