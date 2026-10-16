/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        'web',
        'edu',
        'sim',
        'robot',
        'kiosk',
        'speech',
        'infra',
        'ui',
        'edu-ui',
        'catalog',
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
