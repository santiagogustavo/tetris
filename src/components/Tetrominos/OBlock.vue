<template>
  <img class="o-block" :src="OBlockPng" />
</template>

<script setup lang="ts">
import OBlockPng from '@/assets/imgs/oblock.png';
</script>

<style lang="scss">
.o-block {
  @extend .block;
}
</style>
