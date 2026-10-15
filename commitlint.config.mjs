/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        'web',
        'sim',
        'ui',
        'catalog',
        'config',
        'deps',
        'ci',
        'docker',
        'deploy',
        'infra',
        'release',
      ],
    ],
  },
};

export default config;
