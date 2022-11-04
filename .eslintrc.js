module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: [
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['unused-imports'],
  // add your custom rules here
  rules: {
    'import/order': 'off',
    // vue 2 still requires native modifier
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'no-restricted-imports': ['error', '@jest/globals'],
  },
}
