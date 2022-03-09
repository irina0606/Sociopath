const { expect: chaiExpect, assert } = require("chai");

const PeoplePage = require("../pageobjects/People.page");
const LoginPage = require("../pageobjects/Login.page");
const LoginData = require('../data/login.data');
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");
const {userCredentials} = require("../data/login.data");

describe('Test suite for People page', async () => {

    before (async () => {
        await LoginPage.login(userCredentials.email, userCredentials.password);
        await GlobalNavigationPage.btnMenu.click();
        await GlobalNavigationPage.peopleOption.click();
    });

    it('should verify the user to be on the People Page', async () => {
        const text = await PeoplePage.peopleTitle.getText();
        await expect(text).toEqual("people");
    });

    it('should ', async () => {

    });
});