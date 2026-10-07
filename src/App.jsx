import { useEffect, useRef, useState } from 'react';
import Fade from './components/Fade.jsx';
import Balloons from './components/Balloons.jsx';
import Cake from './components/Cake.jsx';
import Album, { Lightbox } from './components/Album.jsx';
import Confetti, { makeConfetti } from './components/Confetti.jsx';
import { useTimers } from './hooks/useTimers.js';
import { AFTER_CUT_MESSAGE, BULBS, BUTTONS, MESSAGES } from './data.jsx';
import song from './assets/audio/hbd.mp3';
import banner from './assets/images/banner.png';
import balloonBorder from './assets/images/Balloon-Border.png';

const FADE = 600; // same as jQuery's 'slow'

export default function App() {
  const later = useTimers();
  const audio = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [button, setButton] = useState('turn_on'); // id of the one button on screen, or null
  const [lights, setLights] = useState('off'); // 'off' -> 'on' -> 'party' (blinking with the music)
  const [bannerIn, setBannerIn] = useState(false);
  const [albumShown, setAlbumShown] = useState(false);
  const [balloons, setBalloons] = useState('ground'); // 'ground' -> 'flying' -> 'lined'
  const [cakeShown, setCakeShown] = useState(false);
  const [flames, setFlames] = useState(false);
  const [messageShown, setMessageShown] = useState(false);
  const [activeMessage, setActiveMessage] = useState(-1);
  const [cut, setCut] = useState('whole'); // 'whole' -> 'split' -> 'done'
  const [knife, setKnife] = useState(false);
  const [afterCut, setAfterCut] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [zoomed, setZoomed] = useState(null);

  // Lift the loading screen as soon as the app is on the page
  useEffect(() => setLoaded(true), []);

  // The night sky / daylight background is styled on <body>
  useEffect(() => {
    document.body.classList.toggle('peach', lights !== 'off');
    document.body.classList.toggle('peach-after', lights === 'party');
  }, [lights]);

  // Fade the current button out, wait, then bring in the next one
  function nextButton(id, delay) {
    setButton(null);
    later(() => setButton(id), FADE + delay);
  }

  function showMessages(i) {
    setActiveMessage(i);
    if (i < MESSAGES.length - 1) {
      later(() => {
        setActiveMessage(-1);
        later(() => showMessages(i + 1), FADE);
      }, FADE + 1500);
    } else {
      // Last message stays + cake comes back
      later(() => {
        setCakeShown(true);
        setButton('cake_cut');
      }, FADE);
    }
  }

  const actions = {
    turn_on() {
      setLights('on');
      nextButton('play', 5000);
    },
    play() {
      audio.current.play();
      setLights('party');
      nextButton('bannar_coming', 6000);
    },
    bannar_coming() {
      setBannerIn(true);
      setButton(null);
      later(() => {
        setButton('balloons_flying');
        setAlbumShown(true);
      }, FADE + 6000);
    },
    balloons_flying() {
      setBalloons('flying');
      nextButton('cake_fadein', 5000);
    },
    cake_fadein() {
      setCakeShown(true);
      nextButton('light_candle', 3000);
    },
    light_candle() {
      setFlames(true);
      nextButton('wish_message', 0);
    },
    wish_message() {
      setBalloons('lined');
      nextButton('story', 3000);
    },
    story() {
      setButton(null);
      setCakeShown(false);
      later(() => {
        setMessageShown(true);
        showMessages(0);
      }, 200);
    },
    cake_cut() {
      setButton(null);
      // The message sits on top of the cake, move it out of the way while cutting
      setMessageShown(false);
      // Blow out the candle first
      setFlames(false);
      setCut('split');
      later(() => setKnife(true), 700);
      // Knife has reached the plate: the slice comes away
      later(() => {
        setCut('done');
        setConfetti(makeConfetti());
      }, 2900);
      // Bring the wish back at the bottom of the screen
      later(() => {
        setAfterCut(true);
        setMessageShown(true);
      }, 4200);
      later(() => setConfetti([]), 2900 + 7000);
    },
  };

  const bulbClass = (color) => {
    if (lights === 'off') return 'bulb';
    const glow = `bulb bulb-glow-${color}`;
    return lights === 'party' ? `${glow} bulb-glow-${color}-after` : glow;
  };

  return (
    <>
      <Fade className="loading" show={!loaded} ms={200} />

      <Album show={albumShown} onZoom={setZoomed} />

      <audio className="song" ref={audio} src={song} loop />

      <Balloons mode={balloons} />

      <img
        src={balloonBorder}
        width="100%"
        className="balloon-border"
        alt=""
        style={{ top: balloons === 'ground' ? undefined : -500, transition: 'top 8s ease-in-out' }}
      />

      <div className="container">
        <div className="row">
          {BULBS.map((color) => (
            <div key={color} className="col-md-2 col-xs-2 bulb-holder">
              <div className={bulbClass(color)} id={`bulb_${color}`}></div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            <img src={banner} className={`bannar${bannerIn ? ' bannar-come' : ''}`} alt="Happy Birthday" />
          </div>
        </div>

        <Cake show={cakeShown} flames={flames} cut={cut} knife={knife} />

        <Fade className={`row message${afterCut ? ' message-after-cut' : ''}`} show={messageShown}>
          <div className="col-md-12">
            {afterCut ? (
              <p>{AFTER_CUT_MESSAGE}</p>
            ) : (
              MESSAGES.map((text, i) => (
                <Fade key={i} as="p" show={i === activeMessage}>
                  {text}
                </Fade>
              ))
            )}
          </div>
        </Fade>

        <div className="navbar navbar-fixed-bottom">
          <div className="row">
            <div className="col-md-6 text-center col-md-offset-3">
              {BUTTONS.map(({ id, label }) => (
                <Fade key={id} as="span" className="btn-wrap" show={button === id}>
                  <button className="btn btn-primary" id={id} onClick={() => button === id && actions[id]()}>
                    {label}
                  </button>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Lightbox src={zoomed} onClose={() => setZoomed(null)} />
      <Confetti pieces={confetti} />
    </>
  );
}
