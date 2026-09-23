import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Photos from './pages/photos/Photos';
import Videos from './pages/videos/Videos';
import Kaye from './pages/monthsary/kaye';
import './App.css';

const App = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [shake, setShake] = useState(false);

  const checkCode = () => {
    if (passcode === '0530') {
      setUnlocked(true);
    } else {
      setShake(true);
      setPasscode('');
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') checkCode();
  };

  if (!unlocked) {
    return (
      <div className="lock-overlay">
        <div className={`lock-card ${shake ? 'shake' : ''}`}>
          <div className="lock-icon">🔒</div>
          <h2 className="lock-title">Enter PIN</h2>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={handleKey}
            className="lock-input"
            autoFocus
          />
          <button className="lock-btn" onClick={checkCode}>Unlock</button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/monthsary" element={<Kaye />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
