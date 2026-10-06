import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Shared rules for every TypeScript package in the monorepo.
 * Formatting is owned by Prettier, so no stylistic rules live here.
 */
export const sharedRules = {
  '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  eqeqeq: ['error', 'smart'],
  'prefer-const': 'error',
};

export const baseConfig = defineConfig([
  globalIgnores(['dist/**', 'coverage/**', '.turbo/**', 'node_modules/**']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: sharedRules,
  },
]);

export default baseConfig;
