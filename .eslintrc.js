module.exports = {
  extends: [
    '@losant/eslint-config-losant/env/browser',
  ],
  rules: {
    'arrow-body-style': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
