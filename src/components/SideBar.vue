<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { PeopleOutline, PersonOutline } from '@vicons/ionicons5'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const route = useRoute()
const isUsersSection = computed(() => route.path.startsWith('/users'))
const userId = computed(() => route.params.id)
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar__nav">
      <div v-if="!userId" class="sidebar__group">
        <div class="sidebar__header" :class="{ 'sidebar__header--active': isUsersSection }">
          <n-icon size="18"><PeopleOutline /></n-icon> <span>Пользователи</span>
        </div>

        <div class="sidebar__links">
          <RouterLink to="/users" exact-active-class="active" class="sidebar__link">
            Список
          </RouterLink>
          <RouterLink to="/users/favorites" class="sidebar__link"> Избранное </RouterLink>
        </div>
      </div>

      <div v-else class="sidebar__group">
        <div class="sidebar__header sidebar__header--active">
          <n-icon size="18"><PersonOutline /></n-icon>
          <span class="user-name-text"> User: {{ userStore.currentUserName || userId }} </span>
        </div>

        <div class="sidebar__links">
          <RouterLink :to="`/users/${userId}`" class="sidebar__link"> Информация </RouterLink>
        </div>

        <div class="sidebar__back">
          <RouterLink to="/users" class="back-link">← К списку</RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>
<style lang="scss" scoped>
.sidebar {
  width: 250px;
  height: calc(100vh - 55px);
  position: fixed;
  top: 55px;
  left: 0;
  background-color: #f5f5f5;
  border-right: 1px solid #dcdcdc;
  z-index: 999;
  overflow-y: auto;

  &__nav {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }

  &__group {
    margin-bottom: 5px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    font-size: 16px;
    color: #888;

    &--active {
      color: #333;
    }
  }
  &__links {
    display: flex;
    flex-direction: column;
  }
  .user-name-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    line-height: 1.2;
    max-height: 2.4em;
  }

  &__link {
    padding: 10px 20px;
    text-decoration: none;
    color: #4c669f;
    font-size: 14px;
    transition: all 0.2s;

    &:hover {
      background-color: #e8e8e8;
    }

    &.router-link-active {
      background-color: #f58220;
      color: white !important;
    }
  }
  &__back {
    margin-top: 20px;
    padding: 0 20px;
    .back-link {
      font-size: 13px;
      color: #888;
      text-decoration: none;
      &:hover {
        color: #f58220;
      }
    }
  }
}
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
