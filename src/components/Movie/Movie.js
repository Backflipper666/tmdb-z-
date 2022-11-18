import './Movie.css';
const Movie = ({ movie }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

  const identifyGenre = (genreId) => {
    const obj = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie ',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    };
    if (!obj[genreId]) {
      return 'All';
    }
    return obj[genreId];
  };

  return (
    <div className="movie-wrapper">
      <li className="movie">
        <div className="movie__container">
          <div className="movie__image-wrapper">
            <img
              className="movie__image"
              src={`${IMAGE_PATH}/${movie.poster_path}`}
            />
          </div>
          <div className="movie__content-wrapper">
            <h3 className="movie__title">{movie.title}</h3>
            <p className="movie__date">{movie.release_date}</p>
            <p>
              {movie.genre_ids.map((genreNum) => (
                <span className="movie__genres">{identifyGenre(genreNum)}</span>
              ))}
            </p>
            <p className="movie__overview">{movie.overview}</p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Movie;
