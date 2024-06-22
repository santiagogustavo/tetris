<template>
  <div class="game-header">
    <div class="game-header__rows">
      <div class="game-header__title">ROWS</div>
      <div class="game-header__subtitle">{{ score }}</div>
    </div>
    <div class="game-header__level">
      <div class="game-header__title">LEVEL</div>
      <div class="game-header__subtitle">{{ level }}</div>
    </div>
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
  flex-direction: column;
  justify-content: flex-end;

  &__rows,
  &__level {
    margin: 24px 0px;
  }

  &__title {
    text-align: center;
  }
  &__subtitle {
    text-align: right;
  }
}
</style>
