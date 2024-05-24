<template>
  <div class="game-header">
    <div class="game-header__rows">ROWS: {{ score }}</div>
    <div class="game-header__level">LEVEL: {{ level }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useGameStore } from '@/stores/game';
import { computed } from 'vue';

const score = computed(() => useGameStore().score);
const level = computed(() => useGameStore().level);
</script>

<style lang="scss">
.game-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
