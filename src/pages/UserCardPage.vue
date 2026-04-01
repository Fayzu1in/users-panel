<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usersApi } from '../api'
import { useFavoritesStore } from '../stores/favorites'
import { NSpin } from 'naive-ui'
import ConfirmModal from '../components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const showFavsModal = ref(false)

const user = ref<any>(null)
const posts = ref<any[]>([])
const isLoading = ref(false)

const handleFavClick = (userId: number) => {
  if (favoritesStore.isFavorite(userId)) {
    showFavsModal.value = true
  } else {
    favoritesStore.toggle(userId)
  }
}

const confirmRemoveFromFavs = () => {
  favoritesStore.toggle(user.value.id)
  showFavsModal.value = false
}

const fetchUser = async () => {
  isLoading.value = true
  try {
    const { data } = await usersApi.getById(Number(route.params.id))
    user.value = data
    const postsData = await usersApi.getPosts(Number(route.params.id))
    posts.value = postsData.data.posts
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchUser)
</script>
<template>
  <n-spin :show="isLoading">
    <div class="users-page" v-if="user">
      <header class="page-header">
        <h1 class="page-header__title">Пользователь: {{ user.email }}</h1>
      </header>

      <div class="page-content">
        <div class="toolbar">
          <button class="reload-btn fav-btn" @click="handleFavClick(user.id)">
            {{ favoritesStore.isFavorite(user?.id) ? 'В избранном' : 'В избранное' }}
          </button>
          <button class="reload-btn back-btn" @click="router.back()">Назад</button>
        </div>

        <div class="info-section">Информация</div>

        <table class="info-table">
          <tbody>
            <tr>
              <td>Фото</td>
              <td><img :src="user.image" :alt="user.firstName" class="avatar" /></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{{ user.id }}</td>
            </tr>
            <tr>
              <td>ФИО</td>
              <td>{{ user.firstName }} {{ user.lastName }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td>{{ user.phone }}</td>
            </tr>
            <tr>
              <td>Возраст</td>
              <td>{{ user.age }}</td>
            </tr>
            <tr>
              <td>Дата рождения</td>
              <td>{{ user.birthDate }}</td>
            </tr>
            <tr>
              <td>Пол</td>
              <td>{{ user.gender }}</td>
            </tr>
            <tr>
              <td>Компания</td>
              <td>{{ user.company?.name }}</td>
            </tr>
            <tr>
              <td>Отдел</td>
              <td>{{ user.company?.department }}</td>
            </tr>
            <tr>
              <td>Должность</td>
              <td>{{ user.company?.title }}</td>
            </tr>
          </tbody>
        </table>

        <div class="info-section">Посты</div>
        <div class="posts">
          <div class="post" v-for="post in posts" :key="post.id">
            <strong>{{ post.title }}</strong>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </n-spin>
  <ConfirmModal
    :show="showFavsModal"
    title="Удаление из избранного"
    :message="`Вы уверены, что хотите убрать пользователя ${user?.email} из списка избранного?`"
    @confirm="confirmRemoveFromFavs"
    @cancel="showFavsModal = false"
  />
</template>
<style lang="scss" scoped>
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
  gap: 10px;
  margin-bottom: 10px;
}
.reload-btn {
  white-space: nowrap;
  padding: 6px 14px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;

  td {
    padding: 10px 14px;
    border: 1px solid #e0e0e0;
    font-size: 14px;

    &:first-child {
      font-weight: 600;
      width: 180px;
      background: #f9f9f9;
    }
  }
}

.avatar {
  width: 120px;
  border-radius: 4px;
}

.info-section {
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0 10px;
}

.fav-btn {
  background: #f58220;
  color: white;
  border-color: #f58220;
}

.back-btn {
  background: #4c669f;
  color: white;
  border-color: #4c669f;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .post {
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;

    p {
      margin-top: 6px;
      color: #666;
    }
  }
}
</style>
