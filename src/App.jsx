import './App.scss'
import React from 'react'
import { Spin, Alert, Pagination, Tabs } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import MovieList from './components/MovieList/MovieList'
import SearchBar from './components/SearchBar/SearchBar'
import RatedMovieList from './components/RatedMovieList/RatedMovieList'
import MovieGenre from './components/MovieGenres/MovieGenres'
import { searchReturn, getData, createGuestSession, getMovieGenres } from './service/service'
import { cleanArray, checkArray } from './utils'

class App extends React.Component {
  constructor(props) {
    super(props)

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

  getMovieGenres() {
    const result = getMovieGenres()
    result.then((res) => {
      const {
        data: { genres },
      } = res
      this.setState((state) => ({
        genres: state.genres.length > 1 ? state.genres : genres,
      }))
    })
  }

  searchReturnMethod() {
    const { searchWord, page } = this.state

    const data = getData(searchReturn, searchWord, page)
    data.then((res) => {
      const { results, page1, total_pages: totalPages } = res
      this.setState({
        movies: results,
        loading: false,
        page: page1,
        totalPages,
      })
    })
  }

  createGuestSession() {
    const result = createGuestSession()
    result.then((res) => {
      const {
        data: { guest_session_id: guestId },
      } = res
      this.setState(() => ({
        guestSessionId: guestId,
      }))
    })
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
