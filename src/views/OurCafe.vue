<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import Search from "@/components/Search.vue";
import MaskGroup from "@/assets/images/mask-group.svg";

import SliderArrow from "@/assets/images/our-cafe/slider-arrow.svg";

import Image1 from "@/assets/images/our-cafe/image1.png";
import Image2 from "@/assets/images/our-cafe/image2.png";
import Image3 from "@/assets/images/our-cafe/image3.png";
import Image4 from "@/assets/images/our-cafe/image4.png";
import Image5 from "@/assets/images/our-cafe/image5.png";
import Image6 from "@/assets/images/our-cafe/image6.png";
import Image7 from "@/assets/images/our-cafe/image7.png";
import Image8 from "@/assets/images/our-cafe/image8.png";

import Food1 from "@/assets/images/our-cafe/food1.png";
import Food2 from "@/assets/images/our-cafe/food2.png";
import Food3 from "@/assets/images/our-cafe/food3.png";
import Food4 from "@/assets/images/our-cafe/food4.png";
import Food5 from "@/assets/images/our-cafe/food5.png";
import Food6 from "@/assets/images/our-cafe/food6.png";

const slides = [
  {
    image: Image1,
    alt: "Vanila Latte",
  },
  {
    image: Image2,
    alt: "Chocolate Capachino",
  },
  {
    image: Image3,
    alt: "Espresso",
  },
  {
    image: Image4,
    alt: "Kulhad Tea",
  },
  {
    image: Image5,
    alt: "Vanila Capachino",
  },
  {
    image: Image6,
    alt: "Green Tea",
  },
  {
    image: Image7,
    alt: "Hot Chai Latte",
  },
  {
    image: Image8,
    alt: "Assam Chai",
  },
];

