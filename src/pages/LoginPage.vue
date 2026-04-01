<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import ActionButton from '../components/ActionButton.vue'
import { NInput, NCheckbox, NFormItem, NForm } from 'naive-ui'
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'

const auth = useAuthStore()
const username = ref('')
const password = ref('')
// const remember = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  try {
    errorMessage.value = ''
    isLoading.value = true
    await auth.login(username.value, password.value)
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Неверный логин или пароль'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="logo">
        <img src="/logo.svg" alt="Logo" style="height: 50px" />
        <h2>Добро пожаловать!</h2>
        <p>Войдите в свой аккаунт</p>
      </div>

      <n-form>
        <n-form-item
          label="Email (Username)"
          :validation-status="errorMessage ? 'error' : undefined"
        >
          <n-input
            v-model:value="username"
            placeholder="Введите ваш логин"
            size="large"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <n-icon><PersonOutline /></n-icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item
          label="Пароль"
          :validation-status="errorMessage ? 'error' : undefined"
          :feedback="errorMessage"
        >
          <n-input
            v-model:value="password"
            type="password"
            show-password-on="mousedown"
            placeholder="Введите пароль"
            size="large"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <n-icon><LockClosedOutline /></n-icon>
            </template>
          </n-input>
        </n-form-item>

        <!-- <div class="remember">
          <n-checkbox v-model:checked="remember"> Запомнить меня </n-checkbox>
        </div> -->

        <ActionButton
          :loading="isLoading"
          style="width: 100%; margin-top: 10px"
          @click="handleLogin"
        >
          Войти
        </ActionButton>
      </n-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;

  .card {
    background-color: #fff;
    padding: 40px;
    border-radius: 12px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;

      h2 {
        margin: 0;
        font-size: 24px;
        color: #333;
      }

      p {
        color: #888;
        margin: 0;
      }
    }

    .remember {
      margin-bottom: 20px;
    }
  }
}
</style>
