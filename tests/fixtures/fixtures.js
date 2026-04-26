import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/login.js';

export const test = base.extend({
  // Fixture for login page
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
