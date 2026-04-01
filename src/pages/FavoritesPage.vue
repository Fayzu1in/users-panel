<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import UsersTable from '../components/UsersTable.vue'
import { SearchOutline } from '@vicons/ionicons5'
import { NInput, NIcon, NPagination, useMessage } from 'naive-ui'
import { watch } from 'vue'
import { useFavoritesStore } from '../stores/favorites'
import { usersApi } from '../api'

const favoritesStore = useFavoritesStore()
const allUsers = ref([])
const isLoading = ref(false)
const searchQuery = ref('')
const message = useMessage()
const page = ref(1)
const limit = ref(10)

const fetchUsers = async (isManual = false) => {
  isLoading.value = true
  try {
    const { data } = await usersApi.getAll(100, 0)
    allUsers.value = data.users.map((user: any) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      birthday: user.birthDate,
    }))
    if (isManual) {
      message.success('Данные обновлены')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const favoriteUsers = computed(() =>
  allUsers.value.filter((user: any) => favoritesStore.isFavorite(user.id)),
)

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return favoriteUsers.value
  const cleanQuery = query.replace(/\D/g, '')
  return favoriteUsers.value.filter((user: any) => {
    const nameMatch = user.name.toLowerCase().includes(query)
    const cleanPhone = user.phone.replace(/\D/g, '')
    const phoneMatch = cleanQuery !== '' && cleanPhone.includes(cleanQuery)
    return nameMatch || phoneMatch
  })
})

const currentPageData = computed(() => {
  const start = (page.value - 1) * limit.value
  return filteredUsers.value.slice(start, start + limit.value)
})

const showingText = computed(() => {
  const from = (page.value - 1) * limit.value + 1
  const to = Math.min(page.value * limit.value, filteredUsers.value.length)
  const total = filteredUsers.value.length
  return `Показано с ${from} по ${to} из ${total} записей`
})

onMounted(() => fetchUsers(false))

watch(searchQuery, () => {
  page.value = 1
})
</script>
<template>
  <div class="users-page">
    <header class="page-header">
      <h1 class="page-header__title">Избранное</h1>
    </header>
    <div class="page-content">
      <div class="toolbar">
        <button class="reload-btn" @click="fetchUsers(true)" :disabled="isLoading">
          🔄 Перезагрузить
        </button>
        <n-input
          v-model:value="searchQuery"
          placeholder="Поиск по имени или телефону..."
          clearable
          class="search-input"
        >
          <template #prefix>
            <n-icon><SearchOutline /></n-icon>
          </template>
        </n-input>
        <div class="pagination-size">
          <span>Показывать по</span>
          <n-select
            v-model:value="limit"
            :options="[
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 },
            ]"
            style="width: 80px"
          />
          <span>записей</span>
        </div>
      </div>
      <div class="entries">
        <span class="showing-text">{{ showingText }}</span>
      </div>
      <UsersTable :data="currentPageData" :loading="isLoading" />
      <n-pagination
        class="pagination"
        v-model:page="page"
        :page-count="Math.ceil(filteredUsers.length / limit)"
      />
    </div>
  </div>
</template>
<style lang="scss">
.page-header {
  padding-bottom: 0px;
  margin-bottom: 25px;
  border-bottom: 1px solid #e0e0e0;

  &__title {
    font-size: 36px;
    font-weight: 500;
    color: #333;
    margin: 0;
  }
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}

.search-input {
  max-width: 400px;
}

.reload-btn {
  white-space: nowrap;
  padding: 6px 14px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-bottom: 30px;
}
.pagination-size {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}
.entries {
  padding-bottom: 15px;
  .showing-text {
    font-size: 14px;
    color: grey;
  }
}
</style>
