import { recommended } from "@drupal-canvas/eslint-config";

export default [
  ...recommended,
  {
    ignores: ["dist/**"],
  },
];
