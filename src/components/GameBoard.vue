<template>
  <div class="game-board">
    <BlockRender :board="shadowBoard" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BlockRender from '@/components/BlockRender.vue';

import { useGameStore } from '@/stores/game';

const shadowBoard = computed(() => useGameStore().shadowBoard);
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
