import React from 'react';
import { shows } from '../../data/showsList';

export default function Shows(props) {
  return (
    <div>
      <ul className="movie__list">
        {shows
          .filter((elem) => props.selectedPlatforms.includes(elem.platform))
          .map((show) => (
            <li key={show}>
              <div className="movie__item">
                <span className="movie__header">
                  <h4 className="movie__title">{show.name}</h4>
                </span>
                <p className="why">{show.description}</p>
                <p className="where">Watched on {show.platform}</p>
                <p className="link__show">
                  <a className="link__default" href={show.link}>
                    Trailer
                  </a>
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
