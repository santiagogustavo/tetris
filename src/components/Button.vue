<template>
  <button class="button">
    <div class="button__left"></div>
    <div class="button__right"></div>
    <div class="button__top"></div>
    <div class="button__bottom"></div>
    <slot />
  </button>
</template>

<style lang="scss">
$button-border-size: 4px;

.button {
  cursor: pointer;
  z-index: 1;
  position: relative;
  color: $color-gb2;
  font-family: inherit;
  background-color: $color-gb5;
  font-size: 24px;
  padding: 0px 32px;
  margin: $button-border-size;
  border: none;

  &:hover {
    filter: brightness(1.2);
  }

  &__left,
  &__right,
  &__top,
  &__bottom {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__left {
    box-shadow: -#{$button-border-size} 0px $color-black;
  }
  &__right {
    box-shadow: $button-border-size 0px $color-black;
  }
  &__top {
    box-shadow: 0px -#{$button-border-size} $color-black;
  }
  &__bottom {
    box-shadow: 0px $button-border-size $color-black;
  }
}
</style>
