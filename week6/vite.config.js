<<<<<<< HEAD
import 'dotenv/config';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint-disable-next-line import/no-extraneous-dependencies
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === 'production'
      ? `/${process.env.REPOSITORY_NAME}/`
      : '/',
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
=======
import "dotenv/config";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// eslint-disable-next-line import/no-extraneous-dependencies
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-practice/',
    // process.env.NODE_ENV === "production"
    //   ? `/${process.env.REPOSITORY_NAME}/`
    //   : "/",
  plugins: [
    vue(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
>>>>>>> d79d8da07321306dc9b69eaec5980c83fc553445
    }),
  ],
  resolve: {
    alias: {
<<<<<<< HEAD
      '@': fileURLToPath(new URL('./src', import.meta.url)),
=======
      "@": fileURLToPath(new URL("./src", import.meta.url)),
>>>>>>> d79d8da07321306dc9b69eaec5980c83fc553445
    },
  },
});
