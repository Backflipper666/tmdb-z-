import Movie from '../Movie/Movie';
import './MovieList.css';
const MovieList = ({ movies }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <Movie key={movie.id} movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
