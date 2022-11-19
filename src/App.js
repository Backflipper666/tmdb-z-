import './App.css';
import React from 'react';
import axios from 'axios';
import MovieList from './components/MovieList/MovieList';
import { Spin } from 'antd';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.type = this.state.searchKey ? 'search' : 'discover';
    this.API_URL = 'https://api.themoviedb.org/3';
    this.IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
    this.searchMovies = this.searchMovies.bind(this);
  }
  state = {
    movies: [],
    searchKey: '',
    loading: true,
  };

  searchMovies(e) {
    e.preventDefault();
    const searchKeyLocal = this.state.searchKey;
    const fetchMovies = async (searchKey = null) => {
      const {
        data: { results },
      } = await axios.get(`${this.API_URL}/${this.type}/movie`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
          query: searchKeyLocal,
        },
      });
      this.setState({
        movies: results,
      });
    };

    fetchMovies(searchKeyLocal);
  }

  onInputChange = (e) => {
    this.setState({
      searchKey: e.target.value,
    });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="spin-large">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div className="App">
        <div className="wrapper">
          <div className="wrapper__inner">
            <form onSubmit={this.searchMovies}>
              <input type="text" onChange={this.onInputChange} />
              <button type="submit">submit</button>
            </form>
            {/* <Spinner /> */}
            <Spin />
            {this.state.searchKey}
            <MovieList movies={this.state.movies} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const searchReturn = async () => {
      const response = await axios(`${this.API_URL}/search/movie`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
          query: 'return',
        },
      });
      const {
        data: { results },
      } = response;
      this.setState({
        movies: results,
        loading: false,
      });
    };
    searchReturn();
  }
}

export default App;
