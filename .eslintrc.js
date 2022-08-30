module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  // add your custom rules here
  rules: {
    'import/order': 'off',
    // vue 2 still requires native modifier
    'vue/no-deprecated-v-on-native-modifier': 'off',
  },
}
