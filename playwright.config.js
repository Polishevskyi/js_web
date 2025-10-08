const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();
const config = require('./config');

module.exports = defineConfig({
  testDir: './tests',
  timeout: config.timeout,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? config.ci.retries : config.retryCount,
  workers: process.env.CI ? config.ci.workers : config.workers,

  reporter: [
    ['html', { outputFolder: config.playwrightReportDir }],
    ['list'],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: config.allureResultsDir,
        suiteTitle: true,
        categories: [
          {
            name: 'Ignored tests',
            matchedStatuses: ['skipped'],
          },
          {
            name: 'Product defects',
            matchedStatuses: ['failed'],
            messageRegex: '.*Assertion.*',
          },
          {
            name: 'Test defects',
            matchedStatuses: ['failed', 'broken'],
          },
        ],
        environmentInfo: {
          E2E_NODE_VERSION: process.version,
          E2E_OS: process.platform,
        },
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: config.trace,
    screenshot: config.screenshot ? 'only-on-failure' : 'off',
    video: config.video,
    navigationTimeout: config.navigationTimeout,
    actionTimeout: config.actionTimeout,
    headless: config.headless,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: config.viewport,
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: config.viewport,
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: config.viewport,
      },
    },

    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },
  ],
});
