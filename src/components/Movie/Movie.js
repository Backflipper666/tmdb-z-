const Movie = ({ movie }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      <li>
        {movie.title}
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <img src={`${IMAGE_PATH}/${movie.poster_path}`} />
      </li>
    </div>
  );
};

export default Movie;
