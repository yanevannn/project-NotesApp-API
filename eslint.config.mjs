import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": ["warn", { vars: "all", args: "none" }],
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin, // Memasukkan plugin sebagai objek
    },
    rules: {
      "prettier/prettier": "error", // Menjalankan Prettier sebagai linting rule
    },
  },
];
