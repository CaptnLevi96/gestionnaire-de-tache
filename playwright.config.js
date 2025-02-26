/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: './tests/E2E',
    timeout: 30000,
    expect: {
      timeout: 5000
    },
    use: {
        baseURL: 'http://localhost:8080',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 30000,
        navigationTimeout: 30000,
      },
    reporter: [
      ['html', { outputFolder: 'playwright-report' }],
      ['list']
    ]
  };
  
  module.exports = config;