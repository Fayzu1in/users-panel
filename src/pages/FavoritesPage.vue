<script setup lang="ts">
import UsersTable from '../components/UsersTable.vue'
import { SearchOutline } from '@vicons/ionicons5'
import { NInput, NIcon, NPagination } from 'naive-ui'

import { useUsers } from '../composables/useUsers'
const {
  isLoading,
  searchQuery,
  page,
  limit,
  currentPageData,
  totalPages,
  showingText,
  fetchUsers,
} = useUsers(true)
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
      <n-pagination class="pagination" v-model:page="page" :page-count="totalPages" />
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
