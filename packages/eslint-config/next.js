import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { sharedRules } from './base.js';

/** Config for Next.js apps: Next core-web-vitals + TypeScript + shared house rules. */
export const nextConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
  { rules: sharedRules },
]);

export default nextConfig;
