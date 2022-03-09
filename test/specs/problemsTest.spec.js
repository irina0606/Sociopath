const { expect: chaiExpect, assert } = require("chai");
const { userCredentials } = require("../data/login.data");

const ProblemsPage = require("../pageobjects/Problems.page");
const LoginPage = require("../pageobjects/Login.page");
const PublicationsPage = require("../pageobjects/Publications.page");
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");

const columnArray = [""]


describe('Problems Page', async() => {
    before (async () => {
        await LoginPage.login(userCredentials.email, userCredentials.pw);
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.problemsOption.click();
    })

    it('Should open Problems Page ', async () => {
        const getProblemsTitle = await ProblemsPage.problemsTitle.getText();
        expect (getProblemsTitle).toEqual("problems");
    });

    it ("Should show columns", async () => {
        await ProblemsPage.columns.click();
        await ProblemsPage.columns.waitForDisplayed();
        expect (ProblemsPage.columns).toBeDisplayedInViewport();

    })
});

