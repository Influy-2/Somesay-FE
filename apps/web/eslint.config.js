// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  rules: {
    // feature는 공개 barrel(index.ts)로만 접근한다. 내부 파일을 직접 참조하면
    // 공개 API가 흐려지고 barrel↔모듈 순환이 다시 생긴다.
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['@/features/*/*', '@/features/*/**'],
          message: 'feature는 공개 barrel로만 접근한다. @/features/{name} 을 사용하라.',
        },
      ],
    }],
  },
}, ...storybook.configs["flat/recommended"]])
