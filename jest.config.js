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
  testEnvironment: 'jsdom',
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/composables/**/*.js',
    '<rootDir>/stores/**/*.js',
  ],
  coverageThreshold: {
    global: {
      branches: 81,
      functions: 92,
      lines: 92,
      statements: 92,
    },
  },
}
