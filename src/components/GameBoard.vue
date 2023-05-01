<template>
  <div class="game-board">
    <div v-for="(row, i) of shadowBoard" :key="`row-${i}`" class="game-board__row">
      <component :is="getBlockType(block)" v-for="(block, j) of row" :key="`column-${j}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import EmptyBlock from '@/components/Tetrominos/EmptyBlock.vue';
import IBlock from '@/components/Tetrominos/IBlock.vue';

import { useGameStore } from '@/stores/game';

const board = computed(() => useGameStore().board);
const currentBlock = computed(() => useGameStore().currentBlock);
const positionX = computed(() => useGameStore().positionX);
const positionY = computed(() => useGameStore().positionY);
const shadowBoard = computed(() => {
  let shadow = JSON.parse(JSON.stringify(board.value));

  if (currentBlock.value) {
    currentBlock.value?.forEach((row: any, i: number) => {
      row.forEach((col: number, j: number) => {
        let x = Number(positionY.value) + i;
        let y = Number(positionX.value) + j;
        shadow[x][y] = col;
      });
    });
  }

  return shadow;
});

const getBlockType = (type: number) => {
  switch (type) {
    case 1:
      return IBlock;
    case 0:
    default:
      return EmptyBlock;
  }
};
</script>

<style lang="scss">
.game-board {
  &__row {
    display: flex;
  }
}
</style>
