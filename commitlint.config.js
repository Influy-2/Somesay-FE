module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'refactor',
        'style',
        'docs',
        'test',
        'design',
        'ci',
        'test',
        'remove',
        'rename',
        '!HOTFIX',
        '!BREAKING CHANGE',
      ],
    ],
  },
};
