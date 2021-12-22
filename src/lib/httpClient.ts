import axios from 'axios'

const defaultParams = {
  api_key: process.env.TMDB_API_KEY,
  language: 'en-US',
}

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: defaultParams,
})
