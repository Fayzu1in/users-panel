<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { NIcon, NDrawer, NDrawerContent, NButton } from 'naive-ui'
import { RouterLink, useRouter } from 'vue-router'
import ConfirmModal from './ConfirmModal.vue'
import { PeopleOutline, MenuOutline, PersonCircleOutline } from '@vicons/ionicons5'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showLogoutModal = ref(false)
const showLogout = ref(false)
const isMobileMenuOpen = ref(false)
const auth = useAuthStore()
const router = useRouter()
const userId = computed(() => route.params.id)

const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.navbar__user-container')) {
    showLogout.value = false
  }
}
const handleLogout = () => {
  auth.logout()
  showLogoutModal.value = false
  isMobileMenuOpen.value = false
  router.push('/login')
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar__left">
        <span class="navbar__logo">Sarkor</span>
        <div class="navbar__nav desktop-only">
          <RouterLink to="/users">
            <n-icon size="20">
              <PeopleOutline />
            </n-icon>
            <span style="padding-left: 7px">Пользователи</span></RouterLink
          >
        </div>
      </div>
      <div class="navbar__right">
        <div class="navbar__user-container desktop-only" @click="showLogout = !showLogout">
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
        <div class="mobile-only burger-icon" @click="isMobileMenuOpen = true">
          <n-icon size="30"><MenuOutline /></n-icon>
        </div>
      </div>
    </div>
  </nav>
  <n-drawer v-model:show="isMobileMenuOpen" :width="280" placement="right">
    <n-drawer-content title="Меню" closable>
      <div class="mobile-menu">
        <div class="mobile-menu__user-info">
          <n-icon size="24"><PersonCircleOutline /></n-icon>
          <span class="user-name-text">{{ auth.user?.username || 'Гость' }}</span>
        </div>

        <div class="mobile-menu__links">
          <template v-if="!userId">
            <RouterLink to="/users" class="mobile-link" @click="isMobileMenuOpen = false">
              <n-icon size="20"><PeopleOutline /></n-icon>
              <span>Список пользователей</span>
            </RouterLink>
            <RouterLink to="/users/favorites" class="mobile-link" @click="isMobileMenuOpen = false">
              <n-icon size="20"><HeartOutline /></n-icon>
              <span>Избранное</span>
            </RouterLink>
          </template>

          <template v-else>
            <div class="mobile-menu__section-title">Текущий пользователь:</div>
            <RouterLink
              :to="`/users/${userId}`"
              class="mobile-link"
              @click="isMobileMenuOpen = false"
            >
              <n-icon size="20"><PersonOutline /></n-icon>
              <span>Информация</span>
            </RouterLink>
            <RouterLink to="/users" class="mobile-link back-link" @click="isMobileMenuOpen = false">
              <span>← Вернуться к списку</span>
            </RouterLink>
          </template>
        </div>

        <div class="mobile-menu__footer">
          <n-button type="error" ghost block @click="handleLogout"> Выйти </n-button>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
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

.desktop-only {
  @media (max-width: 768px) {
    display: none !important;
  }
}

.mobile-only {
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.burger-icon {
  color: #777;
  &:hover {
    color: black;
  }
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;

  &__user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    font-weight: bold;
    color: #333;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .mobile-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      text-decoration: none;
      color: #555;
      border-radius: 8px;
      font-size: 16px;

      &.router-link-active {
        background: #fdf2e9;
        color: #f58220;
        font-weight: 600;
      }
    }
  }

  &__footer {
    margin-top: auto;
    padding-bottom: 20px;

    .mobile-logout-btn {
      width: 100%;
    }
  }
}
</style>
