import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './api-tests/tests',
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'api-report' }], ['junit', { outputFile: 'api-results.xml' }]],
  use: {
    baseURL: 'https://reqres.in/',
    extraHTTPHeaders: {},
  }
};

export default config;
