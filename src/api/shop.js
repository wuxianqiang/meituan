import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://easy-mock.com/mock/5bc3467382ddbf32bb766eed/api'
  // timeout: 8000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export function getRecommend () {
  return instance.get('/recommend')
}

export function getFood () {
  return instance.get('/goods')
}
