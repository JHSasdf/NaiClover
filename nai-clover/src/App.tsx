import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NewPage from './pages/NewPage';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/new" element={<NewPage></NewPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
