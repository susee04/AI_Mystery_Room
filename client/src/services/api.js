import axios from 'axios'

const apiBaseUrl = import.meta.env.DEV ? 'http://localhost:5000' : import.meta.env.VITE_API_URL || 'http://localhost:5000'
const api = axios.create({ baseURL: apiBaseUrl, timeout: 90000, headers: { 'Content-Type': 'application/json' } })

export function errorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message
  if (error.code === 'ECONNABORTED') return 'The request took too long. Please try again.'
  if (!error.response) return 'Unable to reach the server. Check your connection and try again.'
  return 'Something went wrong. Please try again.'
}

export default api
