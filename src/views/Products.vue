<script setup>
import { ref, computed } from "vue";

import MaskGroup from "@/assets/images/home/mask-group.svg";
import Search from "../components/Search.vue";
import Chevron from "@/assets/images/products/chevron.svg";
import Cart from "@/assets/images/products/cart.svg";
import ArrowCircle from "@/assets/images/products/arrow-circle.svg";

import products from "../data/products.js";

// --------------------
// Фильтры
// --------------------
const nameFilter = ref("All"); // All, Wafers, Bread, Chocolates
const priceFilter = ref("all"); // all, low, medium, high
const sortOrder = ref(null); // asc | desc
const isOpen = ref(false);

// --------------------
// Пагинация
// --------------------
const currentPage = ref(1);
const itemsPerPage = ref(12);

// --------------------
// Корзина
// --------------------
const cart = ref([]);

const isCheckoutOpen = ref(false);
const isPlacingOrder = ref(false);
const isOrderSuccess = ref(false);

// --------------------
// Фильтр + сортировка
// --------------------
const filteredProducts = computed(() => {
  return products
    .filter((product) => {
      if (nameFilter.value === "All") return true;
      if (nameFilter.value === "Wafers") return product.name.includes("Wafers");
      if (nameFilter.value === "Bread") return product.name.includes("Bread");
      if (nameFilter.value === "Chocolates")
        return product.name.includes("Chocolates");
    })
    .filter((product) => {
      if (priceFilter.value === "all") return true;
      if (priceFilter.value === "low") return product.price < 4;
      if (priceFilter.value === "medium")
        return product.price >= 4 && product.price <= 7;
      if (priceFilter.value === "high") return product.price > 7;
    });
});

const sortedProducts = computed(() => {
  if (!sortOrder.value) return filteredProducts.value;
  return [...filteredProducts.value].sort((a, b) => {
    return sortOrder.value === "asc" ? a.price - b.price : b.price - a.price;
  });
});

// --------------------
// Пагинация
// --------------------
const totalPages = computed(() =>
  Math.ceil(sortedProducts.value.length / itemsPerPage.value)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sortedProducts.value.slice(start, start + itemsPerPage.value);
});

// --------------------
// Смена сортировки
// --------------------
const setSort = (order) => {
  sortOrder.value = order;
  isOpen.value = false;
};

// raiting
import { useRating } from "@/composables/useRating";

// Подключаем рейтинг
useRating(); // по умолчанию ищет все элементы с классом .rating

// --------------------
// Корзина
// --------------------
/* Добавить в корзину */
const addToCart = (product) => {
  const item = cart.value.find((i) => i.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cart.value.push({
      ...product,
      quantity: 1,
    });
  }
};

/* Увеличить количество */
const increaseQty = (id) => {
  const item = cart.value.find((i) => i.id === id);
  if (item) item.quantity++;
};

/* Уменьшить количество */
const decreaseQty = (id) => {
  const item = cart.value.find((i) => i.id === id);
  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(id);
  }
};

/* Удалить товар */
const removeFromCart = (id) => {
  cart.value = cart.value.filter((i) => i.id !== id);
};

/* Общая сумма */
const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});
/* checkout */
const checkout = () => {
  if (!cart.value.length) return;
  isCheckoutOpen.value = true;
};

// подтверждение заказа
const placeOrder = () => {
  if (!cart.value.length) return;

  // закрываем первую модалку
  isCheckoutOpen.value = false;

  // очищаем корзину
  cart.value = [];

  // показываем вторую модалку
  isOrderSuccess.value = true;

  // через 1.5 секунды скрываем сообщение
  setTimeout(() => {
    isOrderSuccess.value = false;
  }, 1500);
};
</script>

