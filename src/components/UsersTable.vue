<script setup lang="ts">
import { h, ref } from 'vue'
import { NDataTable, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'
import ConfirmModal from '../components/ConfirmModal.vue'

const favoritesStore = useFavoritesStore()
const showFavsModal = ref(false)
const selectedUser = ref<User | null>(null)

function getAgeColor(birthday: string) {
  const age = new Date().getFullYear() - new Date(birthday).getFullYear()
  if (age < 30) return '#18a058'
  if (age <= 50) return '#f0a020'
  return '#d03050'
}

const handleFavClick = (user: User) => {
  if (favoritesStore.isFavorite(user.id)) {
    selectedUser.value = user
    showFavsModal.value = true
  } else {
    favoritesStore.toggle(user.id)
  }
}
const confirmRemoveFromFavs = () => {
  if (selectedUser.value) {
    favoritesStore.toggle(selectedUser.value.id)
    showFavsModal.value = false
    selectedUser.value = null
  }
}

interface User {
  id: number
  name: string
  phone: string
  birthday: string
}

const columns: DataTableColumns<User> = [
  {
    title: '#',
    key: 'id',
    width: 80,
    sorter: (rowA, rowB) => rowA.id - rowB.id,
  },
  {
    title: 'Имя',
    key: 'name',
    sorter: 'default',
    render(row) {
      return h(
        RouterLink,
        {
          to: `/users/${row.id}`,
          style: 'color: #4c669f; text-decoration: none; font-weight: 500;',
        },
        { default: () => row.name },
      )
    },
  },
  {
    title: 'Телефон',
    key: 'phone',
    sorter: 'default',
  },
  {
    title: 'Дата рождения',
    key: 'birthday',
    sorter: 'default',
    render(row: any) {
      const mainColor = getAgeColor(row.birthday)

      return h(
        NTag,
        {
          color: {
            color: `${mainColor}20`,
            textColor: mainColor,
            borderColor: 'transparent',
          },
          bordered: false,
          round: false,
          size: 'small',
          style: {
            fontWeight: '600',
            borderRadius: '4px',
          },
        },
        { default: () => row.birthday },
      )
    },
  },
  {
    title: '',
    key: 'favorite',
    width: 60,
    render(row) {
      const isFav = favoritesStore.isFavorite(row.id)
      return h(
        'span',
        {
          style: `cursor: pointer; font-size: 20px; color: ${isFav ? '#f0a020' : '#ccc'}`,
          onClick: () => handleFavClick(row),
        },
        '★',
      )
    },
  },
]

defineProps<{
  data: User[]
  loading?: boolean
}>()
</script>

<template>
  <div class="users-table-wrapper">
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :bordered="false"
      :single-line="false"
    />
  </div>
  <ConfirmModal
    :show="showFavsModal"
    title="Удаление из избранного"
    :message="`Вы уверены, что хотите убрать пользователя ${selectedUser?.name} из списка избранного?`"
    @confirm="confirmRemoveFromFavs"
    @cancel="showFavsModal = false"
  />
</template>

<style scoped>
.users-table-wrapper {
  background: white;
  border-radius: 4px;
}

:deep(.n-data-table-th) {
  font-weight: bold;
  background-color: #f9f9f9;
}

:deep(.n-spin-body .n-spin-ring) {
  stroke: #f58220 !important;
}
</style>
