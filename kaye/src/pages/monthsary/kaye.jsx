import { useState, useEffect } from 'react';
import './kaye.css';

const UNLOCK_KEY = 'monthsary_unlocked';

// The 30th has "started" once the clock hits midnight (00:00:00) on the 30th
const checkUnlocked = () => {
  if (localStorage.getItem(UNLOCK_KEY) === 'true') return true;
  const now = new Date();
  const eligible = now.getDate() >= 30; // midnight of the 30th or later
  if (eligible) localStorage.setItem(UNLOCK_KEY, 'true');
  return eligible;
};

// Returns { days, hours, minutes, seconds } until next 30th at 00:00:00
const getTimeUntil = () => {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), 30, 0, 0, 0);
  if (now >= target) {
    // Already past the 30th this month — aim for next month's 30th
    target.setMonth(target.getMonth() + 1);
  }
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n) => String(n).padStart(2, '0');

const Kaye = () => {
  const [currentSection, setCurrentSection] = useState('main-menu');
  const [unlocked, setUnlocked] = useState(checkUnlocked);
  const [timeLeft, setTimeLeft] = useState(getTimeUntil);

  // Tick every second; auto-unlock the moment the 30th arrives
  useEffect(() => {
    if (unlocked) return;
    const interval = setInterval(() => {
      if (checkUnlocked()) {
        setUnlocked(true);
        clearInterval(interval);
      } else {
        setTimeLeft(getTimeUntil());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [unlocked]);

  const showSection = (section) => {
    setCurrentSection(section);
  };

  if (!unlocked) {
    const { days, hours, minutes, seconds } = timeLeft;
    return (
      <div className="monthsary-page">
        <div className="container lock-container">
          <div className="lock-icon">🔒</div>
          <h1>Our Special Day</h1>
          <p className="lock-subtitle">Our little love story unlocks every</p>
          <div className="lock-date">30th of the month</div>
          <p className="lock-subtitle" style={{ marginTop: '12px' }}>at midnight 🌙</p>
          <div className="lock-countdown-timer">
            <div className="countdown-unit">
              <span className="countdown-num">{pad(days)}</span>
              <span className="countdown-label">days</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{pad(hours)}</span>
              <span className="countdown-label">hrs</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{pad(minutes)}</span>
              <span className="countdown-label">min</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{pad(seconds)}</span>
              <span className="countdown-label">sec</span>
            </div>
          </div>
          <p className="lock-hint">Don’t miss our special day baby—come back and unlock it with me.🎀</p>
        </div>
      </div>
    );
  }

  return (
    <div className="monthsary-page">
      {currentSection === 'main-menu' && (
        <div className="container">
          <h1>
            Happy 4th Monthsarry!
            <br />
            BABYYY
          </h1>
          <button onClick={() => showSection('message-div')}>💌 Message</button>
          <button onClick={() => showSection('song-div')}>🎵 Song</button>
        </div>
      )}

      {currentSection === 'message-div' && (
        <div className="container">
          <div className="msg-text">
            Hola halo baby, happy 4th monthsarry to us baby ko ILOVEYOUUUUUUUU BABYYY KO, thank you for staying with me for four months, sorry babyy sa mga oras na nag aaway po kit kay dahil po sakon babyy sorry po baby ko sorry, and together we have much more to do, I feel so comfortable with you sooooo muchhh babyy, thank you for being the best gf to me baby, unta dire ka mag bago sakon babyy😔 dire ka unta mag biling iba kairo ko sini HUHUHU🥺, your always be my fav baby kayeeeeee MWOAHHHHMWAOHHHHHH, ikaw always ako babyyyy😙😙, your the only person I want to share my life with, no one has ever made me as happy as you have, I just wanted to say that you make me very happy and ILOVEYOUUUUUU SOSOSOSOSOSOSOOOOOO MUCHHHHHHHH BABYY more than anyone else in the world, mahal na mahal ko ikaw baby super duper mahal po babyy ko, sa mga pag-aaway naton mas nag sstrong kit po sana sa mga times na mag aaway po kit dire naton pipilion na tapuson po babyy ayusin naton always babyy plssssss mahal na mahal ko ikaw babyy mahal na mahalll po babyyy sobra po, no matter how many times we fight or argue, I always want to work it out, no one could ever take your place my babykayee, ikaw an akon always pahinga babyy an tahanan at mundo ko babyy ( 😗😗😗 ) no one else can replace you babyyy no one mwoahhhhhwahhhhhhhh, mahal na mahal ko ikaw baby always mahal po babyy waray oras na dire kapo mahal ILOVEYOUUUUUUUUU BABYYY KO ILOVEYOUUUUUUU VV MUCHHHHH BABYYYY ILOVEYOUUUUUUUU, thank you for giving me all these beautiful memories for the past few months and still, ILOVEYOUUUUUUUUUSOMUCHHHHHHHBABYYYYKO!!
          </div>
          <button className="back-btn" onClick={() => showSection('main-menu')}>
            Back
          </button>
        </div>
      )}

      {currentSection === 'song' && (
        <div className="container">
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/2RglFM4VW8E"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Love Song"
          />
          <br />
          <button className="back-btn" onClick={() => showSection('main-menu')}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Kaye;
