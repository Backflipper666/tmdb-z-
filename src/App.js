import './App.css';
import React from 'react';
import axios from 'axios';
import MovieList from './components/MovieList/MovieList';
import SearchBar from './components/SearchBar/SearchBar';
import { Spin, message, Alert, Pagination } from 'antd';
import { Offline, Online } from 'react-detect-offline';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.type = this.state.searchKey ? 'search' : 'discover';
    this.API_URL = 'https://api.themoviedb.org/3';
    this.IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
  }
  state = {
    movies: [],
    searchWord: 'return',
    loading: true,
    films: [],
    error: false,
    page: 1,
    totalPages: 3,
  };

  searchReturnMethod() {
    const searchReturn = async () => {
      const searchWord = this.state.searchWord;

      const response = await axios(`${this.API_URL}/search/movie`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
          query: searchWord.trim().length ? `${searchWord}` : 'return',
          page: this.state.page,
        },
      });
      const {
        data: { results, page, total_pages },
      } = response;
      this.setState({
        movies: results,
        loading: false,
        page: page,
        totalPages: total_pages,
      });
      console.log(response);
    };
    searchReturn();

    axios.interceptors.response.use(
      function (response) {
        console.log(response.status);
        if (response.data) {
          // return success
          if (response.status === 200 || response.status === 201) {
            return response;
          }
          // reject errors & warnings
          return Promise.reject(response);
        }

        return Promise.reject(response);
      },
      (error) => {
        message.error('unknown error occurred');
        this.setState({
          loading: false,
          error: true,
        });
        return Promise.reject(error);
      }
    );
  }

  onInputChange = (e) => {
    this.setState({
      searchKey: e.target.value,
      searchWord: e.target.value,
    });
  };

  onPaginationClick = (e) => {
    this.setState({
      page: e,
    });
  };

  render() {
    const { loading, error, page, totalPages } = this.state;
    if (error) {
      return (
        <Alert
          type="error"
          description="unknown error occurred, try again later"
        />
      );
    }
    if (loading) {
      return (
        <div className="spin-large">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div className="App">
        <Online>
          {' '}
          <div className="wrapper">
            <div className="wrapper__inner">
              <SearchBar onInputChange={this.onInputChange} />
              <MovieList movies={this.state.movies} />
              <Pagination
                defaultCurrent={1}
                current={page}
                total={totalPages}
                onChange={this.onPaginationClick}
              />
            </div>
          </div>
        </Online>
        <Offline>
          <Alert type="error" description="No internet connection" />
        </Offline>
      </div>
    );
  }

  componentDidMount() {
    this.searchReturnMethod();
  }
  componentDidUpdate(_prevProps, prevState) {
    if (this.state.searchWord !== prevState.searchWord) {
      console.log('did update');
      this.searchReturnMethod();
    }
    if (this.state.page !== prevState.page) {
      this.searchReturnMethod();
    }
  }
}

export default App;
