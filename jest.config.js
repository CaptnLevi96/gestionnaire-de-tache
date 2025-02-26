// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    "**/tests/**/*.test.js",
    "**/tests/**/*.spec.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/BDD/"
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};