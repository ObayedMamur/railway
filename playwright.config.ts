import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000, // Increase test timeout to 60 seconds
  use: {
    baseURL: 'https://railapp.railway.gov.bd',
    trace: 'on-first-retry',
    headless: false,
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 30000, // 30 seconds for navigation
    actionTimeout: 10000, // 10 seconds for actions
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});