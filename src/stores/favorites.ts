import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<number[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))

  function toggle(id: number) {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter((f) => f !== id)
    } else {
      favorites.value.push(id)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function isFavorite(id: number) {
    return favorites.value.includes(id)
  }

  return { favorites, toggle, isFavorite }
})
