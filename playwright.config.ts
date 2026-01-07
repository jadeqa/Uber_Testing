import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  //timeout: 10000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['html', { 
      outputFolder: './report',
      open: 'never' 
    }],
    ['list'],
    ['json', { 
      outputFile: './report/test-results.json' 
    }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {  
      name: 'tests',
     testDir: './tests',
    testMatch: /.*\.spec\.ts/,
    }

  ]

});