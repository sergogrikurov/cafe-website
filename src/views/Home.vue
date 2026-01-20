<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import MaskGroup from "@/assets/images/mask-group.svg";
import RedButton from "@/components/RedButton.vue";

import Tea from "@/assets/images/home/tea.png";
import Bread from "@/assets/images/home/bread.png";

import SliderArrow from "@/assets/images/home/slider-arrow.svg";
import RedArrow from "@/assets/images/home/button-arrow-red.svg";

import Bakery from "@/assets/images/home/bakery.png";
import Donut from "@/assets/images/home/donut.png";
import Cake from "@/assets/images/home/cake.png";
import Chocolate from "@/assets/images/home/truffle.png";

import Image1 from "@/assets/images/blog/image1.png";
import Image2 from "@/assets/images/blog/image2.png";
import Image3 from "@/assets/images/blog/image3.png";

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

const currentSlide = ref(0);

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

let autoplayTimer = null;

onMounted(() => {
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, 1500);
});

onUnmounted(() => {
  clearInterval(autoplayTimer);
});
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
    <div class="home-page__about home-about">
      <div class="home-about__image">
        <img :src="Bread" alt="Bread Image" />
      </div>
      <div class="home-about__content">
        <div class="home-about__content_title">About our Cafe</div>
        <div class="home-about__content_text">
          We are a cozy cafe where quality coffee, fresh pastries, and a
          welcoming atmosphere come together. Every cup is crafted with care,
          and every guest is treated like a friend.
        </div>
        <div class="home-about__content_link">
          <RouterLink to="/about">
            Explore More <img :src="RedArrow" alt="Red Arrow" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="home-page__explore home-explore">
      <div class="home-explore__content">
        <div class="home-explore__content_image">
          <img :src="MaskGroup" alt="Mask Group" />
        </div>
        <div class="home-explore__content_title">Explore our Cafe</div>
        <div class="home-explore__content_text">
          Step inside our cafe and discover a place where great coffee, fresh
          pastries, and a warm atmosphere come together to make every visit
          special.
        </div>
      </div>
      <div class="home-explore__cards home-explore-cards">
        <div class="home-explore-cards__card">
          <div class="home-explore-cards__card_img">
            <img :src="Bakery" alt="Basket of Breads" />
          </div>
          <div class="home-explore-cards__card_title">Bread</div>
          <div class="home-explore-cards__card_text">
            Freshly baked bread with a crispy crust and soft texture, made daily
            using traditional recipes.
          </div>
          <div class="home-explore-cards__card_link"></div>
        </div>
        <div class="home-explore-cards__card">
          <div class="home-explore-cards__card_img">
            <img :src="Donut" alt="Donut Image" />
          </div>
          <div class="home-explore-cards__card_title">Donut</div>
          <div class="home-explore-cards__card_text">
            Soft and sweet donuts with a delicate glaze, perfect for a quick
            treat or a cozy coffee break.
          </div>
          <div class="home-explore-cards__card_link">
            <RouterLink to="/our-cafe">
              Explore More <img :src="RedArrow" alt="Red Arrow" />
            </RouterLink>
          </div>
        </div>
        <div class="home-explore-cards__card">
          <div class="home-explore-cards__card_img">
            <img :src="Cake" alt="Cakes Image" />
          </div>
          <div class="home-explore-cards__card_title">Cakes</div>
          <div class="home-explore-cards__card_text">
            Delicious handmade cakes prepared with fresh ingredients and a touch
            of creativity in every slice.
          </div>
          <div class="home-explore-cards__card_link">
            <RouterLink to="/our-cafe">
              Explore More <img :src="RedArrow" alt="Red Arrow" />
            </RouterLink>
          </div>
        </div>
        <div class="home-explore-cards__card">
          <div class="home-explore-cards__card_img">
            <img :src="Chocolate" alt="Chocolates Image" />
          </div>
          <div class="home-explore-cards__card_title">Chocolates</div>
          <div class="home-explore-cards__card_text">
            Rich chocolate truffles crafted for true chocolate lovers, offering
            a smooth and indulgent taste.
          </div>
          <div class="home-explore-cards__card_link">
            <RouterLink to="/our-cafe">
              Explore More <img :src="RedArrow" alt="Red Arrow" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="home-page__products home-product">
      <div class="home-product__content">
        <div class="home-product__content_title">
          <h2>Our Products</h2>
          <img :src="MaskGroup" alt="Mask Group" />
        </div>
        <div class="home-product__content_link">
          <RouterLink to="/products">
            <RedButton />
          </RouterLink>
        </div>
      </div>
      <div class="home-product__price home-product-price">
        <div class="home-product-price__items">
          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Espresso</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$3</p>
            </div>
            <div class="home-product-price__item_description">
              A rich and intense shot of espresso made from freshly ground
              coffee beans.
            </div>
          </div>

          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Cappuccino</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$5</p>
            </div>
            <div class="home-product-price__item_description">
              Smooth espresso combined with steamed milk and a light layer of
              milk foam.
            </div>
          </div>

          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Latte</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$5</p>
            </div>
            <div class="home-product-price__item_description">
              A creamy blend of espresso and hot milk, perfect for a gentle
              coffee break.
            </div>
          </div>

          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Americano</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$4</p>
            </div>
            <div class="home-product-price__item_description">
              Espresso diluted with hot water, offering a smooth and balanced
              taste.
            </div>
          </div>
        </div>

        <div class="home-product-price__items">
          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Fresh Tea</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$4</p>
            </div>
            <div class="home-product-price__item_description">
              Carefully brewed tea made from selected leaves with a natural
              aroma.
            </div>
          </div>

          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Chocolate Cake</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$6</p>
            </div>
            <div class="home-product-price__item_description">
              Soft chocolate cake made with rich cocoa and fresh ingredients.
            </div>
          </div>

          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Donut</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$3</p>
            </div>
            <div class="home-product-price__item_description">
              Freshly baked donut with a sweet glaze, perfect with coffee or
              tea.
            </div>
          </div>

          <div class="home-product-price__item">
            <div class="home-product-price__item_title-price">
              <p>Cheesecake</p>
              <p class="home-product-price__item_title-price-dotted"></p>
              <p>$6</p>
            </div>
            <div class="home-product-price__item_description">
              Classic creamy cheesecake with a delicate texture and rich flavor.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-page__blog home-page-blog">
      <div class="home-page-blog__title">
        <h2>Blog Posts</h2>
        <img :src="MaskGroup" alt="Mask Group" />
      </div>
      <div class="home-page-blog__cards home-page-blog-cards">
        <div class="home-page-blog-cards__card">
          <div class="home-page-blog-cards__card_image">
            <img :src="Image1" alt="Coffee Trio Image" />
          </div>
          <div class="home-page-blog-cards__card_title">Coffee</div>
          <div class="home-page-blog-cards__card_desc">
            Different cups, one love for coffee.
          </div>
          <div class="home-page-blog-cards__card_link">
            <RouterLink to="/blog">
              Read Blog <img :src="RedArrow" alt="Red Arrow" />
            </RouterLink>
          </div>
        </div>

        <div class="home-page-blog-cards__card">
          <div class="home-page-blog-cards__card_image">
            <img :src="Image3" alt="Outdoor Cafe Image" />
          </div>
          <div class="home-page-blog-cards__card_title">Outdoor Cafe</div>
          <div class="home-page-blog-cards__card_desc">
            Fresh air, good coffee, and a calm atmosphere — the perfect place to
            unwind.
          </div>
          <div class="home-page-blog-cards__card_link">
            <RouterLink to="/blog">
              Read Blog <img :src="RedArrow" alt="Red Arrow" />
            </RouterLink>
          </div>
        </div>

        <div class="home-page-blog-cards__card">
          <div class="home-page-blog-cards__card_image">
            <img :src="Image2" alt="Cafe Image" />
          </div>
          <div class="home-page-blog-cards__card_title">Cafe</div>
          <div class="home-page-blog-cards__card_desc">
            A cozy place to enjoy coffee, desserts, and calm moments.
          </div>
          <div class="home-page-blog-cards__card_link">
            <RouterLink to="/blog">
              Read Blog <img :src="RedArrow" alt="Red Arrow" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="home-page__vist home-page-vist">
      <div class="home-page-vist__content">
        <div class="home-page-vist__content_title">
          <h3>Visit Us</h3>
          <img :src="MaskGroup" alt="Mask Group" />
        </div>
        <p>
          Visit our cafe and enjoy freshly brewed coffee, delicious desserts,
          and a cozy atmosphere made for relaxing moments.
        </p>
      </div>
      <div class="home-page-vist__items home-page-vist-items">
        <div class="home-page-vist-items__map">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=44.790%2C41.709%2C44.820%2C41.725&layer=mapnik"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="home-page-vist-items__work">
          <div class="home-page-vist-items__work_days">
            <p>MONDAY</p>
            <span></span>
            <p>9:00AM-9:00PM</p>
          </div>
          <div class="home-page-vist-items__work_days">
            <p>TUESDAY</p>
            <span></span>
            <p>9:00AM-9:00PM</p>
          </div>
          <div class="home-page-vist-items__work_days">
            <p>Wednesday</p>
            <span></span>
            <p>9:00AM-9:00PM</p>
          </div>
          <div class="home-page-vist-items__work_days">
            <p>THURSDAY</p>
            <span></span>
            <p>9:00AM-9:00PM</p>
          </div>
          <div class="home-page-vist-items__work_days">
            <p>FRIDAY</p>
            <span></span>
            <p>9:00AM-9:00PM</p>
          </div>
          <div class="home-page-vist-items__work_days">
            <p>SATURDAY</p>
            <span></span>
            <p>9:00AM-9:00PM</p>
          </div>
          <div class="home-page-vist-items__work_days">
            <p>SUNDAY</p>
            <span></span>
            <p>CLOSE</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include adaptive-value(padding-top, 150, 50);
  @include adaptive-value(padding-bottom, 150, 50);
  @include adaptive-value(padding-left, 230, 15);
  @include adaptive-value(padding-right, 230, 15);
  background-color: #f8f9fa;
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

