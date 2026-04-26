import { expect } from '@playwright/test'

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async open(url) {
        return await this.page.goto(url);
    }

    async getTitle() {
        return await this.page.title();
    }

    async pause(){
        return await this.page.pause();
    }

    async getURL() {
        return this.page.url();
    }

    async wait(){
        return await this.page.waitForTimeout(10000);
    }

    async waitAndclick(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async waitForPageLoad() {
        return await this.page.waitForLoadState('domcontentloaded');
    }

    async waitAndHardClick(selector) {
        return await this.page.$eval(selector, el => el.click());
    }

    async waitAndFill(selector, text) {
        return await this.page.fill(selector, text);
    }

    async keyPress(selector, key) {
        return await this.page.press(selector, key);
    }

    async takeScreenshot() {
        return await this.page.screenshot({ path: `screenshots/${Date.now()}.png` });
    }

    async verifyElementText(selector, expectedText) {
        const text = await this.page.textContent(selector);
        return expect(text.trim()).toBe(expectedText);
    }

    async verifyElementContainsText(selector, expectedText) {
        const text = await this.page.textContent(selector);
        return expect(text).toContain(expectedText);
    }

    async verifyJSElementValue(selector, text) {
        const value = await this.page.$eval(selector, el => el.value);
        return expect(value.trim()).toBe(text);
    }

    async selectValueFromDropdown(selector, value) {
        const dropdown = await this.page.$(selector);
        return await dropdown.selectOption({ value });
    }

    async verifyElementAttribute(selector, attribute, expectedValue) {
        const attrValue = await this.page.$eval(selector, (el, attr) => el.getAttribute(attr), attribute);
        return expect(attrValue.trim()).toBe(expectedValue);
    }

    async getFirstElementFromTheList(selector) {
        const row = await this.page.locator(selector);
        return await row.nth(0).textContent();
    }

    async getLastElementFromTheList(selector) {
        const row = await this.page.locator(selector);
        const count = await row.count();
        return await row.nth(count - 1).textContent();
    }

    async clickAllElements(selector) {
        const row = await this.page.locator(selector);
        const count = await row.count();
        for (let i = 0; i < count; i++) {
            await row.nth(i).click();
        }
    }

    async clickAllLinksInNewTabs(selector) {
        const rows = await this.page.locator(selector);
        const count = await rows.count();
        for (let i = 0; i < count; i++) {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                rows.nth(i).click({ button: 'middle' }),
            ]);
            await newPage.waitForLoadState();
        }
    }

    async isElementIsVisible(selector) {
        const element = await this.page.locator(selector);
        try{
            const isVisible = await element.isVisible();
            expect(isVisible).toBeTruthy();

        }catch(error){
            throw new Error(`Element with selector "${selector}" is not visible. Error: ${error.message}`);
        }
    }

    async isElementIsChecked(selector) {
        const element = await this.page.locator(selector);
        try{
            const isChecked = await element.isChecked();
            expect(isChecked).toBeTruthy();
        }catch(error){
            throw new Error(`Element with selector "${selector}" is not checked. Error: ${error.message}`);
        }
    }

    async isElementIsNotVisible(selector) {
        const element = await this.page.locator(selector);
        return expect(element).toBeHidden();
    }


    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }
}
export default BasePage;