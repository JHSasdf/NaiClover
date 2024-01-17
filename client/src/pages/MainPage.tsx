import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { cookieConfig } from '../utils/cookieConfig';

function MainPage(todoList: { todoList: React.ReactNode[] }) {
  const [id, setId] = useState<string>('');

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
  console.log(todoList);
  return (
    <>
      <ul>{}</ul>
      <h1>main page!sf</h1>
      <button onClick={login}>로그인</button>
      <button onClick={logout}>로그아웃</button>
      <button onClick={check}>로그아웃</button>
    </>
  );
}

export default MainPage;
