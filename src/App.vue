<template>
  <GameBoard />
</template>

<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue';
import { useGameStore } from '@/stores/game';
import { onBeforeUnmount, onMounted } from 'vue';

let timeout: any = undefined;

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      useGameStore().moveLeft();
      return;
    case 'ArrowRight':
      useGameStore().moveRight();
      return;
    case 'ArrowDown':
      useGameStore().moveDown();
      return;
    case 'ArrowUp':
      useGameStore().rotateClockwise();
      return;
    default:
      return;
  }
};

const handleBlockDownTimeout = () => {
  timeout = setTimeout(() => {
    useGameStore().moveDown();
    handleBlockDownTimeout();
  }, 1000);
};

onMounted(() => {
  useGameStore().setCurrentBlock([[1], [1], [1], [1]]);
  handleBlockDownTimeout();
  window.addEventListener('keydown', handleKeyDown);
});
onBeforeUnmount(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
