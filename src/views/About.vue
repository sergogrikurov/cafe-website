<script setup>
import MaskGroup from "@/assets/images/mask-group.svg";

import Image1 from "@/assets/images/about/image1.png";
import Image2 from "@/assets/images/about/image2.png";
import Image3 from "@/assets/images/about/image3.png";
import Image4 from "@/assets/images/about/image4.png";

import Play from "@/assets/images/about/play-circle.png";
import Video from "@/assets/images/about/video-image.png";
import VideoPlay from "@/assets/images/about/video-play.png";

import Photo1 from "@/assets/images/about/photo1.png";
import Photo2 from "@/assets/images/about/photo2.png";
import Photo3 from "@/assets/images/about/photo3.png";
import Photo4 from "@/assets/images/about/photo4.png";
import MapPin from "@/assets/images/about/mapPin.svg";
import Emal from "@/assets/images/about/email.svg";

import PhotoR1 from "@/assets/images/about/photo-r-1.png";
import PhotoR2 from "@/assets/images/about/photo-r-2.png";
import PhotoR3 from "@/assets/images/about/photo-r-3.png";
import PhotoR4 from "@/assets/images/about/photo-r-4.png";
import PhotoR5 from "@/assets/images/about/photo-r-5.png";
import PhotoR6 from "@/assets/images/about/photo-r-6.png";
</script>

