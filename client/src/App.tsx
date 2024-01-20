import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostsPage from './pages/PostsPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import NewPostPage from './pages/NewPostPage.tsx';
import FollowPage from './pages/FollowPage.tsx';

import { v4 as uuidv4 } from 'uuid';

import Mypage from './pages/Mypage.tsx';
import MypageProfile from './components/Mypage/MypageProfile.tsx';
import MypagePost from './components/Mypage/MypagePost.tsx';
import LoginPage from './pages/LoginPage.tsx';

export const generateUniqueId = () => {
    return uuidv4();
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/newpost"
                        element={<NewPostPage></NewPostPage>}
                    ></Route>
                    <Route path="/posts" element={<PostsPage />}></Route>
                    <Route path="/mypage" element={<Mypage />} />
                    <Route
                        path="/follow"
                        element={<FollowPage></FollowPage>}
                    ></Route>
                    <Route path="/mypageProfile" element={<MypageProfile />} />
                    <Route path="/mypagePost" element={<MypagePost />} />
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
