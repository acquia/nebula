import { recommended } from '@drupal-canvas/eslint-config';

export default [
  ...recommended,
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    ignores: ['dist/**'],
  },
];
