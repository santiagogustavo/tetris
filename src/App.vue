<template>
  <GameBoard />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, computed, watch } from 'vue';
import GameBoard from '@/components/GameBoard.vue';
import { useGameStore } from '@/stores/game';
import { playMoveSound, playRotateSound } from '@/utils/sfx';
import { getRandomBlock } from './data/tetrominos';

let timeout: any = undefined;

const isGameOver = computed(() => useGameStore().gameOver);

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      playMoveSound();
      useGameStore().moveLeft();
      return;
    case 'ArrowRight':
      playMoveSound();
      useGameStore().moveRight();
      return;
    case 'ArrowDown':
      playMoveSound();
      useGameStore().moveDown();
      return;
    case 'ArrowUp':
      playRotateSound();
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

const clearBlockDownTimeout = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
};

onMounted(() => {
  useGameStore().setCurrentBlock(getRandomBlock());
  handleBlockDownTimeout();
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  clearBlockDownTimeout();
  window.removeEventListener('keydown', handleKeyDown);
});

watch(
  () => isGameOver.value,
  next => {
    if (next) {
      clearBlockDownTimeout();
      window.removeEventListener('keydown', handleKeyDown);
    } else {
      handleBlockDownTimeout();
      window.addEventListener('keydown', handleKeyDown);
    }
  }
);
</script>
