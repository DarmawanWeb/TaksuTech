/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        'web',
        'kiosk',
        'playground',
        'ui',
        'bali',
        'content',
        'config',
        'deps',
        'ci',
        'docker',
        'deploy',
        'release',
      ],
    ],
  },
};

export default config;
