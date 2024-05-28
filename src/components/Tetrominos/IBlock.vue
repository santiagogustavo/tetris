<template>
  <img class="i-block" :src="IBlockPng" />
</template>

<script setup lang="ts">
import IBlockPng from '@/assets/imgs/iblock.png';
</script>

<style lang="scss">
.i-block {
  @extend .block;
}
</style>
