<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { RouterLink } from 'vue-router'
import ConfirmModal from './ConfirmModal.vue'
import { PeopleOutline } from '@vicons/ionicons5'

const showLogoutModal = ref(false)
const showLogout = ref(false)

const auth = useAuthStore()
const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.navbar__user-container')) {
    showLogout.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})

function handleLogout() {
  auth.logout()
  showLogoutModal.value = false
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar__left">
        <span class="navbar__logo">Sarkor</span>
        <div class="navbar__nav">
          <RouterLink to="/users">
            <n-icon size="20">
              <PeopleOutline />
            </n-icon>
            <span style="padding-left: 7px">Пользователи</span></RouterLink
          >
        </div>
      </div>
      <div class="navbar__right">
        <div class="navbar__user-container" @click="showLogout = !showLogout">
          <div class="navbar__user">
            {{ auth.user?.username || 'Гость' }}
            <span class="arrow" :class="{ 'arrow--active': showLogout }">▾</span>
          </div>

          <transition name="fade">
            <div v-if="showLogout" class="navbar__dropdown">
              <button @click="showLogoutModal = true" class="logout-btn">Выйти</button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
  <ConfirmModal
    :show="showLogoutModal"
    title="Выход из аккаунта"
    message="Вы уверены что хотите выйти?"
    @confirm="handleLogout"
    @cancel="showLogoutModal = false"
  />
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #dcdcdc;
  background: #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  &__left {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__logo {
    font-weight: bold;
    font-size: 18px;
    color: #777777;
    padding-right: 20px;
    cursor: default;
    padding-bottom: 4px;
  }

  &__nav {
    display: flex;
    height: 100%;

    a {
      display: flex;
      align-items: center;
      padding: 0 10px;
      text-decoration: none;
      color: #777777;
      font-size: 14px;
      height: 100%;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;

      &:hover {
        background: #ececec;
        color: black;
      }

      &.router-link-active {
        background: #e8e8e8;
        border-bottom: 3px solid #f58220;
      }
    }
  }

  &__right {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .navbar__user-container {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    color: #777777;
    cursor: pointer;

    &:hover {
      color: black;
      background: #ececec;
    }
  }

  .navbar__user {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    user-select: none;

    .arrow {
      font-size: 12px;
      transition: transform 0.2s;
      &--active {
        transform: rotate(180deg);
      }
    }
  }

  .navbar__dropdown {
    position: absolute;
    top: calc(100%);
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 120px;
    z-index: 1001;
    padding: 8px 0;

    .logout-btn {
      width: 100%;
      padding: 8px 12px;
      background: transparent;
      border: none;
      color: #ff4d4f;
      text-align: left;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: #fff1f0;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s,
      transform 0.2s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
