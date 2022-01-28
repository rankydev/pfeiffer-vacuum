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
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'import/order': 'off',
    'no-trailing-spaces': 'warn',
    'space-before-function-paren': 'warn',
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
  },
}
