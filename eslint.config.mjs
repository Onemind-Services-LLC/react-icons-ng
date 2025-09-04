import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import babelParser from "@babel/eslint-parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default defineConfig([
  // Ignore files/folders
  {
    ignores: [
      "**/node_modules/**",
      "**/build/**",
      "**/docs/**",
      "**/bin/**",
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/public/**",
      "packages/react-icons-ng/lib/**",
      "packages/react-icons-ng/build/**",
      "packages/react-icons-ng/icons/**",
      "!packages/react-icons-ng/icons/index.js",
      "packages/_react-icons-ng/**",
      "packages/_react-icons-ng-pack/**",
    ],
  },

  // JavaScript recommended
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },

  // TypeScript
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        project: [
          "./packages/react-icons-ng/tsconfig.json",
          "./packages/ts-test/tsconfig.json",
          "./packages/preview/tsconfig.json",
        ],
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
    },
  },

  // React
  {
    files: [
      "packages/demo/src/**/*.{js,jsx}",
      "packages/demo-pack/src/**/*.{js,jsx}",
      "packages/preview/src/**/*.{js,jsx}",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        window: true,
        document: true,
        navigator: true,
        console: true,
        fetch: true,
        process: true,
        module: true,
        require: true,
        __dirname: true,
        URL: true,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Node / config files
  {
    files: [
      "packages/webpack5-test/src/**/*.js",
      "packages/**/webpack*.js",
      "packages/**/webpack*.mjs",
      "packages/**/plugin/**/*.js",
      "packages/**/plugin/**/*.mjs",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.cjs",
      "**/*.mjs",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: true,
        module: true,
        require: true,
        __dirname: true,
        console: true,
      },
    },
    rules: {},
  },
]);
