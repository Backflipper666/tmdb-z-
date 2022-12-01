import Movie from '../Movie/Movie';
import './MovieList.css';
const MovieList = ({ movies, onRate }) => {
  // console.log('movies is: ', movies);
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <Movie key={movie.id} movie={movie} onRate={onRate} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
