<script setup>
import { ref } from "vue";
const currentSlide = ref(0);

import MaskGroup from "@/assets/images/home/mask-group.svg";
import RedButton from "@/components/RedButton.vue";
import Tea from "@/assets/images/home/tea-1.png";
import Bread from "@/assets/images/home/bread.png";
import SliderArrow from "@/assets/images/home/slider-arrow.svg";

const slides = [
  {
    title: "We Love Good Tea",
    text: "Enjoy fragrant, soothing tea made from carefully selected leaves and brewed with care for every moment.",
    image: Tea,
    alt: "Cup of hot tea on a wooden table",
  },
  {
    title: "Fresh Bread Everyday",
    text: "Warm, freshly baked bread prepared every morning to perfectly complement your favorite drink.",
    image: Bread,
    alt: "Freshly baked bread with golden crust",
  },
];

let touchStartX = 0;
let touchEndX = 0;

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function onTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
}
</script>

<template>
  <div class="home-page">
    <div
      class="home-page__slider slider"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="slider__content">
        <div class="slider__content_logo">
          <img :src="MaskGroup" alt="Mask Group" />
        </div>
        <h2 class="slider__content_title">
          {{ slides[currentSlide].title }}
        </h2>
        <div class="slider__content_text">
          {{ slides[currentSlide].text }}
        </div>
        <div class="slider__content_button">
          <RouterLink to="/products">
            <RedButton />
          </RouterLink>
        </div>
      </div>
      <div class="slider__image">
        <img
          :src="slides[currentSlide].image"
          :alt="slides[currentSlide].alt"
        />
      </div>
      <div class="slider__arrows">
        <div class="slider__arrows_left" @click="prevSlide">
          <img :src="SliderArrow" alt="Slider Arrow Left" />
        </div>
        <div class="slider__arrows_right" @click="nextSlide">
          <img :src="SliderArrow" alt="Slider Arrow Right" />
        </div>
      </div>
    </div>
    <div class="home-page__about"></div>
    <div class="home-page__explore"></div>
    <div class="home-page__products"></div>
    <div class="home-page__blog"></div>
    <div class="home-page__vist"></div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: rem(150) rem(230);
  @include adaptive-value(padding-top, 150, 50);
  @include adaptive-value(padding-bottom, 150, 50);
  @include adaptive-value(padding-left, 230, 15);
  @include adaptive-value(padding-right, 230, 15);
  position: relative;
  @media (max-width: $mobile) {
    flex-direction: column;
  }
  &__content {
    max-width: rem(811);
    @media (max-width: $mobile) {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
    &_logo {
      @include adaptive-value(max-width, 308, 290);
      margin-bottom: rem(17);
      & img {
        width: 100%;
      }
    }

    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 100, 40);
      color: #2b231d;
      margin-bottom: rem(36);
      @include adaptive-value(margin-bottom, 36, 20);
    }

    &_text {
      font-family: "DM Sans";
      font-size: rem(22);
      @include adaptive-value(font-size, 22, 18);
      color: #1e1e1e;
      line-height: 160%;
      @include adaptive-value(margin-bottom, 120, 30);
    }
  }

  &__image {
    flex: 0 0 auto;
    @include adaptive-value(width, 570, 290);
    @media (max-width: $mobile) {
      order: -1;
    }
    & img {
      width: 100%;
      display: block;
    }
  }

  &__arrows {
    @media (max-width: rem(1024)) {
      display: none;
    }
    & img {
      cursor: pointer;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
    &_left {
      position: absolute;
      transform: rotate(180deg);
      @include adaptive-value(top, 550, 350);
      left: rem(70);
    }

    &_right {
      position: absolute;
      @include adaptive-value(top, 550, 350);
      right: rem(70);
    }
  }
}
</style>
