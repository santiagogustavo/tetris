<template>
  <div class="game-board">
    <div v-for="(row, i) of shadowBoard" :key="`row-${i}`" class="game-board__row">
      <component :is="getBlockType(block)" v-for="(block, j) of row" :key="`column-${j}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue';

import EmptyBlock from '@/components/Tetrominos/EmptyBlock.vue';
import IBlock from '@/components/Tetrominos/IBlock.vue';
import JBlock from '@/components/Tetrominos/JBlock.vue';
import LBlock from '@/components/Tetrominos/LBlock.vue';
import OBlock from '@/components/Tetrominos/OBlock.vue';
import SBlock from '@/components/Tetrominos/SBlock.vue';
import TBlock from '@/components/Tetrominos/TBlock.vue';
import ZBlock from '@/components/Tetrominos/ZBlock.vue';

import { useGameStore } from '@/stores/game';
import { checkBottomCollision } from '@/utils/block';
import { playLandSound } from '@/utils/sfx';
import { getRandomBlock } from '@/data/tetrominos';

let timeout: any = undefined;

const board = computed(() => useGameStore().board);
const currentBlock = computed(() => useGameStore().currentBlock);
const positionX = computed(() => useGameStore().positionX);
const positionY = computed(() => useGameStore().positionY);
const currentSpeed = computed(() => useGameStore().currentSpeed);
const shadowBoard = computed(() => {
  if (!currentBlock.value) {
    return board.value;
  }

  let shadow = JSON.parse(JSON.stringify(board.value));

  currentBlock.value?.forEach((row: any, i: number) => {
    row.forEach((col: number, j: number) => {
      let x = Number(positionY.value) + i;
      let y = Number(positionX.value) + j;
      if (col != 0) {
        shadow[x][y] = col;
      }
    });
  });

  return shadow;
});

const getBlockType = (type: number) => {
  switch (type) {
    case 1:
      return IBlock;
    case 2:
      return JBlock;
    case 3:
      return LBlock;
    case 4:
      return OBlock;
    case 5:
      return SBlock;
    case 6:
      return TBlock;
    case 7:
      return ZBlock;
    case 0:
    default:
      return EmptyBlock;
  }
};

watch(
  () => shadowBoard.value,
  (next: any) => {
    if (timeout) {
      return;
    }
    if (checkBottomCollision(next, currentBlock.value, positionX.value, positionY.value)) {
      playLandSound();

      if (positionY.value != 0) {
        timeout = setTimeout(() => {
          useGameStore().copyShadowToBoard(shadowBoard.value);
          useGameStore().setCurrentBlock(getRandomBlock());
          timeout = undefined;
        }, currentSpeed.value);
      } else {
        console.log('game over');
        useGameStore().setGameOver(true);
      }
    }
  }
);

onBeforeUnmount(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
});
</script>

<style lang="scss">
.game-board {
  &__row {
    display: flex;
  }
}
</style>
