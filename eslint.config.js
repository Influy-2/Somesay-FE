const baseConfig = require('@somesay/config/eslint');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/build/**',
      // openapi-typescript 생성물입니다. 손대지 않고 pnpm api:sync 로만 갱신합니다.
      '**/generated/**',
    ],
  },
  ...baseConfig,
];