<template>
  <div class="about">
    <section class="about__header about-header">
      <div class="about-header__wrapper">
        <img :src="MaskGroup" alt="Mask Group" />
        <h1>About Us</h1>
        <p>
          We are a cozy café where great coffee meets a warm atmosphere. Our
          team believes that every cup tells a story, which is why we carefully
          select quality beans and prepare each drink with attention and care.
          Whether you stop by for a quick espresso or spend time with friends,
          we want you to feel at home and enjoy every moment with us.
        </p>
      </div>
    </section>
    <section class="about__enjoy about-enjoy">
      <div class="about-enjoy__wrapper">
        <div class="about-enjoy__images">
          <div class="about-enjoy__images_group">
            <img
              class="about-enjoy__images_image1"
              :src="Image1"
              alt="Two Cups Coffee and Succulents"
            />
            <img class="about-enjoy__images_image3" :src="Image3" alt="Cafe" />
            <img
              class="about-enjoy__images_image2"
              :src="Image2"
              alt="Donuts"
            />
            <img
              class="about-enjoy__images_image4"
              :src="Image4"
              alt="Coffee and Cheescake"
            />
          </div>
        </div>
        <div class="about-enjoy__content">
          <img :src="MaskGroup" alt="Mask Group" />
          <h2>Enjoy Best Quality Products</h2>
          <p>
            We use only carefully selected ingredients to create drinks and
            dishes that delight with rich flavor and exceptional quality every
            day.
          </p>
        </div>
      </div>
    </section>
    <section class="about__video about-video">
      <div class="about-video__wrapper">
        <div class="about-video__content">
          <img :src="MaskGroup" alt="Mask Group" />
          <h3>Cozy Ambiance and Environment</h3>
          <p>
            A comfortable space designed for meaningful conversations, quiet
            moments, and enjoying great coffee in a peaceful environment.
          </p>
          <button>WATCH VIDEO <img :src="Play" alt="Play Button" /></button>
        </div>
        <div class="about-video__player">
          <div class="about-video__player_image">
            <img :src="Video" alt="Video Image" />
            <img :src="VideoPlay" alt="Video Play" />
          </div>
        </div>
      </div>
    </section>
    <section class="about__team about-team">
      <div class="about-team__wrapper">
        <h4>Our Team</h4>
        <img class="about-team__image" :src="MaskGroup" alt="Mask Group" />
        <p class="about-team__par">
          Our passionate team is made up of skilled baristas and friendly staff
          who love what they do. Every day, we work together to create a
          welcoming atmosphere and serve each guest with care and attention.
        </p>
        <div class="about-team__cards about-cards">
          <div class="about-cards__card">
            <img class="about-cards__card_image" :src="Photo1" alt="Photo" />
            <h5>Niraj Sharma</h5>
            <p class="about-cards__card_status">Owner</p>
            <p class="about-cards__card_city">
              <img :src="MapPin" alt="Map Pin Icon" />Delhi
            </p>
            <p class="about-cards__card_email">
              <img :src="Emal" alt="Email Icon" />Get in touch
            </p>
          </div>
          <div class="about-cards__card">
            <img class="about-cards__card_image" :src="Photo2" alt="Photo" />
            <h5>Niraj Sharma</h5>
            <p class="about-cards__card_status">Co-Owner</p>
            <p class="about-cards__card_city">
              <img :src="MapPin" alt="Map Pin Icon" />Delhi
            </p>
            <p class="about-cards__card_email">
              <img :src="Emal" alt="Email Icon" />Get in touch
            </p>
          </div>
          <div class="about-cards__card">
            <img class="about-cards__card_image" :src="Photo3" alt="Photo" />
            <h5>Niraj Sharma</h5>
            <p class="about-cards__card_status">Chef</p>
            <p class="about-cards__card_city">
              <img :src="MapPin" alt="Map Pin Icon" />Delhi
            </p>
            <p class="about-cards__card_email">
              <img :src="Emal" alt="Email Icon" />Get in touch
            </p>
          </div>
          <div class="about-cards__card">
            <img class="about-cards__card_image" :src="Photo4" alt="Photo" />
            <h5>Niraj Sharma</h5>
            <p class="about-cards__card_status">Owner</p>
            <p class="about-cards__card_city">
              <img :src="MapPin" alt="Map Pin Icon" />Delhi
            </p>
            <p class="about-cards__card_email">
              <img :src="Emal" alt="Email Icon" />Get in touch
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="about__reviews about-reviews">
      <div class="about-reviews__wrapper">
        <img class="about-reviews__image" :src="MaskGroup" alt="Mask Group" />
        <h5 class="about-reviews__title">Reviews</h5>
        <div class="about-reviews__cards about-reviews-cards">
          <div class="about-reviews-cards__card">
            <p class="about-reviews-cards__card_par">
              Creative chef who brings passion and attention to every dish.
            </p>
            <div class="about-reviews-cards__card-content">
              <img
                :src="PhotoR1"
                alt="Photo"
                class="about-reviews-cards__card-content_image"
              />
              <div class="about-reviews-cards__card-content_name-status">
                <p>Nahid Hasan</p>
                <span>Chef</span>
              </div>
            </div>
          </div>
          <div class="about-reviews-cards__card">
            <p class="about-reviews-cards__card_par">
              Creative chef who brings passion and attention to every dish.
            </p>
            <div class="about-reviews-cards__card-content">
              <img
                :src="PhotoR2"
                alt="Photo"
                class="about-reviews-cards__card-content_image"
              />
              <div class="about-reviews-cards__card-content_name-status">
                <p>Nahid Hasan</p>
                <span>Chef</span>
              </div>
            </div>
          </div>
          <div class="about-reviews-cards__card">
            <p class="about-reviews-cards__card_par">
              Creative chef who brings passion and attention to every dish.
            </p>
            <div class="about-reviews-cards__card-content">
              <img
                :src="PhotoR3"
                alt="Photo"
                class="about-reviews-cards__card-content_image"
              />
              <div class="about-reviews-cards__card-content_name-status">
                <p>Nahid Hasan</p>
                <span>Chef</span>
              </div>
            </div>
          </div>
          <div class="about-reviews-cards__card">
            <p class="about-reviews-cards__card_par">
              Creative chef who brings passion and attention to every dish.
            </p>
            <div class="about-reviews-cards__card-content">
              <img
                :src="PhotoR4"
                alt="Photo"
                class="about-reviews-cards__card-content_image"
              />
              <div class="about-reviews-cards__card-content_name-status">
                <p>Nahid Hasan</p>
                <span>Chef</span>
              </div>
            </div>
          </div>
          <div class="about-reviews-cards__card">
            <p class="about-reviews-cards__card_par">
              Creative chef who brings passion and attention to every dish.
            </p>
            <div class="about-reviews-cards__card-content">
              <img
                :src="PhotoR5"
                alt="Photo"
                class="about-reviews-cards__card-content_image"
              />
              <div class="about-reviews-cards__card-content_name-status">
                <p>Nahid Hasan</p>
                <span>Chef</span>
              </div>
            </div>
          </div>
          <div class="about-reviews-cards__card">
            <p class="about-reviews-cards__card_par">
              Creative chef who brings passion and attention to every dish.
            </p>
            <div class="about-reviews-cards__card-content">
              <img
                :src="PhotoR6"
                alt="Photo"
                class="about-reviews-cards__card-content_image"
              />
              <div class="about-reviews-cards__card-content_name-status">
                <p>Nahid Hasan</p>
                <span>Chef</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about-header {
  @include adaptive-value(padding-top, 100, 50);
  @include adaptive-value(padding-bottom, 100, 50);
  @include adaptive-value(padding-left, 150, 15);
  @include adaptive-value(padding-right, 150, 15);
  background-color: #f8f9fa;
  &__wrapper {
    display: flex;
    flex-direction: column;
    max-width: rem(870);
    & img {
      @include adaptive-value(width, 308, 290);
    }
    & h1 {
      margin: rem(15) rem(0) rem(30) rem(0);
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 100, 40);
      color: #2b231d;
    }
    & p {
      font-family: "DM Sans";
      @include adaptive-value(font-size, 22, 20);
      line-height: 1.6;
      color: #1e1e1e;
      @media (max-width: $mobile) {
        line-height: 1.2;
      }
    }
  }
}
.about-enjoy {
  @include adaptive-value(padding-top, 100, 50);
  @include adaptive-value(padding-bottom, 100, 50);
  @include adaptive-value(padding-left, 150, 15);
  @include adaptive-value(padding-right, 150, 15);
  background-color: #f5f2ef;
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: rem(1400)) {
      flex-direction: column-reverse;
      gap: rem(30);
    }
  }
  &__images {
    @include adaptive-value(width, 751, 290);
    height: rem(591);
    display: grid;
    place-items: center;
    @media (max-width: rem(1024)) {
      display: inline-block;
      height: 100%;
    }
    &_group {
      position: relative;
      border: rem(3) solid #705e52;
      border-radius: rem(3);
      width: rem(500);
      @include adaptive-value(width, 500, 290);
      @include adaptive-value(height, 521, 310);
      @media (max-width: rem(1024)) {
        border: none;
        position: static;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        & > *:not(:last-child) {
          @include adaptive-value(margin-bottom, 20, 10);
        }
        & img {
          border: none;
          position: static;
          z-index: 0;
          padding: 0;
        }
      }
    }
    &_image1 {
      position: absolute;
      top: rem(-38);
      left: rem(-116);
      padding: rem(25) rem(9) rem(9) rem(25);
      border: rem(3) solid #705e52;
      border-radius: rem(3);
      z-index: 1;
      @media (max-width: rem(1024)) {
        @include adaptive-value(width, 308, 290);
      }
    }
    &_image2 {
      position: absolute;
      top: rem(22);
      right: rem(20);
      z-index: 1;
    }
    &_image3 {
      position: absolute;
      bottom: rem(10);
      left: rem(20);
    }
    &_image4 {
      padding: rem(9) rem(25) rem(25) rem(9);
      border: rem(3) solid #705e52;
      border-radius: rem(3);
      z-index: 1;
      position: absolute;
      bottom: rem(-38);
      right: rem(-128);
      @media (max-width: rem(1024)) {
        @include adaptive-value(width, 308, 290);
      }
    }
  }
  &__content {
    @include adaptive-value(width, 650, 290);
    @media (max-width: rem(1400)) {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
    & h2 {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 80, 30);
      color: #2b231d;
      @include adaptive-value(margin-top, 30, 20);
      @include adaptive-value(margin-bottom, 50, 20);
    }
    & p {
      font-family: "DM Sans";
      @include adaptive-value(font-size, 22, 20);
      line-height: 1.6;
      @media (max-width: $mobile) {
        line-height: 1.2;
      }
    }
  }
}
.about-video {
  @include adaptive-value(padding-top, 100, 50);
  @include adaptive-value(padding-bottom, 100, 50);
  @include adaptive-value(padding-left, 150, 15);
  @include adaptive-value(padding-right, 150, 15);
  background-color: #f8f9fa;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include adaptive-value(gap, 30, 20);
    @media (max-width: rem(1024)) {
      flex-direction: column;
      justify-content: center;
      @include adaptive-value(gap, 60, 30);
    }
  }
  &__content {
    @include adaptive-value(width, 720, 290);
    display: flex;
    flex-direction: column;
    @media (max-width: rem(1024)) {
      align-items: center;
      text-align: center;
    }
    & img {
      @include adaptive-value(width, 308, 290);
    }

    & h3 {
      margin-top: rem(15);
      @include adaptive-value(margin-bottom, 40, 20);
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 80, 30);
      color: #2b231d;
      max-width: rem(650);
    }
    & p {
      font-family: "DM Sans";
      @include adaptive-value(font-size, 22, 20);
      line-height: 1.6;
      color: #1e1e1e;
      @include adaptive-value(margin-bottom, 100, 20);
      @media (max-width: $mobile) {
        line-height: 1.2;
      }
    }
    & button {
      display: inline-flex;
      align-items: center;
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(22);
      color: #de6868;
      background-color: transparent;
      gap: rem(12);
      & img {
        width: rem(48);
        height: rem(48);
      }
    }
  }
  &__player {
    border: rem(3) solid #705e52;
    border-radius: rem(10);
    position: relative;
    @include adaptive-value(width, 700, 290);
    @include adaptive-value(height, 500, 240);

    &_image {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      &:hover {
        top: rem(35);
        left: rem(-50);
        @media (max-width: $mobile) {
          top: 0;
          left: 0;
        }
      }
    }
    & img {
      &:nth-child(1) {
        display: block;
        width: 100%;
        height: 100%;
      }
      &:nth-child(2) {
        position: absolute;
        cursor: pointer;
        @include adaptive-value(top, 210, 80);
        @include adaptive-value(left, 290, 105);
        @include adaptive-value(width, 124, 70);
      }
    }
  }
}
.about-team {
  @include adaptive-value(padding-top, 100, 50);
  @include adaptive-value(padding-bottom, 100, 50);
  @include adaptive-value(padding-left, 150, 15);
  @include adaptive-value(padding-right, 150, 15);
  background-color: #f5f2ef;
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    & h4 {
      font-family: "Playfair Display";
      font-weight: bold;
      @include adaptive-value(font-size, 70, 30);
      color: #2b231d;
    }
  }
  &__image {
    width: rem(230);
    margin: rem(10) rem(0) rem(25) rem(0);
  }

  &__par {
    font-family: "DM Sans";
    font-size: 20;
    line-height: 1.6;
    color: #1e1e1e;
    @include adaptive-value(margin-bottom, 100, 20);
    max-width: rem(970);
    @media (max-width: $mobile) {
      line-height: 1.2;
    }
  }
}
.about-cards {
  width: 100%;
  @include adaptive-value(margin-top, 90, 30);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: rem(20);
  @media (max-width: rem(1440)) {
    gap: rem(50);
  }
  @media (max-width: $mobile) {
    flex-direction: column;
  }

  &__card {
    max-width: rem(290);
    border-radius: rem(20);
    background-color: #ddccc0;
    position: relative;
    padding-bottom: rem(25);
    box-shadow: 0px 4px 4px 0px #000000be;

    & > *:not(:last-child) {
      margin-bottom: rem(10);
    }
    &_image {
      width: 100%;
      display: block;
    }
    & h5 {
      font-family: "Playfair Display";
      font-weight: 600;
      @include adaptive-value(font-size, 40, 20);
    }
    &_status {
      font-family: "DM Sans";
      font-size: rem(24);
      color: #705e52;
    }
    &_city {
      font-family: "DM Sans";
      font-size: rem(24);
      color: #705e52;
    }
    &_email {
      position: absolute;
      bottom: rem(-27);
      left: rem(60);
      border-radius: rem(20);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cfbcae;
      background-color: #e7d8cd;
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(16);
      padding: rem(15) rem(25);
    }
  }
}
.about-reviews {
  @include adaptive-value(padding-top, 100, 50);
  @include adaptive-value(padding-bottom, 100, 50);
  @include adaptive-value(padding-left, 150, 15);
  @include adaptive-value(padding-right, 150, 15);
  background-color: #f8f9fa;

  &__wrapper {
    @media (max-width: $mobile) {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  &__image {
    @include adaptive-value(width, 308, 290);
  }

  &__title {
    font-family: "Playfair Display";
    font-weight: bold;
    @include adaptive-value(font-size, 70, 30);
    color: #2b231d;
  }
}
.about-reviews-cards {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @include adaptive-value(gap, 50, 20);
  @include adaptive-value(margin-top, 60, 30);
  @media (max-width: rem(1431)) {
    justify-content: space-around;
    @include adaptive-value(gap, 50, 0);
  }
  @media (max-width: $mobile) {
    gap: rem(20);
  }

  &__card {
    @include adaptive-value(width, 416, 285);
    @media (max-width: $mobile) {
      @include adaptive-value(width, 416, 290);
    }
    background-color: #f5f2ef;
    padding: rem(30);
    border-radius: rem(10);
    display: flex;
    flex-direction: column;
    box-shadow: 0px 3px 5px 0px #705e529c;
    gap: rem(20);
    &_par {
      font-family: "DM Sans";
      @include adaptive-value(font-size, 22, 20);
      color: #1e1e1e;
      flex: 1 1 auto;
      line-height: 1.7;
      @media (max-width: $mobile) {
        line-height: 1.2;
      }
    }
  }

  &__card-content {
    display: flex;
    align-items: center;
    gap: rem(30);
    &_image {
    }

    &_name-status {
      & p {
        font-family: "Playfair Display";
        font-weight: bold;
        font-size: rem(24);
        color: #2b231d;
        margin-bottom: rem(10);
      }
      & span {
        font-family: "DM Sans";
        font-size: rem(20);
        color: #705e52;
      }
    }
  }
}
</style>
