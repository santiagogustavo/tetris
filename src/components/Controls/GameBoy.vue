<template>
  <div class="controls-gameboy">
    <DPad
      @up="handleClickUp"
      @down="handleClickDown"
      @left="handleClickLeft"
      @right="handleClickRight"
    />
    <Buttons @b="handleClickButtonB" />
  </div>
</template>

<script setup lang="ts">
import Buttons from './Buttons.vue';
import DPad from './DPad.vue';

const emit = defineEmits(['up', 'down', 'left', 'right', 'b']);

const handleClickUp = () => {
  emit('up');
};

const handleClickDown = () => {
  emit('down');
};

const handleClickLeft = () => {
  emit('left');
};

const handleClickRight = () => {
  emit('right');
};

const handleClickButtonB = () => {
  emit('b');
};
</script>

<style lang="scss">
.controls-gameboy {
  width: 100%;
  background: #cdcdcd;
  display: flex;
  justify-content: space-between;
}
</style>
