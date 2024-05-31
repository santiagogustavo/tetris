<template>
  <div class="controls-buttons">
    <div class="controls-buttons__button" @click="handleClickButtonB">B</div>
    <div class="controls-buttons__button" @click="handleClickButtonA">A</div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['b', 'a']);

const handleClickButtonB = () => {
  emit('b');
};

const handleClickButtonA = () => {
  emit('a');
};
</script>

<style lang="scss">
.controls-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem 1rem 2rem 2rem;
  &__button {
    font-family: 'Futura Condensed PT', Arial, Helvetica, sans-serif;
    cursor: pointer;
    position: relative;
    height: 3rem;
    width: 3rem;
    background: $color-button;
    border-radius: 50%;
    margin: 0 8px;
    user-select: none;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-button-lighter;
    transform: translateY(-6px);
    box-shadow: 0px 6px $color-button-dark;
    transition: transform 100ms ease, box-shadow 100ms ease;
    -webkit-tap-highlight-color: transparent;
    &:focus {
      outline: none;
      background: $color-button;
    }
    &:active {
      outline: none;
      transform: translateY(0px);
      box-shadow: 0px 0px $color-button-dark;
    }
    &:hover {
      background: $color-button-light;
    }
  }
}
</style>
