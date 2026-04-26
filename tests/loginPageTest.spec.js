import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.js';
import { TestData } from '../utils/testData.js';
import * as allure from "allure-js-commons";


test.describe('Login Page Tests', async () => {

  test('should display error message for invalid credentials', async ({ page }) => { 
    await allure.severity("medium");
    const loginPage = new LoginPage(page);
    await loginPage.openApp();
    await loginPage.login(TestData.INVALID_USER.user, TestData.INVALID_USER.password);
    await loginPage.validateErrorMessage(TestData.ERROR_MESSAGE.usernameError);
  });

  test('should display error message for invalid credentials (password)', async ({ page }) => {
    await allure.severity("low");
    const loginPage = new LoginPage(page);
    await loginPage.openApp();
    await loginPage.login(TestData.VALID_USER.user, TestData.INVALID_USER.password);
    await loginPage.validateErrorMessage(TestData.ERROR_MESSAGE.passwordError);
  });

  test('should display error message for invalid credentials with empty password', async ({ page }) => {
    await allure.severity("low");
    const loginPage = new LoginPage(page);
    await loginPage.openApp();
    await loginPage.login(TestData.VALID_USER.user, "");
    await loginPage.validateErrorMessage(TestData.ERROR_MESSAGE.passwordError);
  });

  test('should display error message for invalid credentials (username)', async ({ page }) => {
    await allure.severity("medium");
    const loginPage = new LoginPage(page);
    await loginPage.openApp();
    await loginPage.login(TestData.INVALID_USER.user, TestData.VALID_USER.password);
    await loginPage.validateErrorMessage(TestData.ERROR_MESSAGE.usernameError);
  });

  test('should display error message for invalid credentials with empty username', async ({ page }) => {
    await allure.severity("medium");
    const loginPage = new LoginPage(page);
    await loginPage.openApp();
    await loginPage.login("", TestData.VALID_USER.password);
    await loginPage.validateErrorMessage(TestData.ERROR_MESSAGE.usernameError);
  });


  test('should display error message for invalid credentials with empty username and password', async ({ page }) => {
    await allure.severity("medium");
    const loginPage = new LoginPage(page);
    await loginPage.openApp();
    await loginPage.login("", "");
    await loginPage.validateErrorMessage(TestData.ERROR_MESSAGE.usernameError);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await allure.severity("critical");
    const loginPage = new LoginPage(page);
    await loginPage.openApp();
    await loginPage.login(TestData.VALID_USER.user, TestData.VALID_USER.password);    
    // Add validation for successful login here
  });

});