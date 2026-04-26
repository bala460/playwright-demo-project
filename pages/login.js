import BasePage from "./basepage.js";
import { LoginPageLocators } from "../pageobject/login.js";
import { Config } from "../config/config.js";
import { TestHelpers } from "../utils/testHelpers.js";

class LoginPage extends BasePage {
    
    constructor(page) {
        super(page);
    }

    async openApp(){
        await super.open(Config.getBaseURL());
        return await super.waitForPageLoad();
    }

    async login(username, password) {
        await TestHelpers.fillInput(this.page, LoginPageLocators.usernameInput, username);
        await TestHelpers.fillInput(this.page, LoginPageLocators.passwordInput, password);
        await TestHelpers.clickElement(this.page, LoginPageLocators.submitInput);
    }    

    async submitLogin() {
        await TestHelpers.clickElement(this.page, LoginPageLocators.submitInput);
    }

    async validateErrorMessage(expectedMessage) {
        TestHelpers.verifyElementText(this.page, LoginPageLocators.errorMessage, expectedMessage);
    }

    async validatePageTitle(expectedTitle) {
        const title = await super.getTitle();
        expect(title).toBe(expectedTitle);
    }
}

export { LoginPage };
export default LoginPage;