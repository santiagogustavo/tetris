<template>
  <img class="t-block" :src="TBlockPng" />
</template>

<script setup lang="ts">
import TBlockPng from '@/assets/imgs/tblock.png';
</script>

<style lang="scss">
.t-block {
  @extend .block;
}
</style>
