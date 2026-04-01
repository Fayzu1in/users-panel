<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import ActionButton from '../components/ActionButton.vue'

const auth = useAuthStore()
const username = ref('')
const password = ref('')
const remember = ref(false)
const isLoading = ref(false)

async function handleLogin() {
  try {
    isLoading.value = true
    await auth.login(username.value, password.value)
  } catch (error) {
    console.error('Ошибка при входе в компоненте:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="logo">
        <img src="/logo.svg" alt="" style="height: 50px" />
        <h2>Добро пожаловать!</h2>
        <p>Войдите в свой аккаунт</p>
      </div>

      <div class="field">
        <label>Email</label>
        <input v-model="username" type="text" placeholder="" />
      </div>

      <div class="field">
        <label>Пароль</label>
        <input v-model="password" type="password" placeholder="" />
      </div>

      <div class="remember">
        <input v-model="remember" type="checkbox" id="remember" />
        <label for="remember">Запомнить меня</label>
      </div>

      <ActionButton :loading="isLoading" @click="handleLogin"> Войти </ActionButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .card {
    background-color: #fff;
    padding: 30px;
    border-radius: 5px;
    max-width: 400px;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      p {
        color: grey;
        padding-bottom: 15px;
      }
    }
    .field {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      label {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: bold;
      }
      input {
        margin-bottom: 15px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        height: 34px;
        padding: 6px 12px;
        transition:
          border-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
        width: 100%;
      }
    }

    .remember {
      display: flex;
      justify-content: flex-start;
      gap: 5px;
      padding-bottom: 15px;
    }
  }
}
</style>
