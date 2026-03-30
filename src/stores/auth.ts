import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string) {
    const response = await authApi.login(username, password)
    token.value = response.data.accessToken
    user.value = response.data
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('user', JSON.stringify(response.data))
    router.push('/users')
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return { token, user, isAuthenticated, login, logout }
})
