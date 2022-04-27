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
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.{vue,js}',
    '<rootDir>/composables/**/*.{vue,js}',
    '<rootDir>/layouts/**/*.{vue,js}',
    '<rootDir>/middleware/**/*.{vue,js}',
    '<rootDir>/mixins/**/*.{vue,js}',
    '<rootDir>/pages/**/*.{vue,js}',
    '<rootDir>/plugins/**/*.{vue,js}',
    '<rootDir>/stores/**/*.{vue,js}',
    '<rootDir>/utils/**/*.{vue,js}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'spec.js',
    'stories.js',
    'stories.content.js',
    'schema.js',
    'schema.partial.js',
  ],
  coverageThreshold: {
    global: {
      statements: 96,
      branches: 89,
      functions: 96,
      lines: 96,
    },
  },
}
