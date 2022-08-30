module.exports = {
  processors: ['stylelint-processor-html'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-single-line-comment'],
      },
    ],
    'selector-class-pattern':
      '[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}',
    'no-invalid-position-at-import-rule': null,
    'declaration-empty-line-before': 'never',
    'no-empty-source': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          '/apply/',
          'variants',
          'responsive',
          'screen',
          'layer',
          'at-root',
        ],
      },
    ],
    'no-descending-specificity': null,
  },
}
