import { ref, computed, watch, onMounted } from 'vue'
import { usersApi } from '../api'
import { useMessage } from 'naive-ui'
import { useFavoritesStore } from '../stores/favorites'

export function useUsers(onlyFavorites = false) {
  const users = ref<any[]>([])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const page = ref(1)
  const limit = ref(10)
  const message = useMessage()
  const favoritesStore = useFavoritesStore()

  const fetchUsers = async (isManual = false) => {
    isLoading.value = true
    try {
      const { data } = await usersApi.getAll(100, 0)
      users.value = data.users.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        birthday: user.birthDate,
      }))
      if (isManual) message.success('Список обновлен')
    } catch (error) {
      console.error('Ошибка при загрузке:', error)
    } finally {
      isLoading.value = false
    }
  }

  const filteredUsers = computed(() => {
    let list = users.value
    if (onlyFavorites) {
      list = list.filter((user) => favoritesStore.isFavorite(user.id))
    }

    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return list

    const cleanQuery = query.replace(/\D/g, '')
    return list.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(query)
      const cleanPhone = user.phone.replace(/\D/g, '')
      const phoneMatch = cleanQuery !== '' && cleanPhone.includes(cleanQuery)
      return nameMatch || phoneMatch
    })
  })

  const currentPageData = computed(() => {
    const start = (page.value - 1) * limit.value
    const end = start + limit.value
    return filteredUsers.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / limit.value))

  const showingText = computed(() => {
    const total = filteredUsers.value.length
    if (total === 0) return 'Записей не найдено'
    const from = (page.value - 1) * limit.value + 1
    const to = Math.min(page.value * limit.value, total)
    return `Показано с ${from} по ${to} из ${total} записей`
  })

  watch(searchQuery, () => {
    page.value = 1
  })

  onMounted(() => fetchUsers(false))

  return {
    users,
    isLoading,
    searchQuery,
    page,
    limit,
    currentPageData,
    filteredUsers,
    totalPages,
    showingText,
    fetchUsers,
  }
}
