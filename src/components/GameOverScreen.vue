<template>
  <div class="game-over-screen">
    <Title>GAME OVER</Title>
    <Button @click="handleRetry">RETRY</Button>
  </div>
</template>

<script lang="ts" setup>
import Title from '@/components/Title.vue';
import Button from '@/components/Button.vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

const handleRetry = () => {
  gameStore.resetGame();
};
</script>

<style lang="scss">
.game-over-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #0007;
  z-index: 999;
}
</style>
