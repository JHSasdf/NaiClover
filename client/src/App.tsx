//fetch
//axios
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MainPage from './pages/MainPage.tsx';
import NewPage from './pages/NewPage.tsx';
import Header from './components/Header.tsx';
import { v4 as uuidv4 } from 'uuid';

import { useCookies } from 'react-cookie';
import { cookieConfig } from './utils/cookieConfig.ts';

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

  function login() {
    setCookies('id', true, cookieConfig);
  }

  function logout() {
    removeCookies('id', cookieConfig);
  }
  function check() {
    console.log(cookies.id);
  }

  return (
    <div className="App">
      <button onClick={check}>로그아웃</button>
      {todoList.map((elem: any) => {
        return (
          <ul key={elem.id}>
            <li>{elem.text} </li>
            <li>{elem.id}</li>
            <li>{JSON.stringify(elem.done)}</li>
          </ul>
        );
      })}
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route
            path="/"
            element={<MainPage todoList={todoList}></MainPage>}
          ></Route>
          <Route path="/new" element={<NewPage></NewPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React, { useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   useEffect(() => {
//     // useEffect를 활용하여 컴포넌트가 마운트될 때 데이터를 가져오도록 합니다.
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/todo');
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // 빈 배열을 전달하여 한 번만 실행되도록 합니다.

//   return (
//     <div className="App">
//       <h1>TodoList</h1>
//     </div>
//   );
// }

// export default App;
