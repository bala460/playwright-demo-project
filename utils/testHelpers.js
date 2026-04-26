import { expect } from '@playwright/test';
import { Logger } from './logger.js';
import * as allure from "allure-js-commons";
import { log } from 'node:console';

/**
 * TestHelpers - Common test utility functions
 */
export class TestHelpers {
  /**
   * Wait for element and fill text
   */
  static async fillInput(page, selector, text) {
    Logger.info(`Filling input "${selector}" with text`);
    await allure.logStep(`Filling input "${selector}" with text: ${text}`);

    await page.waitForSelector(selector);
    await page.fill(selector, text);
  }

  /**
   * Wait for element and click
   */
  static async clickElement(page, selector) {
    Logger.info(`Clicking element "${selector}"`);
    await allure.logStep(`Clicking element "${selector}"`);
    await page.waitForSelector(selector);
    await page.click(selector);
  }

  /**
   * Get text content from element
   */
  static async getElementText(page, selector) {
    Logger.info(`Getting text from element "${selector}"`);
    await allure.logStep(`Getting text from element "${selector}"`);
    await page.waitForSelector(selector);
    return await page.textContent(selector);
  }

  /**
   * Wait for URL to match pattern
   */
  static async waitForURL(page, urlPattern) {
    Logger.info(`Waiting for URL: ${urlPattern}`);
    await allure.logStep(`Waiting for URL: ${urlPattern}`);
    await page.waitForURL(urlPattern);
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshots/${name}-${timestamp}.png`;
    Logger.info(`Taking screenshot: ${filename}`);
    await allure.logStep(`Taking screenshot: ${filename}`);
    await page.screenshot({ path: filename });
    return filename;
  }

  /**
   * Verify element is visible
   */
  static async isElementVisible(page, selector) {
    Logger.info(`Checking if element is visible: "${selector}"`);
    await allure.logStep(`Checking if element is visible: "${selector}"`);
    return await page.isVisible(selector);
  }

  /**
   * Verify element contains text
   */
  static async verifyElementText(page, selector, expectedText) {
    Logger.info(`Verifying element "${selector}" contains: "${expectedText}"`);
    await allure.logStep(`Verifying element "${selector}" contains: "${expectedText}"`);
    const text = await this.getElementText(page, selector);
    expect(text).toContain(expectedText);
  }

  /**
   * Switch to iframe and interact
   */
  static async interactWithIframe(page, iframeSelector, action) {
    Logger.info(`Interacting with iframe: ${iframeSelector}`);
    await allure.logStep(`Interacting with iframe: ${iframeSelector}`);
    const frame = page.frameLocator(iframeSelector);
    return await action(frame);
  }

  /**
   * Handle multiple tabs/windows
   */
  static async handleMultipleContexts(browser, testFunction) {
    Logger.info('Handling multiple browser contexts');
    await allure.logStep('Handling multiple browser contexts');
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    try {
      await testFunction(context1, context2);
    } finally {
      await context1.close();
      await context2.close();
    }
  }

  /**
   * Retry failed operation
   */
  static async retry(operation, retries = 3, delay = 1000) {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        Logger.info(`Attempting operation (try ${i + 1}/${retries})`);
        await allure.logStep(`Attempting operation (try ${i + 1}/${retries})`);
        return await operation();
      } catch (error) {
        lastError = error;
        Logger.warn(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await allure.logStep(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw lastError;
  }

  /**
   * Mock API responses
   */
  static async mockAPIResponse(page, urlPattern, responseData) {
    Logger.info(`Mocking API response for ${urlPattern}`);
    await allure.logStep(`Mocking API response for ${urlPattern}`);
    await page.route(urlPattern, route => {
      route.abort();
      route.continue({ response: {
        status: 200,
        body: JSON.stringify(responseData),
      }});
    });
  }

  /**
   * Compare visual regression
   */
  static async compareScreenshot(page, screenshotName) {
    Logger.info(`Comparing screenshot: ${screenshotName}`);
    await allure.logStep(`Comparing screenshot: ${screenshotName}`);
    await expect(page).toHaveScreenshot(`${screenshotName}.png`);
  }
}
