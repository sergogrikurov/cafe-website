<script setup>
import { ref } from "vue";
import logo from "@/assets/images/logo.png";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <img :src="logo" alt="Cafe Logo" class="header__logo_img" />
    </div>

    <button
      class="header__burger"
      :class="{ open: isMenuOpen }"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav :class="['header__nav', { header__nav_active: isMenuOpen }]">
      <RouterLink class="header__nav_link" to="/">Home</RouterLink>
      <RouterLink class="header__nav_link" to="/products">Products</RouterLink>
      <RouterLink class="header__nav_link" to="/our-cafe">Our Cafe</RouterLink>
      <RouterLink class="header__nav_link" to="/blog">Blog</RouterLink>
      <RouterLink class="header__nav_link" to="/about">About Us</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: rem(107);
  padding: 0 15px;
  background-color: #f5f2ef;
  z-index: 5;

  &__logo {
    position: relative;
    height: 100%;
    &_img {
      position: absolute;
      @include adaptive-value(top, 10, 18);
      @include adaptive-value(left, 103, 0);
      @include adaptive-value(width, 194, 70);
      @include adaptive-value(height, 194, 70);
    }
  }

  &__nav {
    display: flex;
    gap: rem(32);
    align-items: center;
    font-family: "DM Sans";
    font-weight: bold;
    @include adaptive-value(font-size, 22, 18);

    &_link {
      position: relative;
      display: inline-block;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -3px;
        width: 0;
        height: rem(2);
        background-color: #de6868;
        transition: width 0.25s ease;
      }

      &:hover {
        color: #de6868;
      }

      &:hover::after {
        width: 100%;
      }
    }

    @media (max-width: $mobile) {
      flex-direction: column;
      position: absolute;
      top: 100%;
      right: 0;
      width: rem(200);
      background-color: #f5f2ef;
      padding: rem(20);
      box-shadow: 0 rem(4) rem(10) rgba(0, 0, 0, 0.1);
      display: none;

      &.header__nav_active {
        display: flex;
      }
    }
  }

  &__burger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: rem(38);
    height: rem(30);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    border: rem(1) solid #f5f2ef;

    span {
      display: block;
      height: rem(2);
      width: 100%;
      background-color: $main-color;
      border-radius: 1px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &.open span:nth-child(1) {
      transform: rotate(37deg) translate(8px, 10px);
    }

    &.open span:nth-child(2) {
      opacity: 0;
    }

    &.open span:nth-child(3) {
      transform: rotate(-37deg) translate(8px, -10px);
    }

    @media (max-width: $mobile) {
      display: flex;
    }
  }
}
</style>
