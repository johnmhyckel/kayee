import { useState } from 'react';
import './kaye.css';

const Kaye = () => {
  const [passcode, setPasscode] = useState('');
  const [currentSection, setCurrentSection] = useState('lock-screen');

  const checkCode = () => {
    if (passcode === '0530') {
      setCurrentSection('main-menu');
    } else {
      alert('BABY MALI PO:<<, TRY MO PO UTRO BABY!');
    }
  };

  const showSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="monthsary-page">
      {currentSection === 'lock-screen' && (
        <div className="container">
          <input
            type="number"
            placeholder="Enter PIN"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button onClick={checkCode}>Unlock</button>
        </div>
      )}

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
            Hola halo baby, happy 4th monthsarry to us baby ko ILOVEYOUUUUUUUU BABYYY KO, thank you for staying with me for four months, sorry babyy so mga oras na nag aaway po kit kay dahil po sakon babyy sorry po baby ko sorry, we fight, we cry, we love, and together we have much more to do, I feel so comfortable with you sooooo muchhh babyy, thank you for being the best gf to me baby, unta dire ka mag bago sakon babyy:&lt;&lt; dire ka unta mag biling iba kairo ko sini HUHUHU🥺, your always be my fav baby kayeeeeee MWOAHHHHMWAOHHHHHH, ikaw always babyyyy ko, your the only person I want to share my life with, no one has ever made me as happy as you have, I just wanted to say that you make me very happy and I love you more than anyone else in the world, mahal na mahal kita palagi hope na mas tumagal patong relationship natin sana sa mga pag-aaway natin mas nag sstrong tayu sana sa mga times na mag aaway tayu wag nating pipiliin na tapusin mahal ayusin natin pls?, no matter how many times we fight or argue, I always want to work it out, no one could ever take your place mybabe, ikaw ang pahinga ku ang tahanan at mundo ko no one else can replace you, mahal na mahal kita palagi, thank you for giving me all these beautiful memories for the past few months and still, iloveyousomuchmybabe♡!
          </div>
          <button className="back-btn" onClick={() => showSection('main-menu')}>
            Back
          </button>
        </div>
      )}

      {currentSection === 'song-div' && (
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
