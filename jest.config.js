module.exports = {
  collectCoverage: true,
  verbose: false,
  collectCoverageFrom: [ 'src/**/*.js' ],
  testRegex: '/test/[^_]*/*.js$',
  coverageDirectory: 'tmp/coverage',
  'testEnvironment': 'node',
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
      statements: 100
    }
  },
  'setupFilesAfterEnv': [
    './test/__setup__/jest.setup.js'
  ]
}
