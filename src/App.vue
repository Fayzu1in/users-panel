<script setup lang="ts">
import { useRoute } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import SideBar from './components/SideBar.vue'

const route = useRoute()
</script>

<template>
  <TheNavbar v-if="route.path !== '/login'" />

  <SideBar v-if="route.path !== '/login'" />

  <main :class="['main-content', { 'main-content--full': route.path === '/login' }]">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.main-content {
  padding-top: 80px;
  margin-left: 210px;
  min-height: 100vh;
  background-color: #fafafa;
  padding-right: 30px;
  padding-left: 15px;
}

.main-content--full {
  margin-left: 0;
  padding-top: 0;
  padding: 0;
}
</style>
