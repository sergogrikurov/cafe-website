<script setup>
import Search from "@/assets/images/search.svg";
</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search" />
    <button>
      <img :src="Search" alt="Search Icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  @include adaptive-value(width, 711, 290);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include adaptive-value(gap, 12, 0);
  & input {
    flex: 1;
    @include adaptive-value(width, 646, 237);
    height: rem(53);
    border-radius: rem(10);
    border: 1px solid #cfbcae;
    @include adaptive-value(padding-left, 32, 10);
    background-color: #fff;
    font-family: "DM Sans";
    font-size: rem(20);
    color: #2b231d;
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      background-color 0.25s ease;

    &::placeholder {
      color: #cfbcae;
      transition: color 0.25s ease;
    }

    &:hover {
      border-color: #b09b8c;
    }

    &:focus {
      border-color: #de6868;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(222, 104, 104, 0.25);
    }

    &:focus::placeholder {
      color: transparent;
    }
  }

  & button {
    width: rem(53);
    height: rem(53);
    background-color: #2b231d;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: rem(10);
    & img {
      scale: 1;
      &:hover {
        scale: 1.2;
      }
    }
  }
}
</style>
