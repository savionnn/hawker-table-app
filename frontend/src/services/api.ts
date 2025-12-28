import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001/api', 
  withCredentials: true,                
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
