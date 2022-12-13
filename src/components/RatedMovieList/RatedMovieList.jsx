import RatedMovie from '../RatedMovie/RatedMovie'
import './RatedMovieList.css'
import { removeDuplicates } from '../../utils'

function RatedMovieList({ movies, onRate }) {
  const uniqueMovies = removeDuplicates(movies)
  return (
    <div className="wrapper-inner rated-movie-list">
      {movies.length === 0 ? (
        <div className="movie-empty">Empty</div>
      ) : (
        <ul className="movie-list">
          {uniqueMovies.map((movie) => (
            <li className="movie" key={movie.id}>
              <RatedMovie key={movie.id} movie={movie} onRate={onRate} movies={movies} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RatedMovieList
