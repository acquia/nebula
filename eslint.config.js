import { recommended as drupalCanvasRecommended } from "@drupal-canvas/eslint-config";
import storybook from "eslint-plugin-storybook";
import globals from "globals";

export default [
  { ignores: ["dist", "node_modules", "storybook-static", ".playwright-cli"] },
  ...drupalCanvasRecommended,
  ...storybook.configs["flat/recommended"],
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
