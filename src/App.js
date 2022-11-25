import './App.css';
import React from 'react';
import axios from 'axios';
import MovieList from './components/MovieList/MovieList';
import SearchBar from './components/SearchBar/SearchBar';
import { Spin, message, Alert, Pagination, Tabs } from 'antd';
import { Offline, Online } from 'react-detect-offline';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.type = this.state.searchKey ? 'search' : 'discover';
    this.API_URL = 'https://api.themoviedb.org/3';
    this.IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

    this.searchReturnMethod = this.searchReturnMethod.bind(this);
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

  createRequestToken() {
    const createGuest = async () => {
      const response = await axios(`${this.API_URL}/authentication/token/new`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
        },
      });
      console.log('createGuest: ', response);
      const {
        data: { request_token },
      } = response;
      console.log(request_token);
    };
    createGuest();
  }
  createGuestSession() {
    const createGuest = async () => {
      const response = await axios(
        `${this.API_URL}/authentication/guest_session/new`,
        {
          params: {
            api_key: '6bd0539fb9138af422e46ebff4f7ca19',
          },
        }
      );
      console.log('guest session: ', response);
      const {
        data: { guest_session_id },
      } = response;
      console.log('guest session id: ', guest_session_id);
    };
    createGuest();
  }

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
      // console.log(response);
    };
    searchReturn();

    axios.interceptors.response.use(
      function (response) {
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
    /*    const items = [
      { label: 'Search', key: 1, children: '' },
      { label: 'Rated', key: 2, children: 'content - 2' },
    ];
 */
    // return <Tabs items={items}/>

    return (
      <div className="App">
        <Online>
          {' '}
          <div className="wrapper">
            <div className="wrapper__inner">
              <Tabs centered>
                <Tabs.TabPane tab="Search" key="item-1">
                  <SearchBar onInputChange={this.onInputChange} />
                  {this.state.movies.length === 0 ? (
                    <Alert type="error" description="not found" />
                  ) : (
                    <>
                      <MovieList movies={this.state.movies} />
                      <Pagination
                        defaultCurrent={1}
                        current={page}
                        total={totalPages}
                        onChange={this.onPaginationClick}
                      />
                    </>
                  )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Rated" key="item-2">
                  {' '}
                  <SearchBar onInputChange={this.onInputChange} />
                </Tabs.TabPane>
              </Tabs>
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
    this.createGuestSession();
  }
  componentDidUpdate(_prevProps, prevState) {
    if (this.state.searchWord !== prevState.searchWord) {
      // console.log('did update');
      this.searchReturnMethod();
    }
    if (this.state.page !== prevState.page) {
      this.searchReturnMethod();
    }
  }
}

export default App;
