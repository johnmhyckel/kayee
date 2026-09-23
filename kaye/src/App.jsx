import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Kaye from './pages/monthsary/kaye';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Kaye />} />
        <Route path="/home" element={<Kaye />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;