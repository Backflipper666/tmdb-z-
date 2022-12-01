import RatedMovie from '../RatedMovie/RatedMovie';
import './RatedMovieList.css';
const RatedMovieList = ({ movies, onRate }) => {
  // console.log('movies is: ', movies);
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <RatedMovie key={movie.id} movie={movie} onRate={onRate} />
        </li>
      ))}
    </ul>
  );
};

export default RatedMovieList;
