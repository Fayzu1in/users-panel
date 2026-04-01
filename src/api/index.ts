import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'], {
  messageProviderProps: { placement: 'top-right' },
})

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
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response?.status
    let errorMsg = error.response.data.message
    console.log('status:', errorMsg)

    if (status === 401) {
      errorMsg
    } else if (status === 404) {
      errorMsg
    }
    message.error(errorMsg)

    return Promise.reject(error)
  },
)

export default api
export { message }

export const authApi = {
  login: (username: string, password: string) => api.post('/auth/login', { username, password }),
}

export const usersApi = {
  getAll: (limit: number, skip: number) => api.get(`/users?limit=${limit}&skip=${skip}`),
  getById: (id: number) => api.get(`/users/${id}`),
  getPosts: (id: number) => api.get(`/users/${id}/posts`),
}
