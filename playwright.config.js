import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
    ["line"],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://practicetestautomation.com/practice-test-login/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },
  
  // Configure projects for browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run server before tests if needed
  webServer: {
    command: 'npm run start',
    url: 'https://practicetestautomation.com/practice-test-login/',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  globalSetup: './tests/global-setup.js',
  globalTeardown: './tests/global-teardown.js',
});
