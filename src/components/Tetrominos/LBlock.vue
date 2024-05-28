<template>
  <img class="l-block" :src="LBlockPng" />
</template>

<script setup lang="ts">
import LBlockPng from '@/assets/imgs/lblock.png';
</script>

<style lang="scss">
.l-block {
  @extend .block;
}
</style>
