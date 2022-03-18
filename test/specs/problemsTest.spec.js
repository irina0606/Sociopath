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
        expect (ProblemsPage.columnsTooltip).not.toBeDisplayedInViewport();
        const columns = await ProblemsPage.getColumnNames (ProblemsPage.columnsTooltipArr);         // ask
        console.log(columns + "+++++++++++++++++++++++++++++++++++++++");
        expect (ProblemsPage.columnsTooltip).not.toHaveValueContaining(columnArray.toString());     //ask
        expect(ProblemsPage.columnsTooltipArr).toExist();
        await ProblemsPage.columns.click();
        expect(ProblemsPage.columnsTooltipArr).toExist();

    });

    it ("Should verify the number of columns", async () => {
        await ProblemsPage.columns.click();
        await ProblemsPage.inputFindColumn.waitForDisplayed();
        const namesList = await ProblemsPage.columnNamesArr;
        console.log(namesList.length + "=========================================");
        //await ProblemsPage.toggleColumnNames(namesList);
        //console.log(JSON.stringify(untoggle) + "+++++++++++++++++++++++++++++++++++++++");
        // expect(untoggle).toBeDisplayedInViewport();
        // await ProblemsPage.problemNameToggle.click();
        // console.log(JSON.stringify(untoggle) + "+++++++++++++++++++++++++++++++++++++++");
    });

    // it ("Should untoggle and toggle any column", async () => {
    //     await ProblemsPage.columns.click();
    //     await ProblemsPage.columnsTooltip.click();
    //     //await browser.pause(3000);
    //     const namesList = await ProblemsPage.columnNamesArr;
    //     console.log(namesList.length + "=========================================");
    //     await ProblemsPage.toggleColumnNames(namesList);
    //     //console.log(JSON.stringify(untoggle) + "+++++++++++++++++++++++++++++++++++++++");
    //     // expect(untoggle).toBeDisplayedInViewport();
    //     // await ProblemsPage.problemNameToggle.click();
    //     // console.log(JSON.stringify(untoggle) + "+++++++++++++++++++++++++++++++++++++++");
    //
    // })
});

