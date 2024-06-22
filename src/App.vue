<template>
  <div class="app">
    <GameOverScreen v-if="isGameOver" />
    <div class="app__game">
      <GameBoard />
      <div class="app__game__stats">
        <GameHeader />
        <GameNextBlock />
      </div>
    </div>
    <ControlsGameBoy
      @up="rotate"
      @down="moveDown"
      @left="moveLeft"
      @right="moveRight"
      @b="rotate"
      @a="moveDown"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, computed, watch } from 'vue';
import GameHeader from '@/components/GameHeader.vue';
import GameBoard from '@/components/GameBoard.vue';
import GameNextBlock from '@/components/GameNextBlock.vue';
import GameOverScreen from '@/components/GameOverScreen.vue';
import ControlsGameBoy from '@/components/Controls/GameBoy.vue';
import { useGameStore } from '@/stores/game';
import {
  playMoveSound,
  playRotateSound,
  playLandSound,
  playLineClearSound,
  playGameOverSound,
} from '@/utils/sfx';
import { getRandomBlock } from '@/data/tetrominos';
import {
  checkLeftCollision,
  checkRightCollision,
  checkBottomCollision,
  checkRotationClockwiseCollision,
} from '@/utils/block';
import { blowLines, detectLines } from '@/utils/matrix';

let timeout: any = undefined;

const board = computed(() => useGameStore().board);
const shadowBoard = computed(() => useGameStore().shadowBoard);
const currentBlock = computed(() => useGameStore().currentBlock);
const nextBlock = computed(() => useGameStore().nextBlock);
const positionX = computed(() => useGameStore().positionX);
const positionY = computed(() => useGameStore().positionY);
const isGameOver = computed(() => useGameStore().gameOver);
const score = computed(() => useGameStore().score);
const level = computed(() => useGameStore().level);
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
      const lines = detectLines(shadowBoard.value);

      if (lines.length) {
        useGameStore().addToScore(lines.length);
        useGameStore().copyShadowToBoard(blowLines(shadowBoard.value, lines));
        playLineClearSound();
      } else {
        useGameStore().copyShadowToBoard(shadowBoard.value);
      }
      useGameStore().setCurrentBlock(nextBlock.value);
      useGameStore().setNextBlock(getRandomBlock());
    } else {
      useGameStore().setGameOver(true);
      playGameOverSound();
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

const startGame = () => {
  useGameStore().setCurrentBlock(getRandomBlock());
  useGameStore().setNextBlock(getRandomBlock());
  handleBlockDownTimeout();
  window.addEventListener('keydown', handleKeyDown);
};

onMounted(() => {
  startGame();
});

onBeforeUnmount(() => {
  clearBlockDownTimeout();
  window.removeEventListener('keydown', handleKeyDown);
});

watch(isGameOver, next => {
  if (next) {
    clearBlockDownTimeout();
    window.removeEventListener('keydown', handleKeyDown);
  } else {
    handleBlockDownTimeout();
    window.addEventListener('keydown', handleKeyDown);
  }
});

watch(score, next => {
  if (next >= level.value * 10) {
    useGameStore().levelUp();
  }
});
</script>

<style lang="scss">
.app {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: fit-content;

  @media screen and (max-width: 768px) {
    justify-content: space-between;
    width: 100dvw;
    height: 100dvh;
    max-width: initial;
  }

  &__game {
    display: flex;
    align-items: center;
    height: 100%;
    &__stats {
      border-left: 8px solid #242424;
    }
  }
}
</style>
