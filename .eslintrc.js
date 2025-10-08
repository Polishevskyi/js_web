module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:playwright/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['playwright'],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-constructor-return': 'off',
    'playwright/expect-expect': 'off',
    'playwright/no-wait-for-selector': 'off',
    'playwright/no-wait-for-timeout': 'off',
    'func-names': 'off',
  },
};
