import React from 'react';
import { movies } from '../../data/movieList';

export default function Movies(props) {
  return (
    <div>
      <ul className="movie__list">
        {movies
          .filter((elem) => props.selectedPlatforms.includes(elem.platform))
          .map((movie) => (
            <li key={movie}>
              <div className="movie__item">
                <span className="movie__header">
                  <h4 className="movie__title">{movie.name}</h4>
                </span>
                <p className="why">{movie.description}</p>
                <p className="where">Watched on {movie.platform}</p>
                <p className="link__show">
                  <a className="link__default" href={movie.link}>
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
