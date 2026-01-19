<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const postId = route.params.id;

// Можно найти нужный пост по id
import blogCards from "@/data/blog";
const post = blogCards.find((p) => p.id == postId);
</script>

<template>
  <div class="blog-post">
    <h1>Current Post</h1>
    <h2>{{ post.title }}</h2>
    <img :src="post.image" :alt="post.alt" />
    <p>{{ post.text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.blog-post {
  @include adaptive-value(padding-top, 150, 50);
  @include adaptive-value(padding-bottom, 150, 50);
  @include adaptive-value(padding-left, 50, 15);
  @include adaptive-value(padding-right, 50, 15);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1e1e1e;
  & > *:not(:last-child) {
    @include adaptive-value(margin-bottom, 30, 20);
  }
  & h1 {
    font-family: "Playfair Display";
    font-weight: bold;
    @include adaptive-value(font-size, 100, 40);
  }
  & H2 {
    font-family: "Playfair Display";
    font-weight: bold;
    @include adaptive-value(font-size, 70, 25);
  }
  & img {
    display: block;
    @include adaptive-value(width, 478, 290);
  }
  & p {
    font-family: "DM Sans";
    font-size: rem(20);
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
</style>
