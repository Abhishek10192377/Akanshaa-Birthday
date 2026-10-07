import Fade from './Fade.jsx';
import person from '../assets/images/person.png';

function CakeBody({ flames }) {
  return (
    <>
      <div className="velas">
        {flames !== undefined &&
          [0, 1, 2, 3, 4].map((i) => <Fade key={i} className="fuego" show={flames} />)}
      </div>
      <div className="cobertura"></div>
      <div className="bizcocho"></div>
    </>
  );
}

// cut: 'whole' -> 'split' (knife is on its way, cake is divided) -> 'done' (slice has come away)
export default function Cake({ show, flames, cut, knife }) {
  const cutClass = cut === 'whole' ? '' : cut === 'split' ? ' cake-split' : ' cake-split cake-cut';

  return (
    <div className="row cake-cover">
      <div className="col-md-12 text-center">
        <Fade className={`cake${cutClass}`} show={show}>
          <div className="cake-piece cake-piece-main">
            <CakeBody flames={flames} />
          </div>
          <div className="cake-piece cake-piece-slice">
            <CakeBody />
          </div>
          <div className={`knife${knife ? ' knife-cutting' : ''}`}>
            <div className="knife-handle"></div>
            <div className="knife-blade"></div>
          </div>
          <img src={person} className="profile-img" alt="" />
        </Fade>
      </div>
    </div>
  );
}
