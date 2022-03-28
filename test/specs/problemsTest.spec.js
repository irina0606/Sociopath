const { expect: chaiExpect, assert } = require("chai");
const { userCredentials } = require("../data/login.data");

const ProblemsPage = require("../pageobjects/Problems.page");
const LoginPage = require("../pageobjects/Login.page");
const PublicationsPage = require("../pageobjects/Publications.page");
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");

const columnArray = ["Problem name", "Position", "Company", "Solutions", "creator"];


describe('Problems Page', async() => {
    before (async () => {
        await LoginPage.login(userCredentials.email, userCredentials.pw);
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.problemsOption.click();
        await ProblemsPage.columns.click();
    })

    it('Should open Problems Page ', async () => {
        const getProblemsTitle = await ProblemsPage.problemsTitle.getText();
        expect (getProblemsTitle).toEqual("problems");
    });

    it ("Should show tooltip wth column names and hide it ", async () => {
        await ProblemsPage.columns.click();
        expect (ProblemsPage.columnsTooltip).toBeDisplayedInViewport();
        const columns = await ProblemsPage.getColumnNames (await ProblemsPage.columnNamesArr);         // ask
        console.log(columns + "+++++++++++++++++++++++++++++++++++++++");
        expect (ProblemsPage.columnsTooltip).not.toHaveValueContaining(columnArray.toString());     //ask
        expect(ProblemsPage.columnNamesArr).toExist();
        await ProblemsPage.columns.click();
        expect(ProblemsPage.columnNamesArr).not.toExist();
    });

    it ("Should verify the number of columns", async () => {
        await ProblemsPage.columns.click();
        expect (ProblemsPage.columnsTooltip).toBeDisplayedInViewport();
        const columns = await ProblemsPage.columnNamesArr.length;         // ask
        console.log(columns + "+++++++++++++++++++++++++++++++++++++++");
        expect(columns).toEqual(5);
    });

    // it ("Should untoggle and toggle any column", async () => {
    //     await ProblemsPage.toggleColumnNames(await ProblemsPage.columnNamesArr);
    //     expect()
    //     await ProblemsPage.toggleColumnNames(await ProblemsPage.columnNamesArr);
    // })
});

