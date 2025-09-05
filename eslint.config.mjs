import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tslint from "typescript-eslint";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

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
      "**/next-env.d.ts",
    ],
  },

  // JavaScript
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },

  // TypeScript
  tslint.configs.recommended,
  // globals
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
      },
    },
  },
  // React
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // react hooks
  reactHooks.configs["recommended-latest"],
  //common rules
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "react/display-name": "off",
    },
  },
]);