.home-about {
  background-color: #f5f2ef;
  display: flex;
  align-items: center;
  @include adaptive-value(padding-top, 90, 50);
  @include adaptive-value(padding-bottom, 90, 50);
  @include adaptive-value(padding-left, 230, 15);
  @include adaptive-value(padding-right, 230, 15);
  gap: rem(20);
  @media (max-width: rem(843)) {
    flex-wrap: wrap;
    justify-content: center;
  }
  &__image {
    flex: 0 0 auto;
    @include adaptive-value(width, 685, 290);
    & img {
      width: 100%;
      display: block;
    }
  }

  &__content {
    max-width: rem(720);
    @media (max-width: rem(843)) {
      text-align: center;
    }
    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 30, 20);
    }
    &_title {
      @include adaptive-value(font-size, 100, 40);
      font-family: "Playfair Display";
      font-weight: bold;
      color: #2b231d;
    }
    &_text {
      @include adaptive-value(font-size, 22, 18);
      font-family: "DM Sans";
      color: #1e1e1e;
      line-height: 170%;
      @media (max-width: rem(843)) {
        line-height: 140%;
      }
    }
    &_link {
      font-family: "DM Sans";
      font-weight: bold;
      color: #de6868;
      display: flex;
      align-items: center;
      font-size: rem(22);
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
        width: 80%;
      }
      & img {
        margin-top: -1px;
      }
    }
  }
}

