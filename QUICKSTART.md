# Quick Start Guide

Get up and running with the Playwright SDET Framework in 5 minutes.

## Prerequisites
- Node.js 18+ installed
- Git
- A text editor or IDE (VS Code recommended)

## 1. Initial Setup (2 minutes)

```bash
# Clone or navigate to project
cd playwright-demo-project

# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers

# Setup environment
cp .env.example .env
```

## 2. Run Your First Test (1 minute)

```bash
# Run all tests
npm test

# Or run in UI mode
npm run test:ui
```

## 3. Understanding Test Structure (2 minutes)

### Test File Example
```javascript
import { test, expect } from '../fixtures/fixtures.js';

test.describe('@smoke Login Tests', () => {
  test('should login successfully', async ({ loginPage, dashboardPage }) => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password123';
    
    // Act
    await loginPage.goto();
    await loginPage.login(email, password);
    
    // Assert
    await expect(loginPage.page).toHaveURL(/.*dashboard/);
  });
});
```

### Key Concepts
- **Fixtures**: Reusable test setup (e.g., `loginPage`, `dashboardPage`)
- **Page Objects**: Encapsulate page elements and interactions
- **Assertions**: Verify expected behavior with `expect()`
- **Tags**: Categorize tests with `@smoke`, `@regression`, etc.

## 4. Write Your First Test

### Step 1: Create Page Object

```javascript
// pages/NewPage.js
export class NewPage {
  constructor(page) {
    this.page = page;
    this.heading = 'h1';
    this.button = 'button[data-testid="action"]';
  }

  async goto() {
    await this.page.goto('/new-page');
  }

  async clickButton() {
    await this.page.click(this.button);
  }

  async getHeadingText() {
    return await this.page.textContent(this.heading);
  }
}
```

### Step 2: Add Fixture

```javascript
// tests/fixtures/fixtures.js - Add this fixture
newPage: async ({ page }, use) => {
  const newPage = new NewPage(page);
  await use(newPage);
}
```

### Step 3: Create Test

```javascript
// tests/feature.spec.js
import { test, expect } from '../fixtures/fixtures.js';
import { NewPage } from '../pages/NewPage.js';

test.describe('@smoke Feature Tests', () => {
  test('should display heading', async ({ page }) => {
    const newPage = new NewPage(page);
    await newPage.goto();
    const text = await newPage.getHeadingText();
    expect(text).toContain('Expected Text');
  });
});
```

### Step 4: Run Test

```bash
npx playwright test tests/feature.spec.js
```

## 5. Common Commands

```bash
# Run all tests
npm test

# Run UI mode (interactive)
npm run test:ui

# Run debug mode
npm run test:debug

# Run headed (visible browser)
npm run test:headed

# Run smoke tests only
npm run test:smoke

# Run specific file
npx playwright test tests/login.spec.js

# Run single test
npx playwright test tests/login.spec.js -g "should login"

# View test report
npm run test:report

# Browser-specific tests
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

## 6. Using Utilities

### Logger
```javascript
import { Logger } from '../utils/logger.js';

Logger.info('Test started');
Logger.success('Test passed');
Logger.warn('Warning message');
Logger.error('Error occurred');
```

### TestHelpers
```javascript
import { TestHelpers } from '../utils/testHelpers.js';

await TestHelpers.fillInput(page, selector, 'text');
await TestHelpers.clickElement(page, selector);
await TestHelpers.verifyElementText(page, selector, 'expected');
const text = await TestHelpers.getElementText(page, selector);
```

### TestData
```javascript
import { TestData } from '../utils/testData.js';

const testData = new TestData();
const user = testData.user;
const account = testData.getAccountById(1);
```

## 7. Debugging Tips

### Debug Mode
```bash
npm run test:debug
```
- Walks through test step by step
- Pause and inspect elements
- Modify selectors on the fly

### Inspector Tool
Press `Ctrl + Shift + I` during debug to open Playwright Inspector

### Screenshots
```javascript
await page.screenshot({ path: 'screenshot.png' });
```

### Take Video
```javascript
npm run test:headed  # Video recorded by default on failure
```

## 8. Project Structure Quick Reference

```
tests/
  ├── login.spec.js        ← Login tests
  ├── dashboard.spec.js    ← Dashboard tests
  └── api.spec.js          ← API tests

pages/
  ├── LoginPage.js         ← Login interactions
  └── DashboardPage.js     ← Dashboard interactions

utils/
  ├── testData.js          ← Test data
  ├── logger.js            ← Logging
  ├── testHelpers.js       ← Common helpers
  └── constants.js         ← Constants

config/
  └── config.js            ← Configuration
```

## 9. Common Issues & Solutions

### "Browser not found"
```bash
npm run install:browsers
```

### "Element not found"
1. Check selector in browser DevTools
2. Wait for loading: `await page.waitForSelector()`
3. Use `npm run test:debug` to inspect

### "Tests timing out"
1. Increase timeout in `playwright.config.js`
2. Check network conditions
3. Use explicit waits instead of sleeps

### "Port already in use"
Change port in `.env` or:
```bash
lsof -i :3000
kill -9 <PID>
```

## 10. Next Steps

1. Read [SDET_BEST_PRACTICES.md](./SDET_BEST_PRACTICES.md) for advanced patterns
2. Review existing tests in `tests/` folder
3. Check [Playwright Docs](https://playwright.dev) for API reference
4. Set up CI/CD with GitHub Actions (already configured)

## 11. Useful Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Guide](https://playwright.dev/docs/pom)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

**You're ready to go!** 🚀

Start writing tests with confidence!
