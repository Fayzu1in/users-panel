<script setup lang="ts">
import { h } from 'vue'
import { NDataTable, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'

const favoritesStore = useFavoritesStore()

function getAgeColor(birthday: string) {
  const age = new Date().getFullYear() - new Date(birthday).getFullYear()
  if (age < 30) return '#18a058'
  if (age <= 50) return '#f0a020'
  return '#d03050'
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
    render(row) {
      return h(
        'span',
        {
          style: `color: ${getAgeColor(row.birthday)}; font-weight: 500;`,
        },
        row.birthday,
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
          onClick: () => favoritesStore.toggle(row.id),
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
