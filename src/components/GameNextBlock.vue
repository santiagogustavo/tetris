<template>
  <div class="game-next-block">
    <div class="game-next-block__title">NEXT</div>
    <div class="game-next-block__board-container">
      <div class="game-next-block__board">
        <BlockRender :board="nextBlock" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BlockRender from '@/components/BlockRender.vue';
import { useGameStore } from '@/stores/game';

const nextBlock = computed(() => useGameStore().nextBlock);
</script>

<style lang="scss">
.game-next-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0px;
  &__title {
    background: #242424;
    text-align: center;
  }
  &__board-container {
    background: $color-gb6;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 128px;
    width: 128px;

    @media screen and (max-width: 768px) {
      height: 100px;
      width: 100px;
    }
  }
}
</style>
