<script setup>
import logo from "@/assets/images/logo.png";
</script>

<template>
  <footer class="footer">
    <div class="footer__content footer-content">
      <div class="footer-content__logo">
        <img :src="logo" alt="Cafe Logo" class="header__logo_img" />
        <h2 class="footer-content__logo_text">Let’s Tea</h2>
      </div>
      <div class="footer-content__subscribe">
        <h3 class="footer-content__subscribe_title">News Letter</h3>
        <div class="footer-content__subscribe_field">
          <input type="text" />
          <button>Subscribe</button>
        </div>
        <p class="footer-content__subscribe_text">
          Sign up with your email address to receive news and updates
        </p>
      </div>
      <nav class="footer-content__links">
        <RouterLink class="footer-content__links_link" to="/">Home</RouterLink>
        <RouterLink class="footer-content__links_link" to="/products"
          >Products</RouterLink
        >
        <RouterLink class="footer-content__links_link" to="/our-cafe"
          >Our Cafe</RouterLink
        >
        <RouterLink class="footer-content__links_link" to="/blog"
          >Blog</RouterLink
        >
        <RouterLink class="footer-content__links_link" to="/about"
          >About Us</RouterLink
        >
      </nav>
      <div class="footer-content__contact">
        <h4 class="footer-content__contact_title">CONTACT US</h4>
        <p>Any where, Any city,445533</p>
        <a href="tel:+919999988888" title="Call us">Call Us: +919999988888</a>
        <a href="mailto:example@gmail.com">example@gmail.com</a>
      </div>
    </div>
    <div class="footer__copy">
      <p>Copyright ©2023 LET’s TEA. All rights reserved.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #f5f2ef;
  padding: rem(50) rem(75) rem(30) rem(75);
  @media (max-width: $mobile) {
    padding: rem(30) rem(15);
  }

  &__copy {
    text-align: center;
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(20);
    color: #aa9f96;
  }
}
.footer-content {
  padding-bottom: rem(50);
  margin-bottom: rem(27);
  border-bottom: rem(1) solid #aa9f96;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1360px) {
    grid-template-columns: repeat(2, 1fr);
    gap: rem(40);
  }

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    place-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;
    max-width: rem(245);
    & img {
      width: rem(120);
      height: rem(120);
    }
    &_text {
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(40);
      margin-left: rem(10);
    }
  }
  &__subscribe {
    & > *:not(:last-child) {
      margin-bottom: rem(25);
    }
    @media (max-width: $mobile) {
      text-align: center;
    }
    &_title {
      font-size: rem(30);
      font-family: "Playfair Display";
      font-weight: bold;
      @media (max-width: $mobile) {
      }
    }
    &_field {
      display: flex;
      align-items: center;
      @media (max-width: $mobile) {
        flex-direction: column;
      }
      & > *:not(:last-child) {
        margin-right: rem(10);
      }
      & button {
        width: rem(149);
        height: rem(45);
        background-color: #2b231d;
        color: #fff;
        border-radius: rem(10);
        font-family: "DM Sans";
        font-weight: 400;
        font-size: rem(20);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.25s ease, transform 0.15s ease,
          box-shadow 0.15s ease;
        box-shadow: 0 6px 16px rgba(43, 35, 29, 0.25);

        &:hover {
          background-color: #3a2f27;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(43, 35, 29, 0.35);
        }

        &:active {
          transform: translateY(0);
          box-shadow: 0 4px 10px rgba(43, 35, 29, 0.2);
        }
      }
      & input {
        @include adaptive-value(width, 460, 149);
        height: rem(45);
        border-radius: rem(10);
        border: rem(1) solid #aa9f96;
        font-family: "DM Sans";
        font-size: rem(18);
        color: #2b231d;
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
          background-color 0.25s ease;
        @media (max-width: $mobile) {
          width: rem(290);
          margin-bottom: rem(10);
        }

        &:hover {
          border-color: #2b231d;
        }

        &:focus {
          border-color: #de6868;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(222, 104, 104, 0.25);
        }
      }
    }
    &_text {
      font-family: "DM Sans";
      font-size: rem(20);
      color: #000;
      @media (max-width: $mobile) {
        line-height: 1.2;
      }
    }
  }
  &__links {
    font-family: "DM Sans";
    font-size: rem(20);
    color: #2b231d;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > *:not(:last-child) {
      margin-bottom: rem(12);
    }
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
  }
  &__contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2b231d;
    text-align: center;
    & > *:not(:last-child) {
      margin-bottom: rem(23);
    }
    &_title {
      font-family: "DM Sans";
      font-size: rem(20);
      font-weight: bold;
    }
    & p {
      font-family: "DM Sans";
      font-size: rem(20);
      line-height: 1.2;
    }
    & a {
      font-family: "DM Sans";
      font-size: rem(20);
      &:hover {
        color: #de6868;
      }
    }
  }
}
</style>
