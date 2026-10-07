import Fade from './Fade.jsx';
import photo5 from '../assets/images/photo5.jpg';
import photo6 from '../assets/images/photo6.avif';
import photo7 from '../assets/images/photo7.jpg';
import photo8 from '../assets/images/photo8.jpg';
import canZoom from '../assets/images/can-zoom.png';

const PHOTOS = [
  { src: photo5, spot: 'album-left-1' },
  { src: photo7, spot: 'album-left-2' },
  { src: photo6, spot: 'album-right-1' },
  { src: photo8, spot: 'album-right-2' },
];

export default function Album({ show, onZoom }) {
  return (
    <>
      {PHOTOS.map((p) => (
        <Fade
          key={p.spot}
          as="img"
          show={show}
          src={p.src}
          alt=""
          className={`album-photo ${p.spot}`}
          keepTransition="transform 0.3s ease, box-shadow 0.3s ease"
          onClick={() => onZoom(p.src)}
        />
      ))}

      {/* Hint image */}
      <Fade as="img" show={show} src={canZoom} alt="" className="can-zoom" />
    </>
  );
}

export function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    // Close only when the dark background is clicked, not the photo
    <div className="lightbox" id="lightbox" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <img src={src} alt="zoomed photo" />
    </div>
  );
}
