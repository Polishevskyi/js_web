export default {
  // Test execution settings
  timeout: 60000,
  retryCount: 3,
  workers: 3,

  // CI settings
  ci: {
    retries: 3,
    workers: 3,
  },

  // Timeouts
  navigationTimeout: 30000,
  actionTimeout: 15000,

  // Test artifacts
  trace: 'retain-on-failure',
  screenshot: true,
  video: 'retain-on-failure',
  headless: true,

  // Report paths
  playwrightReportDir: 'playwright-report',
  allureResultsDir: 'allure-results',

  // Browser viewport
  viewport: {
    width: 1920,
    height: 1080,
  },
};
