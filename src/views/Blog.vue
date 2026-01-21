<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useClickOutside } from "@/composables/useClickOutside.js";

import Search from "@/assets/images/search.svg";
import MaskGroup from "@/assets/images/mask-group.svg";
import RedArrow from "@/assets/images/blog/red-arrow-right.svg";
import ArrowCircle from "@/assets/images/arrow-circle.svg";
import DropArrow from "@/assets/images/blog/drop-arrow.svg";

import blogCards from "@/data/blog";
import vDa from "@/directives/v-da";

// --------------------
// SEARCH (Blog filter)
// --------------------
const searchWrapper = ref(null);
const searchQuery = ref("");
const isSearchOpen = ref(false);

// активный фильтр из поиска
const searchCategory = ref(null);

/**
 * Группировка по title + count
 */
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [];

  const query = searchQuery.value.toLowerCase();
  const map = new Map();

  blogCards.forEach((post) => {
    if (post.title.toLowerCase().includes(query)) {
      if (!map.has(post.title)) {
        map.set(post.title, { title: post.title, count: 0 });
      }
      map.get(post.title).count++;
    }
  });

  return Array.from(map.values());
});

/**
 * Выбор пункта из dropdown
 */
const selectSearchResult = (item) => {
  searchCategory.value = item.title;
  activeCategory.value = item.title; // синхронизация с категориями
  searchQuery.value = item.title;
  isSearchOpen.value = false;
  currentPage.value = 1;
};

/**
 * Закрытие dropdown
 */
useClickOutside(searchWrapper, () => {
  isSearchOpen.value = false;
});

/**
 * Очистка фильтра при очистке input
 */
watch(searchQuery, (value) => {
  if (!value) {
    searchCategory.value = null;
    activeCategory.value = "All";
  }
});

// --------------------
// Categories
// --------------------
const isCategoriesOpen = ref(false);
const activeCategory = ref("All");

const setCategory = (category) => {
  activeCategory.value = category;
  searchCategory.value = null;
  searchQuery.value = "";
  isCategoriesOpen.value = false;
};

// Текст на кнопке селекта
const selectedLabel = computed(() => {
  return activeCategory.value === "All"
    ? "Select Category"
    : activeCategory.value;
});

// ref для селекта
const selectRef = ref(null);

const handleClickOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isCategoriesOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// категории
const categories = computed(() => {
  return ["All", ...new Set(blogCards.map((post) => post.title))];
});

// --------------------
// Filtered posts
// --------------------
const filteredPosts = computed(() => {
  if (activeCategory.value === "All") return blogCards;
  return blogCards.filter((post) => post.title === activeCategory.value);
});

// --------------------
// Pagination
// --------------------
const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / itemsPerPage.value),
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPosts.value.slice(start, start + itemsPerPage.value);
});

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
  if (current === 1) return [1, 2, 3];
  if (current === total) return [total - 2, total - 1, total];
  return [current - 1, current, current + 1];
});

watch(activeCategory, () => {
  currentPage.value = 1;
});

// --------------------
// Recent posts
// --------------------
const recentPosts = computed(() => {
  return blogCards.slice(-2).reverse();
});
</script>

