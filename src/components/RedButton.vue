<script setup>
import ButtoArrowWhite from "@/assets/images/home/button-arrow-white.svg";
</script>

<template>
  <button class="red-button">
    Explore More
    <span><img :src="ButtoArrowWhite" alt="Arrow White" /></span>
  </button>
</template>

<style lang="scss" scoped>
.red-button {
  width: rem(238);
  height: rem(70);
  border-radius: rem(10);
  background-color: #de6868;
  color: #fff;
  font-weight: bold;
  font-size: rem(22);
  font-family: "DM Sans";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: rem(12);

  transition: background-color 0.25s ease, transform 0.15s ease,
    box-shadow 0.15s ease;

  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.18);

  &:hover {
    background-color: #c95a5a;
    transform: translateY(-2px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
  }

  & span {
    margin-top: rem(6);
    transition: transform 0.25s ease;
  }

  &:hover span {
    transform: translateX(6px);
  }
}
</style>
