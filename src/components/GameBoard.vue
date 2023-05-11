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
import JBlock from '@/components/Tetrominos/JBlock.vue';
import LBlock from '@/components/Tetrominos/LBlock.vue';
import OBlock from '@/components/Tetrominos/OBlock.vue';
import SBlock from '@/components/Tetrominos/SBlock.vue';
import TBlock from '@/components/Tetrominos/TBlock.vue';
import ZBlock from '@/components/Tetrominos/ZBlock.vue';

import { useGameStore } from '@/stores/game';

const shadowBoard = computed(() => useGameStore().shadowBoard);

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
</script>

<style lang="scss">
.game-board {
  pointer-events: none;
  user-select: none;
  &__row {
    display: flex;
  }
}
</style>
