import { Rate } from 'antd'
import './Movie.scss'
import { useContext } from 'react'

import MovieGenre from '../MovieGenres/MovieGenres'
import { colorBorder, getGenre, convertDate, shortenOverview, onRateSetStars } from '../../utils'

function Movie({ movie, filmsArray, setFilmsArray, onRate }) {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'

  const arrayOfObjects = useContext(MovieGenre)

  const onRateClick = (number) => {
    setFilmsArray([...filmsArray, movie])
    localStorage.setItem('cinemas', JSON.stringify([...filmsArray, movie]))

    onRateSetStars(number, movie)

    onRate([...filmsArray, movie], movie.id, number)
  }

  const currentValue = localStorage.getItem(movie.id)

  const isImageAvailable = movie.poster_path === null

  return (
    <div className="movie__container">
      <div className="movie__image-wrapper">
        <img
          className="movie__image"
          src={
            !isImageAvailable
              ? `${IMAGE_PATH}/${movie.poster_path}`
              : 'https://library.ucf.edu/wp-content/uploads/sites/5/2015/08/photo-not-available-300x300.jpg'
          }
          alt="movie poster"
        />
      </div>
      <div className="movie__content-wrapper">
        <h3 className="movie__title">{movie.title}</h3>
        <p className="movie__date">{convertDate(movie.release_date)}</p>

        <p>
          {movie.genre_ids.slice(0, 2).map((genreNum) => (
            <span key={Math.random()} className="movie__genres">
              {getGenre(genreNum, arrayOfObjects)}
            </span>
          ))}
        </p>
        <p className="movie__overview">{shortenOverview(movie.overview)}</p>

        <Rate
          allowHalf
          defaultValue={0}
          value={currentValue ? Number(currentValue) : 0}
          count={10}
          className="movie__rate"
          onChange={onRateClick}
        />
        <div>{colorBorder(movie.vote_average)}</div>
      </div>
    </div>
  )
}

export default Movie
