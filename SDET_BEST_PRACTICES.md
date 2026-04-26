# SDET Best Practices Guide

This document outlines the best practices followed in this Playwright framework, specifically designed for Software Development Engineers in Test (SDET).

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [Test Design](#test-design)
3. [Code Organization](#code-organization)
4. [Maintenance](#maintenance)
5. [Performance](#performance)
6. [Documentation](#documentation)

---

## Project Architecture

### 1. **Page Object Model (POM)**

**Why:** Separates test logic from page interactions, making tests more maintainable.

**Implementation:**
```javascript
// pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[type="email"]';
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}

// Usage in tests
test('login test', async ({ loginPage }) => {
  await loginPage.login('test@example.com', 'password');
});
```

**Benefits:**
- Centralized selectors
- Easy maintenance when UI changes
- Reusable across tests
- Clear intent

### 2. **Fixtures Pattern**

**Why:** Provides consistent setup/teardown and reusable test infrastructure.

**Implementation:**
```javascript
// Custom fixture for authenticated users
export const test = base.extend({
  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.login('test@example.com', 'password');
    await use(page);
  },
});
```

**Benefits:**
- DRY principle
- Consistent test setup
- Automatic cleanup
- Scoped dependencies

### 3. **Utility Layers**

**Why:** Provides reusable helper functions and centralized logic.

**Structure:**
```
utils/
├── testData.js       # Test data management
├── logger.js         # Logging utilit
├── testHelpers.js    # Common UI helpers
├── apiHelpers.js     # API testing helpers
└── constants.js      # Centralized constants
```

---

## Test Design

### 1. **AAA Pattern (Arrange-Act-Assert)**

**Why:** Clear structure makes tests easier to understand and maintain.

```javascript
test('should login successfully', async ({ loginPage, dashboardPage }) => {
  // Arrange - Setup test data and prerequisites
  const email = 'test@example.com';
  const password = 'password123';

  // Act - Perform actions
  await loginPage.goto();
  await loginPage.login(email, password);

  // Assert - Verify results
  await expect(loginPage.page).toHaveURL(/.*dashboard/);
  await dashboardPage.waitForPageLoad();
});
```

### 2. **Single Responsibility**

**Why:** Tests should test one thing. Easier to identify failures.

**❌ Bad:**
```javascript
test('login and dashboard', async ({ loginPage, dashboardPage }) => {
  await loginPage.login('email', 'password');
  const greeting = await dashboardPage.getUserGreeting();
  expect(greeting).toContain('Welcome');
  await dashboardPage.logout();
  // Too many concerns in one test
});
```

**✅ Good:**
```javascript
test('should display user greeting', async ({ authenticatedPage, dashboardPage }) => {
  await dashboardPage.goto();
  const greeting = await dashboardPage.getUserGreeting();
  expect(greeting).toContain('Welcome');
});
```

### 3. **Test Tagging**

**Why:** Enables selective test execution based on categories.

```javascript
test.describe('@smoke Login Tests', () => {
  test('quick login test', async ({ loginPage }) => {
    // Smoke test
  });
});

test.describe('@regression Authentication Tests', () => {
  test('comprehensive login validation', async ({ loginPage }) => {
    // Regression test
  });
});
```

**Usage:**
```bash
npm run test:smoke           # Run @smoke tests only
npm run test:regression      # Run @regression tests only
npx playwright test --grep @api   # Run @api tests
```

### 4. **Avoid Test Interdependencies**

**Why:** Tests should be independent and run in any order.

**❌ Bad:**
```javascript
test('create user', async () => {
  // Creates user ID 1
});

test('edit user', async () => {
  // Depends on user ID 1 from previous test
});
```

**✅ Good:**
```javascript
test('create and edit user', async ({ testData }) => {
  const user = testData.getRandomUser();
  // Create, then edit the same user
});
```

---

## Code Organization

### 1. **File Structure**

```
tests/
├── fixtures/
│   └── fixtures.js         # Custom Playwright fixtures
├── global-setup.js         # Pre-test setup (database, mocks)
├── global-teardown.js      # Post-test cleanup
├── login.spec.js           # Login tests
├── dashboard.spec.js       # Dashboard tests
└── api.spec.js             # API tests

pages/
├── BasePage.js             # Base class (optional)
├── LoginPage.js            # Login page POM
└── DashboardPage.js        # Dashboard page POM

utils/
├── testData.js             # Test data management
├── logger.js               # Logging utility
├── testHelpers.js          # Common helpers
├── apiHelpers.js           # API helpers
└── constants.js            # Constants

config/
└── config.js               # Configuration management
```

### 2. **Naming Conventions**

**Files:**
- Page classes: `PascalCase` + `Page.js` (e.g., `LoginPage.js`)
- Test files: `camelCase` + `.spec.js` (e.g., `login.spec.js`)
- Utilities: `camelCase` + `.js` (e.g., `testHelpers.js`)

**Tests:**
```javascript
// Clear, descriptive test names
test('should display error message when logging in with invalid credentials');
test('should enable login button when both fields are filled');
test('should navigate to dashboard after successful login');
```

**Methods:**
```javascript
// Verb-based names for methods
async login(email, password) { }
async fillEmail(email) { }
async getErrorMessage() { }
async isErrorMessageVisible() { }
```

---

## Maintenance

### 1. **Selector Management**

**Why:** Centralize selectors to make UI changes manageable.

**✅ Good:**
```javascript
export class LoginPage {
  constructor(page) {
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.loginButton = 'button[type="submit"]';
  }
}
```

### 2. **DRY Principle**

**Why:** Avoid duplicated code that's harder to maintain.

**❌ Bad:**
```javascript
test('test1', async ({ page }) => {
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');
});

test('test2', async ({ page }) => {
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');
});
```

**✅ Good:**
```javascript
// Use fixtures or helper methods
async login(email, password) {
  await this.fillEmail(email);
  await this.fillPassword(password);
  await this.clickLogin();
}

test('test1', async ({ loginPage }) => {
  await loginPage.login('test@example.com', 'password');
});

test('test2', async ({ loginPage }) => {
  await loginPage.login('test@example.com', 'password');
});
```

### 3. **Explicit Waits (Not Sleeps)**

**Why:** Make tests reliable without hardcoded delays.

**❌ Bad:**
```javascript
await page.click(selector);
await page.waitForTimeout(2000); // Magic number
```

**✅ Good:**
```javascript
await page.click(selector);
await page.waitForURL('**/dashboard');
await page.waitForSelector('.dashboard-title');
```

### 4. **Logging**

**Why:** Better debugging and test report clarity.

```javascript
import { Logger } from '../utils/logger.js';

Logger.info('Starting login test');
Logger.debug('User data:', userData);
Logger.success('Test passed');
Logger.error('Unexpected error', error);
```

---

## Performance

### 1. **Parallel Execution**

Playwright runs tests in parallel by default. Configure in `playwright.config.js`:

```javascript
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined, // 1 worker in CI
});
```

### 2. **Optimize Selectors**

**❌ Slow:**
```javascript
await page.click('div > div > div > button');
```

**✅ Fast:**
```javascript
.loginButton = 'button[type="submit"]';
await page.click(this.loginButton);
```

### 3. **Avoid Unnecessary Navigation**

**❌ Bad:**
```javascript
test('test1', async ({ page }) => {
  await page.goto('/');
  await login();
  await page.goto('/dashboard');
});

test('test2', async ({ page }) => {
  await page.goto('/');
  await login();
  await page.goto('/settings');
});
```

**✅ Good:**
```javascript
test('test1', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
});

test('test2', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/settings');
});
```

---

## Documentation

### 1. **Code Comments**

```javascript
/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @throws {Error} If login fails
 */
async login(email, password) {
  await this.fillEmail(email);
  await this.fillPassword(password);
  await this.clickLogin();
}
```

### 2. **Test Documentation**

```javascript
test.describe('@smoke Critical User Workflows', () => {
  test('should login successfully', async ({ loginPage, dashboardPage }) => {
    // This test verifies the critical login flow
    // It ensures users can authenticate and access the dashboard
  });
});
```

### 3. **README Maintenance**

- Keep examples updated with actual code
- Document new test patterns
- Add troubleshooting section
- Document environment setup

---

## Advanced Patterns

### 1. **Retry Logic**

```javascript
import { TestHelpers } from '../utils/testHelpers.js';

test('should handle flaky API', async ({ page }) => {
  const result = await TestHelpers.retry(
    async () => {
      const response = await page.goto('/api/data');
      return response.json();
    },
    3,      // retries
    1000    // delay in ms
  );
});
```

### 2. **API Mocking**

```javascript
import { APIHelpers } from '../utils/apiHelpers.js';

test('should use mocked API', async ({ page }) => {
  await APIHelpers.setupInterceptor(
    page,
    '**/api/users',
    [{ id: 1, name: 'Test User' }]
  );
  
  await page.goto('/');
  // Application will use mocked response
});
```

### 3. **Visual Regression**

```javascript
import { TestHelpers } from '../utils/testHelpers.js';

test('dashboard should match baseline', async ({ dashboardPage }) => {
  await dashboardPage.goto();
  await TestHelpers.compareScreenshot(dashboardPage.page, 'dashboard');
});
```

---

## Summary Checklist

- ✅ Use Page Object Model pattern
- ✅ Organize code in logical folders
- ✅ Follow AAA (Arrange-Act-Assert) pattern
- ✅ Use fixtures for common setup
- ✅ Tag tests appropriately
- ✅ Avoid test interdependencies
- ✅ Use explicit waits, not sleeps
- ✅ Centralize test data
- ✅ Add meaningful logging
- ✅ Keep tests independent
- ✅ Use meaningful test names
- ✅ Maintain documentation
- ✅ Use constants for repeated values
- ✅ Implement helper functions

---

**Remember:** The goal is to write maintainable, scalable, and reliable tests that provide real value to the development process.
