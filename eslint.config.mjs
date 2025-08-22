import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import babelParser from "@babel/eslint-parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const tsConfig = {
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
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "no-unused-vars": "off",
  },
};

const reactConfig = {
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
};

const nodeConfig = {
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
};

const ignoresConfig = {
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
};

export default [
  js.configs.recommended,
  tsConfig,
  reactConfig,
  nodeConfig,
  ignoresConfig,
];
