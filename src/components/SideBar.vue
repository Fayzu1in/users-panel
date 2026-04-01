<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import {
  PeopleOutline,
  StatsChartOutline,
  HardwareChipOutline,
  CardOutline,
  TicketOutline,
  ChatbubbleOutline,
} from '@vicons/ionicons5'

const route = useRoute()

const isUsersSection = computed(() => route.path.startsWith('/users'))
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar__nav">
      <div class="sidebar__group">
        <div class="sidebar__header" :class="{ 'sidebar__header--active': isUsersSection }">
          <n-icon size="20"><PeopleOutline /></n-icon> <span>Пользователи</span>
        </div>

        <div class="sidebar__links">
          <RouterLink to="/users" class="sidebar__link"> Список </RouterLink>
          <RouterLink to="/users/favorites" class="sidebar__link"> Избранное </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>
<style lang="scss" scoped>
.sidebar {
  width: 210px;
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
    color: #333;
    cursor: default;

    i {
      font-size: 18px;
      width: 20px;
      text-align: center;
    }

    &--active {
      color: #000;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
  }

  &__link {
    padding: 8px 20px;
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
      font-weight: 500;
    }
  }
}
</style>
