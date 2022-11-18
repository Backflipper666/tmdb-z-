import './App.css';
import React from 'react';
import axios from 'axios';
import MovieList from './components/MovieList/MovieList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.type = this.state.searchKey ? 'search' : 'discover';
    this.API_URL = 'https://api.themoviedb.org/3';
    this.IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
  }
  state = {
    movies: [],
    searchKey: '',
  };

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <MovieList movies={this.state.movies} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const fetchMovies = async (searchKey = null) => {
      const {
        data: { results },
      } = await axios.get(`${this.API_URL}/${this.type}/movie`, {
        params: {
          api_key: '6bd0539fb9138af422e46ebff4f7ca19',
          query: searchKey,
        },
      });
      this.setState({
        movies: results,
      });
    };
    fetchMovies();
  }
}

export default App;
