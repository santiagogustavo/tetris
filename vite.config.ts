import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import "@/sass/_classes.scss";
            @import "@/sass/_colors.scss";
          `,
      },
    },
  },

  build: {
    ssr: false,
  },
});
