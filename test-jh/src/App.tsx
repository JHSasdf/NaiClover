import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mypage from './components/Mypage/Mypage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
