import { useState } from 'react';
import './kaye.css';

const Kaye = () => {
  const [currentSection, setCurrentSection] = useState('main-menu');

  const showSection = (section) => {
    setCurrentSection(section);
  };

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
