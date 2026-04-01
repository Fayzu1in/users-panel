<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NMessageProvider, NConfigProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import TheNavbar from './components/TheNavbar.vue'
import SideBar from './components/SideBar.vue'

const route = useRoute()
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#f0a020',
    primaryColorHover: '#f5b041',
    primaryColorPressed: '#d68910',
    primaryColorSuppl: '#f5b041',
  },
  Input: {
    borderHover: '1px solid #f0a020',
    borderFocus: '1px solid #f0a020',
    boxShadowFocus: '0 0 0 2px rgba(240, 160, 32, 0.2)',
  },
  InternalSelectMenu: {
    optionTextColorActive: '#f0a020',
  },
  Spin: {
    color: '#f0a020',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider placement="top-right" :max="3">
      <TheNavbar v-if="route.path !== '/login'" />

      <div class="layout-wrapper">
        <SideBar v-if="route.path !== '/login'" />

        <main :class="['main-content', { 'main-content--full': route.path === '/login' }]">
          <RouterView />
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">
.main-content {
  padding-top: 80px;
  margin-left: 250px;
  min-height: 100vh;
  background-color: #fafafa;
  padding-right: 30px;
  padding-left: 15px;
  padding-bottom: 50px;
}

.main-content--full {
  margin-left: 0;
  padding-top: 0;
  padding: 0;
}
</style>
