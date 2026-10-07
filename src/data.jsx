// Everything personal lives here: change the name, the letters and the wishes in one place.

export const NAME = 'Akanshaa';

// One balloon per letter (the project ships 8 balloon images: b1.png ... b8.png)
export const BALLOONS = [
  { id: 'b1', letter: 'A', color: '#D6246E', sway: 'one' },
  { id: 'b2', letter: 'K', color: '#7048E8', sway: 'two' },
  { id: 'b3', letter: 'A', color: '#E8590C', sway: 'two' },
  { id: 'b4', letter: 'N', color: '#0CA678', sway: 'one' },
  { id: 'b5', letter: 'S', color: '#A61E4D', sway: 'one' },
  { id: 'b6', letter: 'H', color: '#1C7ED6', sway: 'two' },
  { id: 'b7', letter: 'A', color: '#D6246E', sway: 'one' },
  { id: 'b8', letter: 'A', color: '#7048E8', sway: 'two' },
];

export const BULBS = ['yellow', 'red', 'blue', 'green', 'pink', 'orange'];

// Shown one after another; the last one stays on screen
export const MESSAGES = [
  `Hey ${NAME}...`,
'Today is your special day...',
"So let's make it a beautiful one! 🎂",
'I wish you lots of happiness, success, and amazing memories.',
'Keep smiling and keep shining! ✨',
'And once again...', 
  <strong>Happy Birthday, {NAME}! 🎉🎂</strong>,
];

export const AFTER_CUT_MESSAGE = (
  <>
    Yayyy! The first slice is yours, {NAME} 🎂
    <br />
    chalo, kha lo 😂
  </>
);

// Buttons appear one at a time, in this order
export const BUTTONS = [
  { id: 'turn_on', label: 'Turn On The Lights' },
  { id: 'play', label: 'Play the Music Buddy' },
  { id: 'bannar_coming', label: "Let's Decorate" },
  { id: 'balloons_flying', label: 'Claim your balloons!' },
  { id: 'cake_fadein', label: 'Claim Your Cake! 🎂' },
  { id: 'light_candle', label: "Don't forget to Light the Candle" },
  { id: 'wish_message', label: `Happy Birthday ${NAME}` },
  { id: 'story', label: `A message for you, ${NAME}` },
  { id: 'cake_cut', label: "Let's Cut the Cake 🔪" },
];
