<template>
  <img class="s-block" :src="SBlockPng" />
</template>

<script setup lang="ts">
import SBlockPng from '@/assets/imgs/sblock.png';
</script>

<style lang="scss">
.s-block {
  @extend .block;
}
</style>
