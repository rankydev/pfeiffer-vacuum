module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue2-jest',
  },
  transformIgnorePatterns: ['node_modules/'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  setupFilesAfterEnv: ['./tests/jest.setup.js'],
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html', 'cobertura'],
  reporters: ['default', ['jest-junit', { outputDirectory: './report' }]],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.{vue,js}',
    '<rootDir>/composables/**/*.{vue,js}',
    '<rootDir>/layouts/**/*.{vue,js}',
    '<rootDir>/middleware/**/*.{vue,js}',
    '<rootDir>/mixins/**/*.{vue,js}',
    // '<rootDir>/pages/**/*.{vue,js}',
    '<rootDir>/plugins/**/*.{vue,js}',
    '<rootDir>/resolver/**/*.{vue,js}',
    '<rootDir>/stores/**/*.{vue,js}',
    '<rootDir>/providers/**/*.{vue,js}',
    '<rootDir>/utils/**/*.{vue,js}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'spec.js',
    'stories.js',
    'stories.content.js',
    'schema.js',
    'schema.partial.js',
    'index.js',
    'stores/user/',
    'stores/contact/',
    'stores/countries/',
    'stores/product',
    'stores/menu/',
    '/composables/useAxiosForHybris.js',
    '/composables/useAxiosInterceptors.js',
    '/composables/useContextUtil.js',
    '/stores/user/partials/useKeycloak.js',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
}
