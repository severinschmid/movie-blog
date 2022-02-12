import { CONFIG } from '../../config';

export default function Header(props) {
  return (
    <div>
      <section className="header">
        <h1 className="headline sansserif">Why watch movies?</h1>
      </section>
      <div className="topnav__parent">
        <div className="topnav">
          {CONFIG.navigation.map((elem) => (
            <li
              key={elem}
              onClick={() => props.setCurrentPage(elem)}
              className={`nav__item ${props.currentPage === elem ? 'navbar__item__active' : ''}`}>
              {elem}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
