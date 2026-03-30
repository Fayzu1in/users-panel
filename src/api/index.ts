import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

// перед каждым запросом добавляем токен автоматически
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

export const authApi = {
  login: (username: string, password: string) => api.post('/auth/login', { username, password }),
}

export const usersApi = {
  getAll: (limit: number, skip: number) => api.get(`/users?limit=${limit}&skip=${skip}`),
  getById: (id: number) => api.get(`/users/${id}`),
  getPosts: (id: number) => api.get(`/users/${id}/posts`),
}
