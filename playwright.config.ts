import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Allow full parallelism locally
  fullyParallel: true,

  // Prevent accidental commits with test.only
  forbidOnly: !!process.env.CI,

  // Retries only in CI environments
  retries: process.env.CI ? 2 : 0,

  // Use all available workers locally
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    browserName: 'chromium',

    headless: true,

    // Useful debugging artefacts without excessive noise
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',

    // Stable navigation behaviour
    actionTimeout: 10000,
    navigationTimeout: 30000
  }
});