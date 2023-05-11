<template>
  <div class="controls-buttons">
    <div class="controls-buttons__button" @click="handleClickButtonB" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['b']);

const handleClickButtonB = () => {
  emit('b');
};
</script>

<style lang="scss">
.controls-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &__button {
    height: 3rem;
    width: 3rem;
    background: #a5074b;
    border-radius: 50%;
    margin: 2rem;
  }
}
</style>
