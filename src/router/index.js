import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "@/views/Products.vue";
import OurCafe from "@/views/OurCafe.vue";
import Blog from "@/views/Blog.vue";
import BlogPost from "@/views/BlogPost.vue";
import About from "@/views/About.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: "/our-cafe",
      name: "our-cafe",
      component: OurCafe,
    },
    {
      path: "/blog",
      name: "blog",
      component: Blog,
    },
    {
      path: "/blog/:id",
      name: "BlogPost",
      component: BlogPost,
      props: true,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],
});

export default router;
