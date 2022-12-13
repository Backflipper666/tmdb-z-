import './App.scss'
import React from 'react'
import axios from 'axios'
import { Spin, message, Alert, Pagination, Tabs } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import MovieList from './components/MovieList/MovieList'
import SearchBar from './components/SearchBar/SearchBar'
import RatedMovieList from './components/RatedMovieList/RatedMovieList'
import MovieGenre from './components/MovieGenres/MovieGenres'
import { cleanArray, checkArray } from './utils'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.API_URL = 'https://api.themoviedb.org/3'

    this.state = {
      movies: [],
      searchWord: 'return',
      loading: true,
      films: JSON.parse(localStorage.getItem('films')) ? JSON.parse(localStorage.getItem('films')) : [],
      error: false,
      page: 1,
      guestSessionId: null,
      totalPages: 3,
      videos: localStorage.getItem('cinemas') ? JSON.parse(localStorage.getItem('cinemas')) : [],
      genres: [{ id: 28, name: 'action' }],
      idsAndStars: JSON.parse(localStorage.getItem('idsAndStars'))
        ? JSON.parse(localStorage.getItem('idsAndStars'))
        : [],
    }
    this.searchReturnMethod = this.searchReturnMethod.bind(this)
  }

  componentDidMount() {
    this.searchReturnMethod()
    this.createGuestSession()
    this.getMovieGenres()
  }

  componentDidUpdate(_prevProps, prevState) {
    const { searchWord, page } = this.state
    if (searchWord !== prevState.searchWord) {
      this.searchReturnMethod()
    }
    if (page !== prevState.page) {
      this.searchReturnMethod()
    }
  }

  onInputChange = (e) => {
    this.setState({
      searchWord: e.target.value,
    })
  }

  onRate = (arr, id, number) => {
    const { idsAndStars } = this.state
    const copyIdsAndStars = [...idsAndStars]
    const cleanArr = cleanArray(arr)

    this.setState(() => ({
      videos: cleanArr,
    }))

    const newArray = checkArray(copyIdsAndStars, id, number)

    this.setState(() => ({
      idsAndStars: newArray,
    }))
    localStorage.setItem('idsAndStars', JSON.stringify(newArray))
  }

  onPaginationClick = (e) => {
    this.setState({
      page: e,
    })
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getMovieGenres() {
    const getGenres = async () => {
      const response = await axios(`${this.API_URL}/genre/movie/list`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
        },
      })
      // console.log(response)
      const {
        data: { genres },
      } = response
      this.setState((state) => ({
        genres: state.genres.length > 1 ? state.genres : genres,
      }))
    }
    getGenres()

    axios.interceptors.response.use(
      (response) => {
        if (response.data) {
          // return success
          if (response.status === 200 || response.status === 201) {
            return response
          }
          // reject errors & warnings
          return Promise.reject(response)
        }

        return Promise.reject(response)
      },
      (error) => {
        message.error('unknown error occurred')
        this.setState({
          loading: false,
          error: true,
        })
        return Promise.reject(error)
      }
    )
  }

  searchReturnMethod() {
    const searchReturn = async () => {
      const { searchWord } = this.state

      const response = await axios(`${this.API_URL}/search/movie`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
          query: searchWord.trim().length ? `${searchWord}` : 'return',
          // eslint-disable-next-line react/destructuring-assignment
          page: this.state.page,
        },
      })
      const {
        data: { results, page, total_pages: totalPages },
      } = response
      this.setState({
        movies: results,
        loading: false,
        page,
        totalPages,
      })
    }
    searchReturn()

    axios.interceptors.response.use(
      (response) => {
        if (response.data) {
          // return success
          if (response.status === 200 || response.status === 201) {
            return response
          }
          // reject errors & warnings
          return Promise.reject(response)
        }

        return Promise.reject(response)
      },
      (error) => {
        message.error('unknown error occurred')
        this.setState({
          loading: false,
          error: true,
        })
        return Promise.reject(error)
      }
    )
  }

  createGuestSession() {
    const createGuest = async () => {
      const response = await axios(`${this.API_URL}/authentication/guest_session/new`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
        },
      })
      const {
        data: { guest_session_id: guestSession },
      } = response
      this.setState(() => ({
        guestSessionId: guestSession,
      }))
    }
    createGuest()
  }

  render() {
    const { loading, error, page, totalPages, movies, films, videos, guestSessionId, genres, idsAndStars } = this.state
    const isPaginationNeeded = totalPages > 10

    if (error) {
      return <Alert type="error" description="unknown error occurred, try again later" />
    }
    if (loading) {
      return (
        <div className="spin-large">
          <Spin size="large" />
        </div>
      )
    }

    const items = [
      {
        label: 'Search',
        key: 1,
        children: (
          <>
            <SearchBar onInputChange={this.onInputChange} />
            {movies.length === 0 ? (
              <Alert type="error" description="not found" />
            ) : (
              <>
                <MovieGenre.Provider value={genres}>
                  <MovieList
                    movies={movies}
                    films={films}
                    onRate={this.onRate}
                    guestSessionId={guestSessionId}
                    idsAndStars={idsAndStars}
                  />
                </MovieGenre.Provider>
                {isPaginationNeeded ? (
                  <Pagination defaultCurrent={1} current={page} total={totalPages} onChange={this.onPaginationClick} />
                ) : null}
              </>
            )}
          </>
        ),
      },
      {
        label: 'Rated',
        key: 2,
        children: (
          <>
            {' '}
            <SearchBar onInputChange={this.onInputChange} />
            <MovieGenre.Provider value={genres}>
              <RatedMovieList movies={videos} onRate={this.onRate} />
            </MovieGenre.Provider>
          </>
        ),
      },
    ]

    return (
      <div className="App">
        <Online>
          <div className="wrapper">
            <div className="wrapper__inner">
              <Tabs items={items} centered />
            </div>
          </div>
        </Online>
        <Offline>
          <Alert type="error" description="No internet connection" />
        </Offline>
      </div>
    )
  }
}

export default App
