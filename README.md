# Playwright SDET Testing Framework

A professional, enterprise-grade testing automation framework built with Playwright and JavaScript, designed following SDET (Software Development Engineer in Test) best practices.

## 📋 Project Overview

This framework is designed to provide:
- **Scalable test architecture** with Page Object Model pattern
- **Reusable fixtures and utilities** for efficient test development
- **Cross-browser testing** (Chrome, Firefox, Safari, Mobile)
- **CI/CD integration** with GitHub Actions
- **Comprehensive reporting** with HTML, JSON, and JUnit reports
- **Best practices** for test organization, data management, and maintenance

## 🏗️ Project Structure

```
playwright-demo-project/
├── tests/                          # Test specs
│   ├── fixtures/
│   │   └── fixtures.js            # Custom Playwright fixtures
│   ├── global-setup.js            # Global setup hook
│   ├── global-teardown.js         # Global teardown hook
│   ├── login.spec.js              # Login tests
│   └── dashboard.spec.js          # Dashboard tests
├── pages/                          # Page Object Models
│   ├── LoginPage.js               # Login page POM
│   └── DashboardPage.js           # Dashboard page POM
├── utils/                          # Utility functions
│   ├── testData.js                # Centralized test data
│   ├── logger.js                  # Logging utility
│   └── testHelpers.js             # Common test helpers
├── config/                         # Configuration files
├── .github/workflows/              # CI/CD workflows
│   └── e2e-tests.yml              # GitHub Actions workflow
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies
├── .env.example                    # Environment variables template
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd playwright-demo-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npm run install:browsers
```

4. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 📝 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:
```env
BASE_URL=http://localhost:3000
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
CI=false
```

### Playwright Config
Key settings in `playwright.config.js`:
- **testDir**: Location of test files
- **use**: Default browser context settings
- **projects**: Browser configurations (Chrome, Firefox, Safari, Mobile)
- **webServer**: Auto-start local server before tests
- **reporters**: Output formats (HTML, JSON, JUnit)

## ▶️ Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with headed browser
```bash
npm run test:headed
```

### Run tests by browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run tests by tags
```bash
npm run test:smoke        # @smoke tagged tests
npm run test:regression   # @regression tagged tests
npm run test:api          # @api tagged tests
```

### Run specific test file
```bash
npx playwright test tests/login.spec.js
```

### View test report
```bash
npm run test:report
```

## 🏗️ Test Structure

### Test Organization

Tests are organized by functionality with tags for categorization:

```javascript
test.describe('@smoke Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Setup
  });

  test('should successfully login', async ({ loginPage, dashboardPage }) => {
    // Arrange
    const testEmail = 'test@example.com';
    
    // Act
    await loginPage.login(testEmail, 'password123');
    
    // Assert
    await expect(loginPage.page).toHaveURL(/.*dashboard/);
  });
});
```

### Test Tags
- `@smoke` - Quick smoke tests (< 2 min total)
- `@regression` - Full regression suite
- `@api` - API integration tests
- `@visual` - Visual regression tests
- `@slow` - Long-running tests

## 📄 Page Object Model Pattern

PSMs encapsulate page selectors and interactions:

```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
```

**Benefits:**
- Separation of concerns
- Easy maintenance
- Reusability
- Reduced duplication

## 🔧 Fixtures

Custom fixtures provide reusable test setup:

```javascript
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.login('test@example.com', 'password');
    await use(page);
  },
});
```

## 🛠️ Utilities

### Logger
```javascript
Logger.info('Test info');
Logger.warn('Warning message');
Logger.error('Error message');
Logger.success('Operation successful');
Logger.debug('Debug data', { key: 'value' });
```

### TestHelpers
```javascript
await TestHelpers.fillInput(page, selector, text);
await TestHelpers.clickElement(page, selector);
await TestHelpers.verifyElementText(page, selector, text);
await TestHelpers.retry(operation, retries);
await TestHelpers.takeScreenshot(page, 'name');
```

### TestData
```javascript
const testUser = testData.getRandomUser();
const account = testData.getAccountById(1);
```

## 📊 Reporting

Tests generate multiple report formats:

- **HTML Report**: Interactive, visual test results
  ```bash
  npm run test:report
  ```
- **JSON Report**: Machine-readable results
  ```
  test-results/results.json
  ```
- **JUnit Report**: CI/CD integration
  ```
  test-results/junit.xml
  ```

## 🔄 CI/CD Integration

### GitHub Actions
Configured in `.github/workflows/e2e-tests.yml`:
- Runs on push to main/develop
- Tests across multiple Node versions
- Tests on all browser engines
- Generates artifacts and reports
- Scheduled daily runs

### Running in CI
```bash
CI=true npm test
```

## 🎯 Best Practices

### Test Design
- ✅ Single responsibility per test
- ✅ Clear Arrange-Act-Assert structure
- ✅ Use meaningful test names
- ✅ Avoid test interdependencies
- ✅ Use fixtures for setup

### Test Maintenance
- ✅ Use Page Object Models
- ✅ Centralize test data
- ✅ Use appropriate waits (not hardcoded delays)
- ✅ Log important steps
- ✅ Handle flakiness with retries

### Code Quality
- ✅ Keep selectors DRY
- ✅ Use fixtures for common setup
- ✅ Document complex test logic
- ✅ Follow naming conventions
- ✅ Regular refactoring

## 📝 Writing Tests

### Example: Adding New Test
1. Create page object if needed:
```javascript
// pages/NewPage.js
export class NewPage {
  constructor(page) {
    this.page = page;
    this.heading = 'h1';
  }

  async goto() {
    await this.page.goto('/new-page');
  }
}
```

2. Add fixture if needed:
```javascript
// tests/fixtures/fixtures.js
newPage: async ({ page }, use) => {
  await use(new NewPage(page));
}
```

3. Write test:
```javascript
// tests/feature.spec.js
test('new feature works', async ({ newPage }) => {
  await newPage.goto();
  await expect(newPage.page.locator(newPage.heading)).toBeVisible();
});
```

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Headed Mode
```bash
npm run test:headed
```

### Generate Test Code
```bash
npm run codegen
```

### View Traces
1. Run tests with trace enabled (default: on-first-retry)
2. Open HTML report: `npm run test:report`
3. Click on failed test to view trace

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-page)
- [SDET Best Practices](https://www.sdetpro.com)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🤝 Contributing

1. Create feature branch
2. Write tests following SDET practices
3. Ensure all tests pass locally
4. Submit pull request
5. Wait for CI checks to pass

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

SDET Team

---

**Happy Testing! 🚀**
