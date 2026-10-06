import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import { baseConfig } from './base.js';

/** Config for React component libraries that are not Next.js apps. */
export const reactConfig = defineConfig([
  ...baseConfig,
  reactHooks.configs.flat['recommended-latest'],
]);

export default reactConfig;
