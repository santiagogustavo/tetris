<template>
  <img class="j-block" :src="JBlockPng" />
</template>

<script setup lang="ts">
import JBlockPng from '@/assets/imgs/jblock.png';
</script>

<style lang="scss">
.j-block {
  @extend .block;
}
</style>