<template>
  <div class="products">
    <!-- Search / Header -->
    <div class="products__search products-search">
      <img :src="MaskGroup" alt="Mask Group" />
      <h2>Products</h2>
      <p>
        Explore our selection of freshly brewed coffee, fine teas, rich
        chocolate, and freshly baked bread. Find your favorite treats here!
      </p>
      <div>
        <Search />
      </div>
    </div>

    <!-- E-shop -->
    <div class="products__e-shop products-e-shop">
      <div class="products-e-shop__wrapper">
        <div class="products-e-shop__shop-header">
          <!-- Sort Dropdown -->
          <div class="products-e-shop__sort">
            <button
              class="products-e-shop__sort-toggle"
              @click="isOpen = !isOpen"
              aria-haspopup="listbox"
              :aria-expanded="isOpen"
            >
              <span class="products-e-shop__sort-label">Sort by</span>
              <img
                :src="Chevron"
                alt=""
                class="products-e-shop__sort-arrow"
                :class="{ 'products-e-shop__sort-arrow--open': isOpen }"
              />
            </button>

            <ul v-if="isOpen" class="products-e-shop__sort-menu" role="listbox">
              <li
                class="products-e-shop__sort-option"
                role="option"
                @click="setSort('asc')"
              >
                Price: Low to High
              </li>
              <li
                class="products-e-shop__sort-option"
                role="option"
                @click="setSort('desc')"
              >
                Price: High to Low
              </li>
            </ul>
          </div>

          <!-- Results -->
          <div class="products-e-shop__results">
            <p class="products-e-shop__results-current">
              {{ paginatedProducts.length }}
            </p>
            <span class="products-e-shop__results-separator">of</span>
            <p class="products-e-shop__results-total">
              {{ sortedProducts.length }}
            </p>
            <span class="products-e-shop__results-text">results</span>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="products-e-shop__grid">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="products-e-shop__card"
          >
            <!-- Изображение карточки -->
            <div class="products-e-shop__card-image">
              <img :src="product.image" :alt="product.alt" />
            </div>

            <!-- Название и вес -->
            <h3 class="products-e-shop__card-name">
              {{ product.name }} {{ product.weight }}
            </h3>

            <!-- Рейтинг -->
            <div class="products-e-shop__card-rating rating rating_set">
              <div class="rating__body">
                <div class="rating__active"></div>

                <div class="rating__items">
                  <input type="radio" class="rating__item" value="1" />
                  <input type="radio" class="rating__item" value="2" />
                  <input type="radio" class="rating__item" value="3" />
                  <input type="radio" class="rating__item" value="4" />
                  <input type="radio" class="rating__item" value="5" />
                </div>
              </div>

              <div class="rating__value">3</div>
            </div>

            <!-- Цена -->
            <p class="products-e-shop__card-price">
              ${{ product.price.toFixed(2) }}
            </p>

            <!-- Кнопка добавления в корзину -->
            <button
              class="products-e-shop__card-button"
              @click="addToCart(product)"
            >
              <img
                :src="Cart"
                alt="Cart Icon"
                class="products-e-shop__card-button-icon"
              />
              <span class="products-e-shop__card-button-text">Add to Cart</span>
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div class="products-e-shop__pagination">
          <button
            class="products-e-shop__pagination-left"
            :class="{
              'products-e-shop__pagination--disabled': currentPage === 1,
            }"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <img :src="ArrowCircle" alt="Pagination Arrow Left" />
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="products-e-shop__pagination-page_btn"
            :class="{ active: page === currentPage }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button
            class="products-e-shop__pagination-right"
            :class="{
              'products-e-shop__pagination--disabled':
                currentPage === totalPages,
            }"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <img :src="ArrowCircle" alt="Pagination Arrow Right" />
          </button>
        </div>
      </div>

      <div class="products-e-shop__side">
        <!-- Filters -->
        <div class="products-e-shop__filter">
          <div class="products-e-shop__filter_title">Filter</div>
          <!-- Name Filter -->
          <div class="products-e-shop__filter-names">
            <div class="products-e-shop__filter-names_title">By Names</div>
            <div class="products-e-shop__filter-names-buttons">
              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active': nameFilter === 'All',
                }"
                @click="nameFilter = 'All'"
              >
                All
              </button>

              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active':
                    nameFilter === 'Wafers',
                }"
                @click="nameFilter = 'Wafers'"
              >
                Wafers
              </button>

              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active': nameFilter === 'Bread',
                }"
                @click="nameFilter = 'Bread'"
              >
                Bread
              </button>

              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active':
                    nameFilter === 'Chocolates',
                }"
                @click="nameFilter = 'Chocolates'"
              >
                Chocolates
              </button>
            </div>
          </div>

          <!-- Price Filter -->
          <div class="products-e-shop__filter-price">
            <div class="products-e-shop__filter-price_title">By Price</div>
            <div class="products-e-shop__filter-price-buttons">
              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active': priceFilter === 'all',
                }"
                @click="priceFilter = 'all'"
              >
                All Prices
              </button>

              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active': priceFilter === 'low',
                }"
                @click="priceFilter = 'low'"
              >
                Low
              </button>

              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active':
                    priceFilter === 'medium',
                }"
                @click="priceFilter = 'medium'"
              >
                Medium
              </button>

              <button
                class="products-e-shop__filter-btn"
                :class="{
                  'products-e-shop__filter-btn--active': priceFilter === 'high',
                }"
                @click="priceFilter = 'high'"
              >
                High
              </button>
            </div>
          </div>
        </div>
        <!-- Cart -->
        <div class="products-e-shop__cart">
          <div class="products-e-shop__cart_title">Cart</div>

          <!-- BODY -->
          <div class="products-e-shop__cart_body">
            <div
              v-for="item in cart"
              :key="item.id"
              class="products-e-shop__cart-item"
            >
              <!-- image -->
              <div class="products-e-shop__cart-item-image">
                <img :src="item.image" :alt="item.alt" />
                <!-- remove -->
                <button
                  class="products-e-shop__cart-item-remove"
                  @click="removeFromCart(item.id)"
                >
                  ✕
                </button>
              </div>

              <!-- info -->
              <div class="products-e-shop__cart-item-info">
                <div class="products-e-shop__cart-item-name">
                  {{ item.name }}
                </div>
                <div class="products-e-shop__cart-item-price">
                  ${{ item.price.toFixed(2) }}
                </div>
                <!-- quantity -->
                <div class="products-e-shop__cart-item-qty">
                  <button
                    class="products-e-shop__cart-item-qty_btn"
                    @click="decreaseQty(item.id)"
                  >
                    −
                  </button>
                  <span class="products-e-shop__cart-item-qty_quantity">{{
                    item.quantity
                  }}</span>
                  <button
                    class="products-e-shop__cart-item-qty_btn"
                    @click="increaseQty(item.id)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <!-- empty -->
            <div v-if="!cart.length" class="products-e-shop__cart-empty">
              Cart is empty
            </div>
          </div>

          <!-- TOTAL -->
          <div class="products-e-shop__cart_total">
            <span>Total:</span>
            <strong>${{ cartTotal.toFixed(2) }}</strong>
          </div>

          <!-- BUTTON -->

          <button
            class="products-e-shop__cart_button"
            @click="checkout"
            :disabled="!cart.length"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isCheckoutOpen"
    class="checkout-modal"
    @click.self="isCheckoutOpen = false"
  >
    <div class="checkout-modal__content">
      <!-- Close -->
      <button class="checkout-modal__close" @click="isCheckoutOpen = false">
        ✕
      </button>

      <!-- Title -->
      <h3 class="checkout-modal__title">Order summary</h3>

      <!-- Cart items -->
      <div class="checkout-modal__items">
        <div v-for="item in cart" :key="item.id" class="checkout-modal__item">
          <img :src="item.image" :alt="item.alt" />
          <div>
            <p>{{ item.name }}</p>
            <span>x{{ item.quantity }}</span>
          </div>
          <strong>${{ (item.price * item.quantity).toFixed(2) }}</strong>
        </div>
      </div>

      <!-- Total -->
      <div class="checkout-modal__total">
        <span>Total:</span>
        <strong>${{ cartTotal.toFixed(2) }}</strong>
      </div>

      <!-- Actions -->
      <button
        class="checkout-modal__confirm"
        :disabled="isPlacingOrder"
        @click="placeOrder"
      >
        <span v-if="!isPlacingOrder">Confirm order</span>
        <span v-else>Placing order...</span>
      </button>
    </div>
  </div>
  <!-- Success -->
  <div v-if="isOrderSuccess" class="products-e-shop__order-success">
    ✅ Order placed successfully!
  </div>
