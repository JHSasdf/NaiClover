// App.tsx 또는 해당 라우터 설정 파일에서
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage.tsx';
import NewPage from './pages/NewPage.tsx';
import ChatRoomPage from './pages/NewPage.tsx'; // ChatRoomPage 추가

import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = () => {
  return uuidv4();
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new" element={<NewPage />} />

          {/* ChatRoomPage의 라우트 설정 */}
          <Route path="/chat/:roomId" element={<ChatRoomPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
