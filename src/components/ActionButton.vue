<script setup lang="ts">
defineProps<{
  loading?: boolean
  disabled?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button :disabled="loading || disabled" @click="$emit('click')">
    <span v-if="loading">Загрузка...</span>
    <slot v-else />
  </button>
</template>

<style scoped lang="scss">
button {
  background-color: #f58220;
  border-color: #f58220;
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 3px;
  width: 100%;
  cursor: pointer;
}
</style>
