<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

// --------------------
// Импорты компонентов и изображений
// --------------------
import MaskGroup from "@/assets/images/home/mask-group.svg";
import Search from "../components/Search.vue";
import Chevron from "@/assets/images/products/chevron.svg";
import Cart from "@/assets/images/products/cart.svg";
import ArrowCircle from "@/assets/images/products/arrow-circle.svg";

// --------------------
// Данные
// --------------------
import products from "../data/products.js";

// --------------------
// Директивы
// --------------------
import vDa from "@/directives/v-da";

// --------------------
// --------------------
// FILTER / SORTING
// --------------------
// --------------------
const nameFilter = ref("All"); // All, Wafers, Bread, Chocolates
const priceFilter = ref("all"); // all, low, medium, high
const sortOrder = ref(null); // asc | desc
const isOpen = ref(false);
const isFilterOpen = ref(false);

onMounted(() => {
  const handleClickOutside = (e) => {
    const dropdown = document.querySelector(
      ".products-e-shop__adaptive-filter-dropdown"
    );
    const button = document.querySelector(
      ".products-e-shop__adaptive-filter_btn"
    );
    if (
      dropdown &&
      !dropdown.contains(e.target) &&
      !button.contains(e.target)
    ) {
      isFilterOpen.value = false;
    }
  };

  document.addEventListener("click", handleClickOutside);

  // Очистка слушателя при размонтировании компонента
  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});

// Фильтрация продуктов
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

// Сортировка продуктов
const sortedProducts = computed(() => {
  if (!sortOrder.value) return filteredProducts.value;
  return [...filteredProducts.value].sort((a, b) => {
    return sortOrder.value === "asc" ? a.price - b.price : b.price - a.price;
  });
});

// Функция для смены сортировки
const setSort = (order) => {
  sortOrder.value = order;
  isOpen.value = false;
};

// --------------------
// PAGINATION
// --------------------
const currentPage = ref(1);
const itemsPerPage = ref(12);

// Общее количество страниц
const totalPages = computed(() =>
  Math.ceil(sortedProducts.value.length / itemsPerPage.value)
);

// Продукты для текущей страницы
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sortedProducts.value.slice(start, start + itemsPerPage.value);
});

// Массив страниц для отображения максимум 3
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 3) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current === 1) return [1, 2, 3];
  if (current === total) return [total - 2, total - 1, total];
  return [current - 1, current, current + 1];
});

// Следим за изменением фильтра и сортировки, чтобы корректировать текущую страницу
watch([filteredProducts, sortedProducts], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

// --------------------
// RATING
// --------------------
import { useRating } from "@/composables/useRating";
useRating(); // автоматически ищет все элементы с классом .rating

// --------------------
// CART / CHECKOUT
// --------------------
const cart = ref([]);

const isCheckoutOpen = ref(false);
const isPlacingOrder = ref(false);
const isOrderSuccess = ref(false);
const isCart = ref(false);

// Общее количество товаров в корзине
const cartCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0);
});

// Добавление товара в корзину
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

// Изменение количества товара
const increaseQty = (id) => {
  const item = cart.value.find((i) => i.id === id);
  if (item) item.quantity++;
};

const decreaseQty = (id) => {
  const item = cart.value.find((i) => i.id === id);
  if (!item) return;
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(id);
  }
};

// Удаление товара из корзины
const removeFromCart = (id) => {
  cart.value = cart.value.filter((i) => i.id !== id);
};

// Общая сумма корзины
const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// Открытие окна оформления заказа
const checkOut = () => {
  if (!cart.value.length) return;
  isCheckoutOpen.value = true;
};

// Открытие корзины
const cartOpen = () => {
  if (!cart.value.length) return;
  isCart.value = true;
};

