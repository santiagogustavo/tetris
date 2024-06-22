<template>
  <div v-for="(row, i) of board" :key="`row-${i}`" class="block__row">
    <component :is="getBlockType(block)" v-for="(block, j) of row" :key="`column-${j}`" />
  </div>
</template>

<script setup lang="ts">
import { getBlockType } from '@/utils/tetrominos';

defineProps({
  board: {
    type: Array<Array<number>>,
    required: true,
  },
});
</script>

<style lang="scss">
.block {
  &__row {
    pointer-events: none;
    user-select: none;
    display: flex;
  }
}
</style>
