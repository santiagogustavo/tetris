<template>
  <img class="t-block" :src="ZBlockPng" />
</template>

<script setup lang="ts">
import ZBlockPng from '@/assets/imgs/zblock.png';
</script>

<style lang="scss">
.z-block {
  @extend .block;
}
</style>
