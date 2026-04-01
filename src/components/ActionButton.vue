<script setup lang="ts">
import { NSpin } from 'naive-ui'

defineProps<{
  loading?: boolean
  disabled?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button :disabled="loading || disabled" class="action-button" @click="$emit('click')">
    <div v-if="loading" class="loader-container">
      <n-spin :size="20" stroke="white" />
    </div>

    <slot v-else />
  </button>
</template>

<style scoped lang="scss">
.action-button {
  background-color: #f58220;
  border-color: #f58220;
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    background-color 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;

  &:hover:not(:disabled) {
    background-color: #e67616;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.n-spin-body) {
      --n-color: #ffffff !important;
    }
  }
}
</style>
