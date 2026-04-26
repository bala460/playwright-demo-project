/**
 * Constants - Centralized constants for tests
 */
export const Constants = {
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
    NAVIGATION: 30000,
  },

  BROWSERS: {
    CHROMIUM: 'chromium',
    FIREFOX: 'firefox',
    WEBKIT: 'webkit',
  },

  DEVICES: {
    DESKTOP: 'Desktop',
    MOBILE_IOS: 'iPhone 12',
    MOBILE_ANDROID: 'Pixel 5',
  },

  TEST_TAGS: {
    SMOKE: '@smoke',
    REGRESSION: '@regression',
    API: '@api',
    VISUAL: '@visual',
    SLOW: '@slow',
  },

  HTTP_METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  },

  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
  },

  SELECTORS: {
    BUTTON_LOGIN: 'button[type="submit"]',
    BUTTON_LOGOUT: 'button:has-text("Logout")',
    INPUT_EMAIL: 'input[type="email"]',
    INPUT_PASSWORD: 'input[type="password"]',
  },

  URLS: {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
    PROFILE: '/profile',
  },

  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email',
  },

  RETRY_ATTEMPTS: {
    DEFAULT: 3,
    API: 3,
    UI: 2,
  },
};

export default Constants;
