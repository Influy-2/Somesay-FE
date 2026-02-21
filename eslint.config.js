const baseConfig = require('@somesay/config/eslint');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/build/**',
    ],
  },
  ...baseConfig,
];
