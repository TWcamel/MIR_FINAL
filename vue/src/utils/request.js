import axios from 'axios'

export async function get (url, options) {
  let response = await axios.get(url, options)
  return response.data
}

export async function post (url, options) {
  let response = await axios.post(url, options)
  return response.data
}


