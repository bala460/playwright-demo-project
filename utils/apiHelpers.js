import { expect } from '@playwright/test';
import { Logger } from './logger.js';

/**
 * APIHelpers - API testing utilities
 */
export class APIHelpers {
  /**
   * Make GET request
   */
  static async get(page, endpoint, options = {}) {
    Logger.info(`GET request to ${endpoint}`);
    const response = await page.request.get(endpoint, options);
    this.logResponse(response);
    return response;
  }

  /**
   * Make POST request
   */
  static async post(page, endpoint, data, options = {}) {
    Logger.info(`POST request to ${endpoint}`);
    const response = await page.request.post(endpoint, {
      data,
      ...options,
    });
    this.logResponse(response);
    return response;
  }

  /**
   * Make PUT request
   */
  static async put(page, endpoint, data, options = {}) {
    Logger.info(`PUT request to ${endpoint}`);
    const response = await page.request.put(endpoint, {
      data,
      ...options,
    });
    this.logResponse(response);
    return response;
  }

  /**
   * Make DELETE request
   */
  static async delete(page, endpoint, options = {}) {
    Logger.info(`DELETE request to ${endpoint}`);
    const response = await page.request.delete(endpoint, options);
    this.logResponse(response);
    return response;
  }

  /**
   * Log API response
   */
  static logResponse(response) {
    Logger.debug(`Response Status: ${response.status()}`);
  }

  /**
   * Verify response status
   */
  static async verifyStatusCode(response, expectedStatus) {
    Logger.info(`Verifying response status: expected ${expectedStatus}`);
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Verify response contains value
   */
  static async verifyResponseContains(response, key, value) {
    const json = await response.json();
    Logger.info(`Verifying ${key} = ${value}`);
    expect(json[key]).toBe(value);
  }

  /**
   * Get response body as JSON
   */
  static async getResponseJSON(response) {
    return await response.json();
  }

  /**
   * Get response body as text
   */
  static async getResponseText(response) {
    return await response.text();
  }

  /**
   * Verify response header
   */
  static async verifyResponseHeader(response, headerName, expectedValue) {
    const headerValue = response.headers()[headerName.toLowerCase()];
    Logger.info(`Verifying header ${headerName}: ${expectedValue}`);
    expect(headerValue).toBe(expectedValue);
  }

  /**
   * Retry API request
   */
  static async retryRequest(requestFn, retries = 3, delay = 1000) {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        Logger.info(`API request attempt ${i + 1}/${retries}`);
        return await requestFn();
      } catch (error) {
        lastError = error;
        Logger.warn(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw lastError;
  }

  /**
   * Mock API interceptor
   */
  static async setupInterceptor(page, urlPattern, responseData, statusCode = 200) {
    Logger.info(`Setting up interceptor for ${urlPattern}`);
    await page.route(urlPattern, (route) => {
      route.abort('blockedbyresponse');
      route.continue({
        response: {
          status: statusCode,
          contentType: 'application/json',
          body: JSON.stringify(responseData),
        },
      });
    });
  }

  /**
   * Compare API responses
   */
  static async compareResponses(response1, response2) {
    const json1 = await response1.json();
    const json2 = await response2.json();
    Logger.info('Comparing API responses');
    expect(json1).toEqual(json2);
  }

  /**
   * Measure API response time
   */
  static async measureResponseTime(response) {
    const headers = await response.headers();
    Logger.debug('Response timing', headers);
  }
}
