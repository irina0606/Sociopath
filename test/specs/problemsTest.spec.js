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
    })

    it('Should open Problems Page ', async () => {
        const getProblemsTitle = await ProblemsPage.problemsTitle.getText();
        expect (getProblemsTitle).toEqual("problems");
    });

    it ("Should show tooltip wth column names and hide it ", async () => {
        await ProblemsPage.columns.click();
        expect (ProblemsPage.columnsTooltip).toBeDisplayedInViewport();
        const columns = await ProblemsPage.getColumnNames (ProblemsPage.columnsTooltipArr);         // ask
        console.log(columns + "+++++++++++++++++++++++++++++++++++++++");
        expect (ProblemsPage.columnsTooltip).not.toHaveValueContaining(columnArray.toString());     //ask
        expect(ProblemsPage.columnsTooltipArr).toExist();
        await ProblemsPage.columns.click();
        expect(ProblemsPage.columnsTooltipArr).not.toExist();
    });

    it ("Should verify the number of columns", async () => {
        await ProblemsPage.columns.click();
        expect (ProblemsPage.columnsTooltip).toBeDisplayedInViewport();
        const columns = await ProblemsPage.columnsTooltipArr.length;         // ask
        console.log(columns + "+++++++++++++++++++++++++++++++++++++++");
        expect(columns).toEqual(5);
    });

    it ("Should untoggle and toggle any column", async () => {
        await ProblemsPage.toggleColumnNames(ProblemsPage.columnsTooltipArr);
        //console.log(JSON.stringify(untoggle) + "+++++++++++++++++++++++++++++++++++++++");
        // expect(untoggle).toBeDisplayedInViewport();
        // await ProblemsPage.problemNameToggle.click();
        // console.log(JSON.stringify(untoggle) + "+++++++++++++++++++++++++++++++++++++++");

    })
});

