import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import html from "@html-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Ignore files
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "tests/**",
      "src/browser/firefox-profile.js",
    ],
  },
  // Lint Javascript
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },

  // Lint Typescript
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    extends: [tseslint.configs.recommended],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },

  // Lint HTML
  {
    files: ["**/*.html"],
    plugins: { html },
    language: "html/html",
    extends: ["html/recommended"],
    rules: {
      // Formatting delegated to Prettier
      "html/require-closing-tags": "off",
      "html/attrs-newline": "off",
      "html/class-spacing": "off",
      "html/element-newline": "off",
      "html/id-naming-convention": "off",
      "html/indent": "off",
      "html/lowercase": "off",
      "html/no-extra-spacing-tags": "off",
      "html/no-extra-spacing-text": "off",
      "html/no-multiple-empty-lines": "off",
      "html/quotes": "off",
      "html/sort-attrs": "off",
    },
  },

  // Formatting delegated to Prettier
  eslintConfigPrettier,
]);
