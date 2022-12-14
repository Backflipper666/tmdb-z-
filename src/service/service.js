import axios from 'axios'
import { message } from 'antd'

const API_URL = 'https://api.themoviedb.org/3'
const getMovies = () => {}
const searchReturn = async (searchWord = 'return', page = 1) => {
  //   const { searchWord } = this.state

  const response = await axios(`${API_URL}/search/movie`, {
    params: {
      api_key: '6bd0539fb9138af422e46ebff4f7ca19',
      query: searchWord,
      page,
    },
  })

  return response
}

const createGuestSession = async () => {
  const response = await axios(`${API_URL}/authentication/guest_session/new`, {
    params: {
      api_key: '6bd0539fb9138af422e46ebff4f7ca19',
    },
  })
  return response
}

const getMovieGenres = async () => {
  const response = await axios(`${API_URL}/genre/movie/list`, {
    params: {
      api_key: '6bd0539fb9138af422e46ebff4f7ca19',
    },
  })
  return response
}

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
    message.error('3unknown error occurred')
    this.setState({
      loading: false,
      error: true,
    })
    return Promise.reject(error)
  }
)

const getData = async (cb, param1, param2) => {
  const result = cb(param1, param2)
  const { data } = await result
  //   console.log(data)
  return data
}

export { searchReturn, getMovies, getData, createGuestSession, getMovieGenres }