// Размещение заказа
const placeOrder = () => {
  if (!cart.value.length) return;

  isCart.value = false;
  isCheckoutOpen.value = false;
  cart.value = [];
  isOrderSuccess.value = true;

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
          </div>
        </div>

        <div class="products-e-shop__adaptive-filter">
          <button
            class="products-e-shop__adaptive-filter_btn"
            @click="isFilterOpen = !isFilterOpen"
          >
            Filter
          </button>

          <!-- Filter dropdown -->
          <div
            class="products-e-shop__adaptive-filter-dropdown"
            v-if="isFilterOpen"
          >
            <!-- Filter by Name -->
            <div class="filter-section">
              <h4>By Name</h4>
              <button @click="nameFilter = 'All'">All</button>
              <button @click="nameFilter = 'Wafers'">Wafers</button>
              <button @click="nameFilter = 'Bread'">Bread</button>
              <button @click="nameFilter = 'Chocolates'">Chocolates</button>
            </div>

            <!-- Filter by Price -->
            <div class="filter-section">
              <h4>By Price</h4>
              <button @click="priceFilter = 'all'">All</button>
              <button @click="priceFilter = 'low'">Low</button>
              <button @click="priceFilter = 'medium'">Medium</button>
              <button @click="priceFilter = 'high'">High</button>
            </div>
            <!-- Sort -->
            <div class="filter-section">
              <h4>Sort by Price</h4>
              <button @click="setSort('asc')">Low to High</button>
              <button @click="setSort('desc')">High to Low</button>
            </div>
          </div>

          <div class="products-e-shop__adaptive-cart">
            <button
              class="products-e-shop__adaptive-cart_btn"
              @click="cartOpen"
            >
              <img :src="Cart" alt="Cart" />
            </button>
            <span>
              {{ cartCount }}
            </span>
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
          <!-- Кнопка влево -->
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

          <!-- Цифровые кнопки -->
          <button
            v-for="page in displayedPages"
            :key="page"
            class="products-e-shop__pagination-page_btn"
            :class="{ active: page === currentPage }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <!-- Кнопка вправо -->
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
        <div class="modal" v-show="isCart" @click.self="isCart = false"></div>
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
        <div class="products-e-shop__cart" v-da="'.modal, 1576, first'">
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
            @click="checkOut"
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
.products-e-shop {
  display: flex;
  justify-content: space-between;
  @include adaptive-value(padding-top, 50, 40);
  @include adaptive-value(padding-bottom, 50, 40);
  @include adaptive-value(padding-left, 80, 15);
  @include adaptive-value(padding-right, 40, 15);
  gap: rem(20);

  @media (max-width: rem(1576)) {
    @include adaptive-value(padding-right, 80, 15);
  }
  //Packaging for product sorting and pagination
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 60, 30);
    }
  }
  // side bar
  &__side {
    @include adaptive-value(width, 400, 290);
    & > *:not(:last-child) {
      margin-bottom: rem(50);
    }
    @media (max-width: rem(1576)) {
      display: none;
    }
  }
}
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: rem(0) rem(15);
}
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
//block search
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
//shop-header
.products-e-shop {
  &__shop-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: rem(60);
    @media (max-width: rem(1576)) {
      display: none;
    }
  }
}
//sort
.products-e-shop {
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
}
//results numbers of pagination
.products-e-shop {
  &__results {
    font-family: "DM Sans";
    font-weight: bold;
    font-size: rem(30);
    display: flex;
    align-items: center;
  }
  &__results-separator {
    margin: 0 rem(10);
  }
}
//adaptive filter
.products-e-shop {
  &__adaptive-cart {
    position: relative;
    &_btn {
      background-color: transparent;
    }
  }
  &__adaptive-filter {
    position: relative;
    display: none;
    @media (max-width: rem(1576)) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      &_btn {
        @include adaptive-value(width, 238, 220);
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
      }
    }

    & img {
      cursor: pointer;
      width: rem(50);
      height: rem(50);
      &:hover {
        scale: 1.2;
      }
    }
    & span {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: rem(25);
      height: rem(25);
      font-family: "DM Sans";
      font-weight: bold;
      top: 0;
      right: -5px;
      background-color: #d74544;
      color: #fff;
      border-radius: 50%;
      padding: rem(2);
    }
  }
}
.products-e-shop__adaptive-filter-dropdown {
  @include adaptive-value(width, 238, 220);
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: rem(6);
  padding: rem(10);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: rem(10);
  font-family: "DM Sans";

  .filter-section {
    display: flex;
    flex-direction: column;
    gap: rem(5);

    h4 {
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(14);
      color: #de6868;
    }

    button {
      padding: rem(5);
      border-radius: rem(3);
      border: none;
      background: #f4f5f6;
      cursor: pointer;

      &:hover {
        background: #e4e4e4;
      }
    }
  }
}
//card
.products-e-shop {
  &__grid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: rem(20);
    @media (max-width: rem(1576)) {
      @include adaptive-value(gap, 40, 20);
    }
    @media (max-width: rem(1024)) {
      justify-content: space-around;
    }
    @media (max-width: $mobile) {
      display: grid;
      grid-template-columns: 1fr;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    @include adaptive-value(width, 400, 205);
    @media (max-width: rem(1024)) {
      @include adaptive-value(width, 400, 290);
    }

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
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
//pagination
.products-e-shop {
  &__pagination {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    @include adaptive-value(width, 400, 290);
    & img {
      @include adaptive-value(width, 60, 40);
      @include adaptive-value(height, 60, 40);
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
      @include adaptive-value(width, 60, 40);
      @include adaptive-value(height, 60, 40);
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
// active pagination button
.active {
  @include adaptive-value(width, 60, 40);
  @include adaptive-value(height, 60, 40);
  border-radius: rem(10);
  color: #fff;
  background-color: #2b231d;
  font-family: "DM Sans";
  font-weight: bold;
  font-size: rem(25);
}
//checkout modal
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
    flex: 1 1 auto;
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
//filter
.products-e-shop {
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
}
//cart
.products-e-shop {
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
      @media (max-width: rem(1576)) {
        flex: 1;
        overflow-y: auto;
        padding-right: rem(6);

        &::-webkit-scrollbar {
          width: rem(5);
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: rem(4);
        }
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
    @media (max-width: rem(1576)) {
      background: #fff;
      width: 100%;
      max-width: rem(420);
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      border-radius: rem(12);
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
    overflow: hidden;

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

  &__cart-empty {
    font-family: "Playfair Display";
    font-weight: bold;
    font-size: rem(18);
    color: #2b231d;
    text-align: center;
  }
}
</style>