</template>

<style lang="scss" scoped>
.products-e-shop__order-success {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #d4edda;
  color: #155724;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1100;
}
.products-search {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f8f9fa;
  @include adaptive-value(padding-top, 150, 50);
  @include adaptive-value(padding-bottom, 150, 50);
  @include adaptive-value(padding-left, 230, 15);
  @include adaptive-value(padding-right, 230, 15);
  text-align: center;
  & > *:not(:last-child) {
    @include adaptive-value(margin-bottom, 40, 20);
  }

  & img {
    @include adaptive-value(width, 308, 290);
  }
  & h2 {
    font-family: "Playfair Display";
    font-weight: bold;
    @include adaptive-value(font-size, 100, 40);
    color: #2b231d;
  }
  & p {
    font-family: "DM Sans";
    font-size: rem(22);
    color: #1e1e1e;
    max-width: rem(860);
    line-height: 160%;
    @media (max-width: $mobile) {
      line-height: 120%;
    }
  }
}

.products-e-shop {
  display: flex;
  justify-content: space-between;
  @include adaptive-value(padding-top, 50, 40);
  @include adaptive-value(padding-bottom, 50, 40);
  @include adaptive-value(padding-left, 80, 15);
  @include adaptive-value(padding-right, 40, 15);

  // упоковка для сортировки товаров и пагинации
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 60, 30);
    }
  }
  // боковая панел
  &__side {
    @include adaptive-value(width, 400, 290);
    & > *:not(:last-child) {
      margin-bottom: rem(50);
    }
  }

  //фильтры
  &__filter {
    @include adaptive-value(padding-top, 25, 15);
    @include adaptive-value(padding-bottom, 25, 15);
    @include adaptive-value(padding-left, 25, 15);
    @include adaptive-value(padding-right, 25, 15);
    background-color: #f4f5f6;
    border-radius: rem(10);
    & > *:not(:last-child) {
      margin-bottom: rem(20);
    }
    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(25);
      text-align: center;
    }
  }
  &__filter-names {
    &_title {
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(15);
      color: #de6868;
      border-bottom: 1px solid #d9d9d9;
      margin-bottom: rem(10);
    }
  }
  &__filter-names-buttons {
    display: inline-flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: rem(10);
    }
  }
  &__filter-btn {
    background-color: #fff;
    color: #000;
    padding: rem(5);
    border-radius: rem(3);
  }
  &__filter-btn--active {
    background-color: #de6868;
    color: #fff;
    padding: rem(5);
    border-radius: rem(3);
  }
  &__filter-price {
    &_title {
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(15);
      color: #de6868;
      border-bottom: 1px solid #d9d9d9;
      margin-bottom: rem(10);
    }
  }
  &__filter-price-buttons {
    display: inline-flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: rem(10);
    }
  }
  &__shop-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: rem(60);
  }

  &__sort {
    position: relative;
    display: inline-block;
  }

  &__sort-toggle {
    background-color: #fff;
    border: 1px solid #de6868;
    padding: rem(7) rem(15);

    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-radius: 6px;
    background: #fff;
    & img {
      margin-top: rem(5);
    }
  }

  &__sort-label {
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(25);
    color: #de6868;
  }

  &__sort-arrow {
    transition: transform 0.2s ease;
  }

  &__sort-arrow--open {
    transform: rotate(180deg);
  }

  &__sort-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: max-content;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    list-style: none;
    padding: 0;
    font-family: "DM Sans";
    color: #1e1e1e;
    & > *:not(:last-child) {
      margin-bottom: rem(5);
    }
  }

  &__sort-option {
    padding: rem(5) rem(8);
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }

  //Корзина
  &__cart {
    @include adaptive-value(padding-top, 25, 15);
    @include adaptive-value(padding-bottom, 25, 15);
    @include adaptive-value(padding-left, 25, 15);
    @include adaptive-value(padding-right, 25, 15);
    background-color: #f4f5f6;
    border-radius: rem(10);
    display: flex;
    align-items: center;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: rem(15);
    }
    &_title {
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(25);
      color: #2b231d;
    }
    &_body {
      width: 100%;
      & > *:not(:last-child) {
        margin-bottom: rem(15);
      }
    }
    &_total {
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(20);
      color: #d74544;
    }
    &_button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: 1px solid #d74544;
      padding: rem(10) rem(15);
      border-radius: rem(3);
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(20);
      color: #d74544;
      background-color: transparent;
      transition: all 0.2s ease;

      &:hover {
        background-color: #e4e4e4;
        box-shadow: 0 4px 10px rgba(#d74544, 0.3);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 5px rgba(#d74544, 0.2);
      }
    }
  }
  &__cart-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e5e8eb;
    padding: rem(20) rem(40);
    border-radius: rem(10);
  }
  &__cart-item-remove {
    position: absolute;
    color: #d74544;
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(15);
    background-color: transparent;
    top: rem(0);
    left: rem(0);
    z-index: 2;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
  &__cart-item-image {
    position: relative;
    width: rem(110);
    height: rem(144);
    display: grid;
    place-items: center;
    overflow: hidden; // ← ВАЖНО

    & img {
      width: 100%;
      display: block;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.08);
    }
  }

  &__cart-item-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(15);
    & > *:not(:last-child) {
      margin-bottom: rem(10);
    }
  }

  &__cart-item-price {
    color: #d74544;
  }
  &__cart-item-qty_btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: rem(5);
    border-radius: rem(5);
    background-color: #fff;
  }
  &__cart-item-qty_quantity {
    color: #d74544;
    margin: 0 rem(8);
  }

  &__results {
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(30);
    display: flex;
    align-items: center;
  }
  // карточки
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    @include adaptive-value(width, 400, 290);

    & > *:not(:last-child) {
      margin-bottom: rem(15);
    }
  }
  &__card-image {
    height: rem(400);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f5f6;
  }

  &__card-name {
    font-family: "DM Sans";
    font-weight: bold;
    @include adaptive-value(font-size, 30, 20);
  }

  &__card-price {
    font-family: "DM Sans";
    font-weight: bold;
    @include adaptive-value(font-size, 20, 18);
    flex: 1 1 auto;
  }

  &__card-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #d74544;
    padding: rem(10) rem(15);
    border-radius: rem(3);
    background-color: #fff;
    color: #d74544;
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(20);
    transition: all 0.2s ease;

    & > *:not(:last-child) {
      margin-right: rem(15);
    }

    &:hover {
      background-color: #e4e4e4;
      box-shadow: 0 4px 10px rgba(#d74544, 0.3);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(#d74544, 0.2);
    }
  }

  &__pagination {
    display: inline-flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: rem(30);
    }
  }
  &__pagination-right {
    background-color: transparent;
    & img {
      transform: rotate(180deg);
    }
  }
  &__pagination-left {
    background-color: transparent;
  }
  &__pagination-page {
    &_btn {
      width: rem(60);
      height: rem(60);
      border-radius: rem(10);
      color: #fff;
      background-color: #e4e4e4;
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(25);
    }
  }
  &__pagination--disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
}

