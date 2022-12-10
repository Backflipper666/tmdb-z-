import { Rate } from 'antd'
import './Movie.scss'
import { useContext } from 'react'

import MovieGenre from '../MovieGenres/MovieGenres'

function Movie({ movie, filmsArray, setFilmsArray, onRate }) {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'

  const obj = useContext(MovieGenre)

  const identifyGenre = (genreId) => {
    if (!obj[genreId]) {
      return 'All'
    }
    return obj[genreId]
  }

  const shortenOverview = (overview, maximumLength = 120) => {
    const trimmedString = overview.substr(0, maximumLength)
    return `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))} ...`
  }

  const onRateSetStars = (num) => {
    localStorage.setItem(movie.id, num)
  }

  const onRateClick = (number) => {
    setFilmsArray([...filmsArray, movie])
    localStorage.setItem('cinemas', JSON.stringify([...filmsArray, movie]))

    onRateSetStars(number)

    onRate([...filmsArray, movie])
  }

  const colorBorder = (num) => {
    if (num < 3) {
      return <div className="movie__average movie__average-three">{num}</div>
    }
    if (num >= 3 && num < 5) {
      return <div className="movie__average movie__average-five">{num}</div>
    }
    if (num >= 5 && num < 7) {
      return <div className="movie__average movie__average-seven">{num}</div>
    }

    return <div className="movie__average movie__average-high">{num}</div>
  }

  const convertDate = (date) => {
    if (!date) return 'unknown'
    const object = new Date(date)
    const month = object.toLocaleString('en', { month: 'long' })
    return `${month} ${object.getDate()} ${object.getFullYear()}`
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
              {identifyGenre(genreNum)}
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
