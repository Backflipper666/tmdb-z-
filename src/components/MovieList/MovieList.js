import { useState } from 'react'

import Movie from '../Movie/Movie'
import './MovieList.scss'

function MovieList({ movies, films, onRate }) {
  const [filmsArray, setFilmsArray] = useState(
    localStorage.getItem('cinemas') ? JSON.parse(localStorage.getItem('cinemas')) : []
  )
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
            onRate={onRate}
          />
        </li>
      ))}
    </ul>
  )
}

export default MovieList
