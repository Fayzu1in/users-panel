<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  message: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="$emit('cancel')">
      <div class="modal">
        <h3 class="modal__title">{{ title }}</h3>
        <p class="modal__message">{{ message }}</p>
        <div class="modal__actions">
          <button class="btn btn--cancel" @click="$emit('cancel')">Нет</button>
          <button class="btn btn--confirm" @click="$emit('confirm')">Да</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 28px 32px;
  width: 400px;
  max-width: 90%;

  &__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
  }

  &__message {
    font-size: 14px;
    color: #666;
    margin-bottom: 24px;
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
}

.btn {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ccc;

  &--cancel {
    background: white;
    color: #333;
  }

  &--confirm {
    background: #f58220;
    color: white;
    border-color: #f58220;
  }
}
</style>
