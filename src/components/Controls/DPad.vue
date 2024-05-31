<template>
  <div class="controls-dpad">
    <div class="controls-dpad__row">
      <div class="controls-dpad__foo" />
      <div class="controls-dpad__button controls-dpad__button--up" @click="handleClickUp" />
      <div class="controls-dpad__foo" />
    </div>
    <div class="controls-dpad__row">
      <div class="controls-dpad__button controls-dpad__button--left" @click="handleClickLeft" />
      <div class="controls-dpad__center" />
      <div class="controls-dpad__button controls-dpad__button--right" @click="handleClickRight" />
    </div>
    <div class="controls-dpad__row">
      <div class="controls-dpad__foo" />
      <div class="controls-dpad__button controls-dpad__button--down" @click="handleClickDown" />
      <div class="controls-dpad__foo" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['up', 'down', 'left', 'right']);

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
</script>

<style lang="scss">
.controls-dpad {
  padding: 0.5rem;
  &__row {
    display: flex;
  }

  &__foo,
  &__button,
  &__center {
    height: 2.5rem;
    width: 2.5rem;
  }

  &__button,
  &__center {
    position: relative;
    background: $color-dpad;
    user-select: none;
  }

  &__button {
    cursor: pointer;
    transform: translateY(-6px);
    box-shadow: 0 6px $color-dpad-dark;
    transition: transform 100ms ease, box-shadow 100ms ease;
    &:focus {
      outline: none;
      background: $color-dpad;
    }
    &:active {
      transform: translateY(0px);
      box-shadow: 0 0px $color-dpad-dark;
    }
    &:hover {
      background: $color-dpad-light;
    }
  }

  &__center::after {
    content: '';
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
    width: 1.75rem;
    height: 1.75rem;
    background: $color-dpad-lighter;
    border-radius: 50%;
  }

  &__button {
    &--up {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    &--down {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    &--left {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &--right {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
}
</style>