// активная кнопка пагинации
.active {
  width: rem(60);
  height: rem(60);
  border-radius: rem(10);
  color: #fff;
  background-color: #2b231d;
  font-family: "DM Sans";
  font-weight: bold;
  font-size: rem(25);
}
//raiting
.rating {
  display: inline-flex;
  align-items: center;
  font-size: 0;

  &__body {
    position: relative;
    width: rem(120);
    height: rem(24);
    background: url("@/assets/images/products/star-empty.svg") repeat-x;
    background-size: 24px 24px;
  }

  &__active {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: url("@/assets/images/products/star-filled.svg") repeat-x;
    background-size: rem(24) rem(24);
    pointer-events: none;
  }

  &__items {
    position: absolute;
    inset: 0;
    display: flex;
  }

  &__item {
    flex: 0 0 20%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }

  &__value {
    display: none;
  }
}

.checkout-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;

  &__content {
    height: 80vh;
    @include adaptive-value(padding-top, 30, 15);
    @include adaptive-value(padding-bottom, 30, 15);
    @include adaptive-value(padding-left, 30, 15);
    @include adaptive-value(padding-right, 30, 15);
    background: #fff;
    @include adaptive-value(width, 420, 290);
    padding: rem(30);
    border-radius: rem(12);
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__items {
    flex: 1 1 auto; // растягивается
    overflow-y: auto;
    margin: rem(20) 0;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d74544;
      border-radius: 10px;
    }
  }

  &__close {
    position: absolute;
    top: rem(10);
    right: rem(10);
    background: none;
    border: none;
    color: #d74544;
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(18);
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.2);
    }
  }

  &__title {
    font-family: "Playfair Display";
    font-weight: bold;
    font-size: rem(25);
    color: #2b231d;
  }

  &__item {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    & img {
      max-width: rem(200);
    }
    & p {
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(18);
    }
    & span {
      display: block;
      margin: rem(5) 0;
    }
  }

  &__total {
    color: #d74544;
  }

  &__confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #d74544;
    margin-top: rem(20);
    padding: rem(5) rem(10);
    border-radius: rem(3);
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(20);
    color: #d74544;
    background-color: transparent;
    transition: all 0.2s ease;

    &:hover {
      background-color: #e4e4e4;
      box-shadow: 0 4px 10px rgba(#d74544, 0.3);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(#d74544, 0.2);
    }
  }

  &__success {
    margin-top: rem(15);
    color: green;
    font-weight: bold;
    text-align: center;
  }
}
</style>
