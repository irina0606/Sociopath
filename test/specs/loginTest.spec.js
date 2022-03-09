const LoginPage = require("../pageobjects/Login.page");
const PublicationPage = require('../pageobjects/Publications.page');
const LoginData = require('../data/login.data');
const { clearInput } = require('../helpers/uiMethods')


describe("Login page", () => {

    before(async () => {
        //await browser.setWindowSize(1650, 1050);
        await LoginPage.open();
    });

    it("TC-1: Verify the Login title is visible", async () => {
        await expect (LoginPage.loginTitle).toHaveText("Login")
    });

    it("TC-2: Verify the URL", async () => {
        await expect(browser).toHaveUrl("https://enduring.netlify.app/login")
    });

    it("TC-3: Verify the title", async () => {
        await expect(browser).toHaveTitle("App")
    });

    it("TC-4: Verify if user can clear input fields", async () => {
        await LoginPage.open();
        let emptyEmailField = LoginPage.inputEmail.getValue();
        let emptyPasswordField = LoginPage.inputPassword.getValue();
        await LoginPage.inputEmail.setValue(LoginData.userCredentials.wrongEmail);
        await LoginPage.inputPassword.setValue(LoginData.userCredentials.wrongPassword);
        await clearInput(LoginPage.inputEmail);
        await clearInput(await LoginPage.inputPassword);
        await expect(LoginPage.inputEmail.getValue()).toEqual(emptyEmailField);
        await expect(LoginPage.inputPassword.getValue()).toEqual(emptyPasswordField);
    });

    it("TC-5: Verify if user can log in with the valid credentials", async () => {
        await LoginPage.login(LoginData.userCredentials.email, LoginData.userCredentials.pw);
        await expect(PublicationPage.publicationsTitle).toBeExisting();
        await expect(PublicationPage.publicationsTitle).toHaveTextContaining('publications');
    });
});
