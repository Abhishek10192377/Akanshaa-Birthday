import { useEffect, useState } from 'react';
import Fade from './Fade.jsx';
import { BALLOONS } from '../data.jsx';

const BALLOON_HEIGHT = 183;
const SPACING = 100;

function randomSpots() {
  return BALLOONS.map(() => ({
    left: 1000 * Math.random(),
    top: window.innerHeight - BALLOON_HEIGHT - 500 * Math.random(),
  }));
}

// mode: 'ground' (hidden below the screen) -> 'flying' (drifting around) -> 'lined' (spelling the name)
export default function Balloons({ mode }) {
  const [spots, setSpots] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  // Pick a new random spot for every balloon every 10 seconds
  useEffect(() => {
    if (mode !== 'flying') return;
    setSpots(randomSpots());
    const id = setInterval(() => setSpots(randomSpots()), 10000);
    return () => clearInterval(id);
  }, [mode]);

  // Keep the lined-up name centred when the window is resized
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const lined = mode === 'lined';
  const firstLeft = width / 2 - (BALLOONS.length * SPACING) / 2;

  return BALLOONS.map((b, i) => {
    let spot = { left: `${4 + i * 12}%`, top: 'calc(100vh + 20px)' };
    if (lined) spot = { left: firstLeft + i * SPACING, top: 240 };
    else if (mode === 'flying' && spots) spot = spots[i];

    const moving = mode !== 'ground';
    const swayClass = moving ? ` balloons-rotate-behaviour-${b.sway}` : '';
    const speed = lined ? '0.5s' : '10s';

    return (
      <div
        key={b.id}
        id={b.id}
        className={`balloons text-center${swayClass}`}
        style={{
          ...spot,
          opacity: lined ? 0.9 : undefined,
          transition: `left ${speed} ease-in-out, top ${speed} ease-in-out`,
        }}
      >
        <Fade as="h2" show={lined} ms={3000} style={{ color: b.color }}>
          {b.letter}
        </Fade>
      </div>
    );
  });
}
