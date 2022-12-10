import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import MovieGenre from './components/MovieGenres/MovieGenres'

const root = ReactDOM.createRoot(document.getElementById('root'))
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
}
root.render(
  // <React.StrictMode>
  <MovieGenre.Provider value={obj}>
    <App />
  </MovieGenre.Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
