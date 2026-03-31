import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useFavoritesStore = defineStore('favorites', () => {
  const authStore = useAuthStore()

  function getKey() {
    return `favorites_${authStore.user?.id}`
  }

  const favorites = ref<number[]>(JSON.parse(localStorage.getItem(getKey()) || '[]'))

  function toggle(id: number) {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter((f) => f !== id)
    } else {
      favorites.value.push(id)
    }
    localStorage.setItem(getKey(), JSON.stringify(favorites.value))
  }

  function isFavorite(id: number) {
    return favorites.value.includes(id)
  }

  return { favorites, toggle, isFavorite }
})
