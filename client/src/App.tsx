//fetch
//axios
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PostsPage from './pages/PostsPage.tsx';
import { v4 as uuidv4 } from 'uuid';

import { useCookies } from 'react-cookie';
import { cookieConfig } from './utils/cookieConfig.ts';
import Mypage from './pages/Mypage.tsx';

export const generateUniqueId = () => {
  return uuidv4();
};

function App() {
  // 객체로 설정된 초기 상태값을 배열로 변경
  // 서버에서 가져온 데이터는 React.ReactNode라는 속성이 되는 것 같음
  const [todoList, setTodoList] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    fetch('http://localhost:4000/api/todo')
      .then((response) => response.json())
      .then((data) => {
        setTodoList(data);
      });
  }, []);

  const [cookies, setCookies, removeCookies] = useCookies(['id']);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/posts" element={<PostsPage />}></Route>
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
