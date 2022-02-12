import { watchlistData } from '../../data/watchlist';

export default function Watchlist() {
  return (
    <div>
      <div className="watchlist__text">These are the things that are currently on my watchlist, both movies and shows.</div>
      <ul className="movie__list">
        {watchlistData.map((movie) => (
          <li key={movie} className="movie__list_item">
            <div className="movie__item">
              <span className="movie__header">
                <h4 className="movie__title">{movie.name}</h4>
              </span>
              <p className="watchlist__type">{movie.type}</p>
              <p className="why">{movie.description}</p>
              <p className="where">Available on {movie.platform}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