.home-explore {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  @include adaptive-value(padding-top, 60, 50);
  @include adaptive-value(padding-bottom, 60, 50);
  @include adaptive-value(padding-left, 200, 15);
  @include adaptive-value(padding-right, 200, 15);
  & > *:not(:last-child) {
    @include adaptive-value(margin-bottom, 65, 40);
  }
  &__content {
    max-width: rem(870);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 30, 10);
    }
    &_image {
      @include adaptive-value(width, 308, 290);
      & img {
        width: 100%;
      }
    }
    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 70, 36);
      color: #2b231d;
    }
    &_text {
      font-family: "DM Sans";
      font-size: rem(18);
      color: #1e1e1e;
      line-height: 170%;
      @media (max-width: $mobile) {
        line-height: 140%;
      }
    }
  }
}
.home-explore-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @include adaptive-value(gap, 74, 20);
  @media (max-width: rem(1024)) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: rem(560)) {
    grid-template-columns: 1fr;
    place-items: center;
  }
  &__card {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @include adaptive-value(max-width, 325, 290);
    border-radius: rem(10);
    padding: rem(27) rem(13);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(rem(-6));
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
    }

    & > *:not(:last-child) {
      margin-bottom: rem(20);
    }
    &_img {
      width: rem(158);
      height: rem(158);
      overflow: hidden;
      &:hover {
        transform: scale(1.05);
      }
      & img {
        width: 100%;
        display: block;
        transition: transform 0.4s ease;
      }
    }

    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(32);
      color: #1e1e1e;
    }

    &_text {
      flex: 1;
      font-family: "DM Sans";
      font-size: rem(18);
      line-height: 170%;
      color: #1e1e1e;
      @media (max-width: $mobile) {
        line-height: 120%;
      }
    }

    &_link {
      font-family: "DM Sans";
      font-weight: bold;
      color: #de6868;
      display: flex;
      align-items: center;
      font-size: rem(20);
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
        width: 80%;
      }
      & img {
        margin-top: -2px;
      }
    }
  }
}

.home-product {
  background-color: #f5f2ef;
  @include adaptive-value(padding-top, 100, 50);
  @include adaptive-value(padding-bottom, 100, 50);
  @include adaptive-value(padding-left, 200, 15);
  @include adaptive-value(padding-right, 200, 15);
  & > *:not(:last-child) {
    @include adaptive-value(margin-bottom, 75, 40);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: $mobile) {
      flex-direction: column;
      justify-content: center;
      & > *:not(:last-child) {
        margin-bottom: rem(20);
      }
    }
    &_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 70, 30);
      color: #2b231d;
      & img {
        margin-top: rem(10);
        @include adaptive-value(width, 308, 290);
      }
    }
  }
}

