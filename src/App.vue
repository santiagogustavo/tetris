<template>
  <GameBoard />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, computed, watch } from 'vue';
import GameBoard from '@/components/GameBoard.vue';
import { useGameStore } from '@/stores/game';
import { playMoveSound, playRotateSound, playLandSound } from '@/utils/sfx';
import { getRandomBlock } from './data/tetrominos';
import {
  checkLeftCollision,
  checkRightCollision,
  checkBottomCollision,
  checkRotationClockwiseCollision,
} from './utils/block';

let timeout: any = undefined;

const board = computed(() => useGameStore().board);
const shadowBoard = computed(() => useGameStore().shadowBoard);
const currentBlock = computed(() => useGameStore().currentBlock);
const positionX = computed(() => useGameStore().positionX);
const positionY = computed(() => useGameStore().positionY);
const isGameOver = computed(() => useGameStore().gameOver);
const currentSpeed = computed(() => useGameStore().currentSpeed);

const moveLeft = () => {
  if (!checkLeftCollision(board.value, currentBlock.value, positionX.value, positionY.value)) {
    playMoveSound();
    useGameStore().moveLeft();
  }
};

const moveRight = () => {
  if (!checkRightCollision(board.value, currentBlock.value, positionX.value, positionY.value)) {
    playMoveSound();
    useGameStore().moveRight();
  }
};

const moveDown = (withSound = true) => {
  if (!checkBottomCollision(board.value, currentBlock.value, positionX.value, positionY.value)) {
    if (withSound) {
      playMoveSound();
    }
    useGameStore().moveDown();
  } else {
    playLandSound();

    if (positionY.value != 0) {
      useGameStore().copyShadowToBoard(shadowBoard.value);
      useGameStore().setCurrentBlock(getRandomBlock());
    } else {
      console.log('game over');
      useGameStore().setGameOver(true);
    }
  }
};

const rotate = () => {
  if (
    !checkRotationClockwiseCollision(
      board.value,
      currentBlock.value,
      positionX.value,
      positionY.value
    )
  ) {
    playRotateSound();
    useGameStore().rotateClockwise();
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      moveLeft();
      return;
    case 'ArrowRight':
      moveRight();
      return;
    case 'ArrowDown':
      moveDown();
      return;
    case 'ArrowUp':
      rotate();
      return;
    default:
      return;
  }
};

const handleBlockDownTimeout = () => {
  timeout = setTimeout(() => {
    moveDown(false);
    handleBlockDownTimeout();
  }, currentSpeed.value);
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
