import { defineConfig, globalIgnores } from "eslint/config"
import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import prettierPlugin from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"
import globals from "globals"

export default defineConfig([
  globalIgnores(["**/dist", "**/*.min.js"]),
  {
    name: "vite-template-react-ts-eslint",
    files: ["**/*.ts", "**/*.{t,j}sx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: true,
        tsconfigRootDir: "./",
      },
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": 0,

      "@typescript-eslint/consistent-type-imports": [
        2,
        {
          fixStyle: "separate-type-imports",
        },
      ],

      "@typescript-eslint/no-restricted-imports": [
        2,
        {
          paths: [
            {
              name: "react-redux",
              importNames: ["useSelector", "useStore", "useDispatch"],
              message:
                "Please use pre-typed versions from `src/app/hooks.ts` instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/*{test,spec}.{t,j}s?(x)"],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    plugins: { prettier: prettierPlugin },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        NodeJS: true,
      },
    },
  },
  {
    settings: {
      react: {
        version: "detect", // 自动检测 package.json  中的 React 版本
      },
    },
  },
  eslintConfigPrettier,
])
