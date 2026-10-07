const COLORS = ['#d6246e', '#ff6b6b', '#f6c453', '#7048e8', '#0ca678', '#1c7ed6'];

export function makeConfetti(count = 90) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 100 * Math.random() + 'vw',
    backgroundColor: COLORS[i % COLORS.length],
    animationDuration: 2.5 + 2.5 * Math.random() + 's',
    animationDelay: 1.2 * Math.random() + 's',
  }));
}

export default function Confetti({ pieces }) {
  return pieces.map(({ id, ...style }) => <span key={id} className="confetti" style={style}></span>);
}
