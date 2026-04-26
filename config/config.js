/**
 * Config - Test configuration management
 */
export class Config {
  static {
    // Load env variables
    this.baseURL = process.env.BASE_URL || 'https://practicetestautomation.com/practice-test-login/';
    this.apiBaseURL = process.env.API_BASE_URL || `${this.baseURL}/api`;
    this.headless = process.env.HEADLESS !== 'false';
    this.browser = process.env.BROWSER || 'chromium';
    this.isCIEnvironment = process.env.CI === 'true';
  }

  /**
   * Get base URL
   */
  static getBaseURL() {
    return this.baseURL;
  }

  /**
   * Get API base URL
   */
  static getAPIBaseURL() {
    return this.apiBaseURL;
  }

  /**
   * Check if running in headless mode
   */
  static isHeadless() {
    return this.headless;
  }

  /**
   * Check if running in CI environment
   */
  static isCIEnv() {
    return this.isCIEnvironment;
  }

  /**
   * Get default browser
   */
  static getDefaultBrowser() {
    return this.browser;
  }

  /**
   * Get test user credentials
   */
  static getTestUser() {
    return {
      email: process.env.TEST_USER || 'student',
      password: process.env.TEST_USER_PASSWORD || 'password123',
    };
  }

  /**
   * Get locale configuration
   */
  static getLocale() {
    return process.env.LOCALE || 'en-US';
  }

  /**
   * Get viewport configuration
   */
  static getViewport() {
    return {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1920'),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '1080'),
    };
  }

  /**
   * Get retry configuration
   */
  static getRetryConfig() {
    return {
      retries: this.isCIEnvironment ? 2 : 0,
      interval: 1000,
    };
  }

  /**
   * Get timeout configuration
   */
  static getTimeoutConfig() {
    return {
      navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
      actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '10000'),
      expectTimeout: parseInt(process.env.EXPECT_TIMEOUT || '5000'),
    };
  }

  /**
   * Log configuration
   */
  static logConfiguration() {
    console.log('=== Test Configuration ===');
    console.log(`Base URL: ${this.getBaseURL()}`);
    console.log(`API Base URL: ${this.getAPIBaseURL()}`);
    console.log(`Headless: ${this.isHeadless()}`);
    console.log(`CI Environment: ${this.isCIEnv()}`);
    console.log(`Browser: ${this.getDefaultBrowser()}`);
    console.log(`Locale: ${this.getLocale()}`);
    console.log('========================');
  }
}

export default Config;
