import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUserName = ref('')

  function setCurrentUser(name: string) {
    currentUserName.value = name
  }

  function clearCurrentUser() {
    currentUserName.value = ''
  }

  return { currentUserName, setCurrentUser, clearCurrentUser }
})
