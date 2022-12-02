import { useState } from 'react';
import Movie from '../Movie/Movie';
import './MovieList.css';
const MovieList = ({ movies, films }) => {
  const [filmsArray, setFilmsArray] = useState([]);
  // console.log('movies is: ', movies);
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <Movie
            key={movie.id}
            movie={movie}
            films={films}
            filmsArray={filmsArray}
            setFilmsArray={setFilmsArray}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