const currentSlide = ref(0);
4;
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
  <div class="our-cafe">
    <div class="our-cafe__search">
      <img :src="MaskGroup" alt="Mask Group" />
      <h2>Our Cafe</h2>
      <p>
        Enjoy freshly baked pastries, carefully brewed coffee, fine teas, and
        smooth chocolate drinks. Our cafe is a cozy place where every visit
        feels warm, calm, and delicious.
      </p>
      <Search />
    </div>
    <div
      class="home-page__slider slider"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="slider__content">
        <div class="slider__content_logo">
          <img :src="MaskGroup" alt="Mask Group" />
        </div>
        <h2 class="slider__content_title">Most Popular</h2>
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
    <div class="our-cafe__serve serve">
      <div class="serve__image">
        <img :src="MaskGroup" alt="Mask Group" />
      </div>
      <h2 class="serve__title">We Serve</h2>
      <div class="serve__wrapper">
        <!--Drinks-->
        <div class="serve__items">
          <div class="serve__items_title">Drinks<span></span></div>
          <div class="serve__cards-wrapper">
            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image1" alt="Vanila Latte" />
              </div>
              <div class="serve-card__content">
                <h3>vanilla latte</h3>
                <p>
                  Vanilla Latte is a coffee drink made with espresso, steamed
                  milk, and vanilla syrup
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image2" alt="Chocolate Capachino" />
              </div>
              <div class="serve-card__content">
                <h3>Chocolate Capachino</h3>
                <p>
                  blend of tangerine white chocolate sauce, espresso & cream,
                  topped with yummy whipped cream, Serving
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image3" alt="espresso" />
              </div>
              <div class="serve-card__content">
                <h3>espresso</h3>
                <p>is a coffee -brewing method of Italian origin,</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image4" alt="kulhad tea" />
              </div>
              <div class="serve-card__content">
                <h3>kulhad tea</h3>
                <p>
                  Chai, when served in kulhads, becomes extra sweet and special.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image5" alt="Vanila Capachino" />
              </div>
              <div class="serve-card__content">
                <h3>Vanila Capachino</h3>
                <p>
                  vanilla cappuccino is a coffee drink that is made with
                  espresso, steamed milk, and foam that has been flavored with
                  vanilla syrup.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image6" alt="Green tea" />
              </div>
              <div class="serve-card__content">
                <h3>Green tea</h3>
                <p>
                  sweet, bittersweet, nutty, vegetal, buttery, floral, swampy,
                  fruity, and oceanic.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image7" alt="hot chai latte" />
              </div>
              <div class="serve-card__content">
                <h3>hot chai latte</h3>
                <p>an Indian beverage popular throughout South Asia</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image8" alt="assam chai" />
              </div>
              <div class="serve-card__content">
                <h3>assam chai</h3>
                <p>
                  vanilla cappuccino is a coffee drink that is made with
                  espresso, steamed milk, and foam that has been flavored with
                  vanilla syrup.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image1" alt="Vanila Latte" />
              </div>
              <div class="serve-card__content">
                <h3>vanilla latte</h3>
                <p>
                  Vanilla Latte is a coffee drink made with espresso, steamed
                  milk, and vanilla syrup
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image2" alt="Chocolate Capachino" />
              </div>
              <div class="serve-card__content">
                <h3>Chocolate Capachino</h3>
                <p>
                  blend of tangerine white chocolate sauce, espresso & cream,
                  topped with yummy whipped cream, Serving
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image3" alt="espresso" />
              </div>
              <div class="serve-card__content">
                <h3>espresso</h3>
                <p>is a coffee -brewing method of Italian origin,</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image4" alt="kulhad tea" />
              </div>
              <div class="serve-card__content">
                <h3>kulhad tea</h3>
                <p>
                  Chai, when served in kulhads, becomes extra sweet and special.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image5" alt="Vanila Capachino" />
              </div>
              <div class="serve-card__content">
                <h3>Vanila Capachino</h3>
                <p>
                  vanilla cappuccino is a coffee drink that is made with
                  espresso, steamed milk, and foam that has been flavored with
                  vanilla syrup.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image6" alt="Green tea" />
              </div>
              <div class="serve-card__content">
                <h3>Green tea</h3>
                <p>
                  sweet, bittersweet, nutty, vegetal, buttery, floral, swampy,
                  fruity, and oceanic.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image7" alt="hot chai latte" />
              </div>
              <div class="serve-card__content">
                <h3>hot chai latte</h3>
                <p>an Indian beverage popular throughout South Asia</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image8" alt="assam chai" />
              </div>
              <div class="serve-card__content">
                <h3>assam chai</h3>
                <p>
                  vanilla cappuccino is a coffee drink that is made with
                  espresso, steamed milk, and foam that has been flavored with
                  vanilla syrup.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image1" alt="Vanila Latte" />
              </div>
              <div class="serve-card__content">
                <h3>vanilla latte</h3>
                <p>
                  Vanilla Latte is a coffee drink made with espresso, steamed
                  milk, and vanilla syrup
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Image2" alt="Chocolate Capachino" />
              </div>
              <div class="serve-card__content">
                <h3>Chocolate Capachino</h3>
                <p>
                  blend of tangerine white chocolate sauce, espresso & cream,
                  topped with yummy whipped cream, Serving
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--Food-->
        <div class="serve__items">
          <div class="serve__items_title">Food<span></span></div>
          <div class="serve__cards-wrapper">
            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Food1" alt="cheese toast" />
              </div>
              <div class="serve-card__content">
                <h3>cheese toast</h3>
                <p>Crispy toast topped with rich, melted cheese.</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Food2" alt="pizza" />
              </div>
              <div class="serve-card__content">
                <h3>pizza</h3>
                <p>Hot, cheesy pizza with a crispy crust.</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Food3" alt="Cheese Toast & Fried Egg" />
              </div>
              <div class="serve-card__content">
                <h3>Cheese Toast & Fried Egg</h3>
                <p>
                  A warm toast topped with cheese and a perfectly fried egg.
                </p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Food4" alt="toast" />
              </div>
              <div class="serve-card__content">
                <h3>toast</h3>
                <p>Freshly toasted bread with a crispy finish.</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Food5" alt="Sweet Toast" />
              </div>
              <div class="serve-card__content">
                <h3>Sweet Toast</h3>
                <p>Warm toast with fresh banana, blueberries, and syrup.</p>
              </div>
            </div>

            <div class="serve__card serve-card">
              <div class="serve-card__image">
                <img :src="Food6" alt="Honey Toast" />
              </div>
              <div class="serve-card__content">
                <h3>Honey Toast</h3>
                <p>Golden toast with honey and fresh raspberries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.our-cafe {
  &__search {
    @include adaptive-value(padding-top, 250, 50);
    @include adaptive-value(padding-bottom, 50, 50);
    @include adaptive-value(padding-left, 50, 15);
    @include adaptive-value(padding-right, 50, 15);
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    & img {
      @include adaptive-value(width, 308, 290);
    }
    & h2 {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 100, 40);
      color: #2b231d;
      margin: rem(25) rem(0);
    }
    & p {
      font-family: "DM Sans";
      font-size: rem(22);
      line-height: 160%;
      color: #1e1e1e;
      max-width: rem(866);
      @include adaptive-value(margin-bottom, 100, 30);
      @media (max-width: $mobile) {
        font-size: rem(20);
        line-height: 120%;
      }
    }
  }
}

