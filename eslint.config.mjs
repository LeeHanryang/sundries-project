import nuxt from "@nuxt/eslint-config-flat";
import js from "@eslint/js";
import vue from "eslint-plugin-vue";

export default [
  ...nuxt(),
  js.configs.recommended,
  vue.configs["vue3-essential"],
  {
    rules: {
      "vue/no-console": "warn",
    },
  },
];