.home-product-price {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: $mobile) {
    flex-direction: column;
    justify-content: center;
    & > *:not(:last-child) {
      margin-bottom: rem(20);
    }
  }
  &__items {
    @include adaptive-value(width, 618, 150);
    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 40, 0);
    }
    @media (max-width: $mobile) {
      width: rem(270);
      & > *:not(:last-child) {
        margin-bottom: rem(10);
      }
    }
  }

  &__item {
    height: rem(115);
    @media (max-width: $mobile) {
      height: rem(90);
    }
    & > *:not(:last-child) {
      margin-bottom: rem(10);
    }
    &_title-price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 40, 16);
    }
    &_title-price-dotted {
      flex: 1 1 auto;
      border: 1px dotted black;
      margin: rem(0) rem(20);
      @media (max-width: $mobile) {
        display: none;
      }
    }

    &_description {
      font-family: "DM Sans";
      font-size: rem(18);
      line-height: 170%;
      color: #2b231d;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media (max-width: $mobile) {
        line-height: 110%;
      }
    }
  }
}

.home-page-blog {
  background-color: #f8f9fa;
  @include adaptive-value(padding-top, 80, 50);
  @include adaptive-value(padding-bottom, 150, 50);
  @include adaptive-value(padding-left, 160, 15);
  @include adaptive-value(padding-right, 160, 15);
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Playfair Display";
    font-weight: bold;
    @include adaptive-value(font-size, 70, 30);
    color: #2b231d;
    & img {
      margin-top: rem(10);
      @include adaptive-value(width, 308, 290);
    }
  }
}
.home-page-blog-cards {
  width: 100%;
  @include adaptive-value(margin-top, 50, 35);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: rem(15);
  @media (max-width: rem(1024)) {
    flex-wrap: wrap;
  }
  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: center;
  }

  &__card {
    @include adaptive-value(padding-top, 30, 15);
    @include adaptive-value(padding-bottom, 30, 15);
    @include adaptive-value(padding-left, 30, 15);
    @include adaptive-value(padding-right, 30, 15);
    background-color: #fff;
    text-align: center;
    @include adaptive-value(width, 450, 150);
    border-radius: rem(10);
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: rem(1024)) {
      @include adaptive-value(width, 450, 270);
    }

    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 30, 15);
    }
    &_image {
      @include adaptive-value(height, 291, 179);

      & img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 32, 20);
      color: #1e1e1e;
    }

    &_desc {
      flex-grow: 1;
      font-family: "DM Sans";
      font-size: rem(18);
      color: #1e1e1e;
      line-height: 170%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media (max-width: $mobile) {
        line-height: 110%;
      }
    }

    &_link {
      font-family: "DM Sans";
      font-weight: bold;
      color: #de6868;
      display: flex;
      align-items: center;
      font-size: rem(20);
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
        width: 80%;
      }
      & img {
        margin-top: -2px;
      }
    }
  }
}

.home-page-vist {
  @include adaptive-value(padding-top, 100, 50);
  @include adaptive-value(padding-bottom, 100, 50);
  @include adaptive-value(padding-left, 160, 15);
  @include adaptive-value(padding-right, 160, 15);
  background-color: #f5f2ef;
  & > *:not(:last-child) {
    @include adaptive-value(margin-bottom, 120, 30);
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    @media (max-width: rem(1024)) {
      flex-direction: column;
      text-align: center;
      & > *:not(:last-child) {
        margin-bottom: rem(20);
      }
    }
    &_title {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 70, 30);
      color: #2b231d;
      & img {
        @include adaptive-value(width, 230, 110);
      }
    }
    & p {
      font-family: "DM Sans";
      @include adaptive-value(font-size, 20, 18);
      color: #1e1e1e;
      line-height: 170%;
      max-width: rem(620);
      @media (max-width: rem(1024)) {
        line-height: 110%;
      }
    }
  }
}
.home-page-vist-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include adaptive-value(gap, 100, 20);
  @media (max-width: rem(1024)) {
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: rem(20);
    }
  }

  &__map {
    @include adaptive-value(width, 765, 290);
    border-radius: rem(10);
    overflow: hidden;
    @include adaptive-value(height, 530, 250);
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  &__work {
    @include adaptive-value(width, 650, 290);
    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 38, 10);
    }
    &_days {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 30, 18);
      color: #2b231d;
      & span {
        flex: 1 1 auto;
        border: 1px dotted black;
        margin: rem(0) rem(20);
        @media (max-width: rem(1024)) {
          display: none;
        }
      }
    }
  }
}
</style>
