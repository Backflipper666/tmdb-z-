import { Rate } from 'antd';
import './Movie.css';
const Movie = ({ movie, films, filmsArray, setFilmsArray, onRate }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

  const empty =
    'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300';

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

  const convertDate = (date) => {
    // convert this "2022-10-19" to this "October 19, 2022"
    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };

    const [year, month, day] = date.split('-');

    const output = `${months[month]} ${day}, ${year}`;
    return output;
  };

  const shortenOverview = (overview, maximumLength = 120) => {
    const trimmedString = overview.substr(0, maximumLength);
    return (
      trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
      ) + ' ...'
    );
  };

  const onRateClick = (number) => {
    const setLocals = localStorage.getItem('cinemas');
    console.log(setLocals);
    console.log(movie.vote_average);
    setFilmsArray([...filmsArray, movie]);
    localStorage.setItem('cinemas', JSON.stringify([...filmsArray, movie]));

    onRateSetStars(number);

    onRate([...filmsArray, movie]);
  };

  const onRateSetStars = (num) => {
    localStorage.setItem(movie.id, num);
  };

  const colorBorder = (num) => {
    if (num < 3) {
      return <div className="movie__average movie__average-three">{num}</div>;
    } else if (num >= 3 && num < 5) {
      return <div className="movie__average movie__average-five">{num}</div>;
    } else if (num >= 5 && num < 7) {
      return <div className="movie__average movie__average-seven">{num}</div>;
    } else if (num >= 7) {
      return <div className="movie__average movie__average-high">{num}</div>;
    }
  };

  const currentValue = localStorage.getItem(movie.id);

  const isImageAvailable = movie.poster_path === null;

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
          onLoad={() => {
            if (movie.poster_path === null) {
              console.log('tratata');
            }
          }}
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
  );
};

export default Movie;
