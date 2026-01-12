<script setup>
import { RouterLink, RouterView } from "vue-router";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="wrapper">
    <Header />

    <div class="main">
      <router-view />
    </div>

    <Footer />
  </div>
</template>