<template>
  <div class="blog">
    <!-- ================= SEARCH SECTION ================= -->
    <section class="blog__search">
      <img :src="MaskGroup" alt="Mask Group" />
      <h2>Blog Posts</h2>
      <p>
        Our blog is about slow mornings, fresh bread, and the aroma of coffee in
        the city air. We write about café life, street culture, new products in
        our shop, and everything that makes a simple cup of coffee special.
      </p>

      <div class="search" ref="searchWrapper">
        <img :src="Search" alt="Search Icon" />
        <input
          type="text"
          placeholder="Search"
          v-model="searchQuery"
          @focus="isSearchOpen = true"
        />

        <ul
          v-if="isSearchOpen && searchResults.length"
          class="search__dropdown"
        >
          <li
            v-for="item in searchResults"
            :key="item.title"
            class="search-dropdown__item"
            @click="selectSearchResult(item)"
          >
            <span>{{ item.title }}</span>
            <small>({{ item.count }})</small>
          </li>
        </ul>
      </div>
    </section>

    <!-- ================= CONTENT ================= -->
    <section class="blog__content blog-content">
      <div class="blog-content__wrapper">
        <!-- ---------------- Cards ---------------- -->
        <div class="blog-content__cards">
          <div class="blog__card" v-for="post in paginatedPosts" :key="post.id">
            <img :src="post.image" :alt="post.alt" />

            <h3>{{ post.title }}</h3>

            <p>{{ post.text }}</p>

            <button @click="$router.push(`/blog/${post.id}`)">
              Read More
              <img :src="RedArrow" alt="Red Arrow" />
            </button>
          </div>
        </div>

        <!-- ---------------- Sidebar ---------------- -->
        <aside class="blog-content__side blog-side">
          <!-- Categories Select -->
          <div
            v-da="'.blog-content__wrapper, 1024, first'"
            class="blog-side__select"
          >
            <h4>Categories</h4>

            <div class="blog-side__categories-select" ref="selectRef">
              <button
                class="blog-side__select-toggle"
                @click="isCategoriesOpen = !isCategoriesOpen"
                aria-haspopup="listbox"
                :aria-expanded="isCategoriesOpen"
              >
                <span class="blog-side__select-label">
                  {{ selectedLabel }}
                </span>

                <img
                  :src="DropArrow"
                  alt=""
                  class="blog-side__select-arrow"
                  :class="{
                    'blog-side__select-arrow--open': isCategoriesOpen,
                  }"
                />
              </button>

              <ul
                v-if="isCategoriesOpen"
                class="blog-side__select-menu"
                role="listbox"
              >
                <li
                  v-for="category in categories"
                  :key="category"
                  class="blog-side__select-option"
                  role="option"
                  @click="setCategory(category)"
                >
                  {{ category }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Recent Posts -->
          <div class="blog-side__recent-posts recent-posts">
            <img :src="MaskGroup" alt="Mask Group" />
            <h4>Recent Posts</h4>

            <div class="recent-posts__cards">
              <div
                class="recent-posts__card"
                v-for="post in recentPosts"
                :key="post.id"
              >
                <img :src="post.image" :alt="post.alt" />

                <h5>{{ post.title }}</h5>
                <p>{{ post.text }}</p>

                <button @click="$router.push(`/blog/${post.id}`)">
                  Read More
                  <img :src="RedArrow" alt="Red Arrow" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- ================= PAGINATION ================= -->
      <div class="blog__pagination">
        <!-- Left -->
        <button
          class="blog__pagination-left"
          :class="{ 'blog__pagination--disabled': currentPage === 1 }"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <img :src="ArrowCircle" alt="Pagination Arrow Left" />
        </button>

        <!-- Pages -->
        <button
          v-for="page in displayedPages"
          :key="page"
          class="blog__pagination-page_btn"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <!-- Right -->
        <button
          class="blog__pagination-right"
          :class="{
            'blog__pagination--disabled': currentPage === totalPages,
          }"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <img :src="ArrowCircle" alt="Pagination Arrow Right" />
        </button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.blog {
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
.search {
  @include adaptive-value(width, 711, 290);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include adaptive-value(gap, 12, 0);
  position: relative;
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

  & img {
    filter: invert(0.5);
    position: absolute;
    right: rem(16);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    opacity: 0.5;
    width: rem(24);
    height: rem(24);
  }

  &__dropdown {
    max-width: rem(237);
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;

    background: #fff;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    z-index: 20;

    max-height: rem(240);
    overflow-y: auto;

    // scrollbar (optional, nice touch)
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 3px;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s ease;

      &:not(:last-child) {
        border-bottom: 1px solid #f1f1f1;
      }

      &:hover {
        background: #f6f6f6;
      }
      & > *:not(:last-child) {
        margin-right: rem(5);
      }
    }
  }
}
// pagination
.blog {
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
// card
.blog {
  &__card {
    display: flex;
    flex-direction: column;
    color: #1e1e1e;
    font-family: "DM Sans";
    @include adaptive-value(width, 478, 150);
    & > *:not(:last-child) {
      @include adaptive-value(margin-bottom, 20, 10);
    }
    @media (max-width: rem(1024)) {
      align-items: center;
      text-align: center;
    }
    @media (max-width: $mobile) {
      @include adaptive-value(width, 478, 290);
    }

    & img {
      display: block;
      width: 100%;
      @include adaptive-value(height, 357, 130);
    }
    & h3 {
      font-weight: bold;
      font-size: rem(28);
    }

    & p {
      font-size: rem(20);
      flex: 1 1 auto;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 170%;
      @media (max-width: rem(1024)) {
        line-height: 130%;
      }
      @media (max-width: $mobile) {
        line-height: 110%;
      }
    }

    & button {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border: 1px solid #de6868;
      color: #de6868;
      background: transparent;

      border-radius: rem(10);
      width: rem(182);
      height: rem(50);

      font-weight: 600;
      font-size: rem(22);
      gap: rem(8);

      transition:
        background-color 0.3s ease,
        color 0.3s ease,
        transform 0.2s ease,
        box-shadow 0.3s ease;

      & img {
        width: rem(24);
        height: rem(24);
        transition: all 0.3s ease;
      }

      &:hover {
        background-color: #de6868;
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 rem(6) rem(18) rgba(222, 104, 104, 0.35);

        & img {
          transform: translateX(4px);
          filter: brightness(0) invert(1);
        }
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 rem(3) rem(10) rgba(222, 104, 104, 0.25);
      }
    }
  }
}
.blog-content {
  padding-left: rem(50);
  padding-right: rem(50);
  @include adaptive-value(padding-top, 169, 50);
  @include adaptive-value(padding-bottom, 169, 50);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f2ef;
  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-around;
    @include adaptive-value(margin-bottom, 180, 50);
    @include adaptive-value(gap, 20, 0);
    @media (max-width: rem(1024)) {
      flex-direction: column;
      align-items: center;
    }
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @include adaptive-value(gap, 40, 20);
    @media (max-width: rem(1024)) {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  }
}
// Select
.blog-side {
  @include adaptive-value(width, 478, 290);
  @media (max-width: rem(1024)) {
    display: none;
  }
  & > *:not(:last-child) {
    @include adaptive-value(margin-bottom, 40, 30);
  }
  &__select {
    padding: rem(25) rem(30);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: rem(15);
    border-radius: rem(10);
    background-color: #cfbcae;
    @media (max-width: rem(1024)) {
      width: rem(290);
      @include adaptive-value(margin-bottom, 50, 20);
    }
    @media (max-width: $mobile) {
      @include adaptive-value(width, 478, 290);
    }
    & > *:not(:last-child) {
      margin-bottom: rem(15);
    }
    & h4 {
      text-transform: uppercase;
      font-family: "Playfair Display";
      font-weight: bold;
      font-size: rem(25);
    }
  }
  &__categories-select {
    position: relative;
    width: 100%;
  }
  &__select-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: rem(10);
    padding: rem(12) rem(20);
    background-color: #fff;
  }
  &__select-label {
    font-family: "DM Sans";
    font-size: rem(22);
    color: #2b231d;
  }
  &__select-arrow {
    transition: transform 0.3s ease;
    &--open {
      transform: rotate(180deg);
    }
  }
  &__select-menu {
    position: absolute;
    top: calc(100% + rem(1));
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: rem(10);
    box-shadow: 0 rem(10) rem(25) rgba(0, 0, 0, 0.08);
    z-index: 10;
  }
  &__select-option {
    font-family: "DM Sans";
    font-size: rem(18);
    color: #2b231d;
    padding: rem(12) rem(16);
    cursor: pointer;
    font-size: rem(16);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(222, 104, 104, 0.08);
    }
  }
}
// Recent-posts
.recent-posts {
  padding: rem(20) rem(30);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: rem(2) solid #cfbcae;
  border-radius: rem(10);
  & img {
    width: rem(147);
  }
  & h4 {
    font-family: "Playfair Display";
    font-weight: bold;
    font-size: rem(28);
  }
  &__cards {
    margin-top: rem(35);
    max-width: rem(417);
    & > *:not(:last-child) {
      margin-bottom: rem(30);
    }
  }
  &__card {
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: rem(15);
    }
    & img {
      display: block;
      width: 100%;
    }
    & h5 {
      font-family: "DM Sans";
      font-weight: bold;
      font-size: rem(24);
      color: #1e1e1e;
    }
    & p {
      font-family: "DM Sans";
      font-size: rem(15);
      color: #1e1e1e;
      line-height: 170%;
      flex: 1 1 auto;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media (max-width: $mobile) {
        line-height: 120%;
      }
    }
    & button {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border: 1px solid #de6868;
      color: #de6868;
      background: transparent;

      border-radius: rem(10);
      width: rem(159);
      height: rem(43);

      font-weight: 600;
      font-size: rem(18);
      gap: rem(8);

      transition:
        background-color 0.3s ease,
        color 0.3s ease,
        transform 0.2s ease,
        box-shadow 0.3s ease;

      & img {
        width: rem(20);
        height: rem(20);
        transition: all 0.3s ease;
      }

      &:hover {
        background-color: #de6868;
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 rem(6) rem(18) rgba(222, 104, 104, 0.35);

        & img {
          transform: translateX(4px);
          filter: brightness(0) invert(1);
        }
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 rem(3) rem(10) rgba(222, 104, 104, 0.25);
      }
    }
  }
}
</style>
