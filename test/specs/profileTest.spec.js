const { expect: chaiExpect, assert } = require("chai");

const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const { getInitials } = require("../helpers/uiMethods");
const LoginData = require('../data/login.data');
const Publications = require('../pageobjects/Publications.page');

describe("Profile page", () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.login(LoginData.userCredentials.email, LoginData.userCredentials.password);
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
    })

    it("Verify the user login under correct email", async () => {
        const emailText = await ProfilePage.checkEmail;
        const email = LoginData.userCredentials.email;
        await expect(emailText).toHaveTextContaining(email);
    });

    it('Should redirect on Profile Page', async () => {
        const titleText = await ProfilePage.title.getText();
        await expect(titleText).toEqual("user");
    });

    it("ImageLetter should match FullName", async () => {
        const fullName = ProfilePage.profileName.getText();
        const nameInit = getInitials(fullName);
        const imageInit = ProfilePage.profileImageInitials.getText();
        await expect(nameInit).toEqual(imageInit);
    });

    it('Button back should redirect on Publication Page ', async () => {
        await ProfilePage.btnBack.click();
        const addPublication = Publications.btnAddPost;
        await expect(addPublication).toHaveText('ADD PUBLICATION');
    });
});
