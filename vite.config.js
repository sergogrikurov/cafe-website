import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: "/cafe-website/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/variables" as *;
          @use "@/assets/scss/adaptive-value" as *;
          @use "@/assets/scss/adaptive-percent" as *;
          @use "@/assets/scss/functions.scss" as *;
        `,
      },
    },
  },
});
