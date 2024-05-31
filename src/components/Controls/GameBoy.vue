<template>
  <div class="controls-gameboy">
    <DPad
      @up="handleClickUp"
      @down="handleClickDown"
      @left="handleClickLeft"
      @right="handleClickRight"
    />
    <Buttons @b="handleClickButtonB" @a="handleClickButtonA" />
  </div>
</template>

<script setup lang="ts">
import Buttons from './Buttons.vue';
import DPad from './DPad.vue';

const emit = defineEmits(['up', 'down', 'left', 'right', 'b', 'a']);

const tapVibrate = () => {
  navigator?.vibrate([30]);
};

const handleClickUp = () => {
  tapVibrate();
  emit('up');
};

const handleClickDown = () => {
  tapVibrate();
  emit('down');
};

const handleClickLeft = () => {
  tapVibrate();
  emit('left');
};

const handleClickRight = () => {
  tapVibrate();
  emit('right');
};

const handleClickButtonB = () => {
  tapVibrate();
  emit('b');
};

const handleClickButtonA = () => {
  tapVibrate();
  emit('a');
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