.slider {
  padding-top: rem(50);
  @include adaptive-value(padding-bottom, 250, 50);
  @include adaptive-value(padding-left, 260, 15);
  @include adaptive-value(padding-right, 260, 15);
  background-color: #f5f2ef;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  &__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    &_logo {
      @include adaptive-value(width, 308, 290);
      & img {
        display: block;
        width: 100%;
      }
    }
    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 100, 40);
      color: #2b231d;
      margin-top: rem(10);
      @include adaptive-value(margin-bottom, 90, 20);
    }
  }
  &__image {
    @include adaptive-value(width, 500, 290);
    @include adaptive-value(height, 280, 200);
    position: relative;

    & img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &__arrows {
    @media (max-width: $mobile) {
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
      @include adaptive-percent(top, 826, 50, 29);
      @include adaptive-value(left, 620, -20);
      transform: rotate(180deg);
    }

    &_right {
      position: absolute;
      @include adaptive-percent(top, 826, 50, 29);
      @include adaptive-value(right, 620, -20);
    }
  }
}

.serve {
  @include adaptive-value(padding-top, 65, 50);
  @include adaptive-value(padding-bottom, 65, 50);
  @include adaptive-value(padding-left, 100, 15);
  @include adaptive-value(padding-right, 100, 15);
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  &__title {
    font-family: "Playfair Display";
    font-weight: bold;
    @include adaptive-value(font-size, 100, 40);
    @include adaptive-value(margin-bottom, 50, 30);
    color: #2b231d;
  }

  &__image {
    @include adaptive-value(width, 308, 290);
    & img {
      width: 100%;
      display: block;
    }
  }

  &__items {
    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 60, 30);
      @include adaptive-value(margin-bottom, 50, 30);
      color: #2b231d;
      display: flex;
      align-items: center;
      @media (max-width: $mobile) {
        flex-direction: column;
      }
      & span {
        flex: 1 1 auto;
        border: 1px dotted black;
        margin: rem(0) rem(20) rem(0) rem(50);
        @media (max-width: $mobile) {
          display: none;
        }
      }
    }
    @include adaptive-value(margin-bottom, 150, 50);
  }
  &__cards-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @include adaptive-value(gap, 50, 20);
    @media (max-width: rem(1559)) {
      justify-content: space-around;
    }
  }
  &__wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

.serve-card {
  display: flex;
  align-items: center;
  @include adaptive-value(width, 480, 290);
  @include adaptive-value(gap, 25, 20);
  @media (max-width: rem(1024)) {
    flex-direction: column;
    text-align: center;
    max-width: rem(185);
    height: rem(300);
  }

  &__image {
    width: rem(185);
    height: rem(185);
  }
  &__content {
    @include adaptive-value(width, 296, 185);
    @media (max-width: rem(1024)) {
      max-width: rem(185);
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    & > *:not(:last-child) {
      margin-bottom: rem(20);
    }
    & h3 {
      text-transform: uppercase;
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(20);
    }
    & p {
      font-family: "DM Sans";
      font-size: rem(15);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media (max-width: rem(1024)) {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
