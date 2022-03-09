const Page = require('./Page');

class ProblemsPage extends Page {

    get problemsTitle () {
        return $ ("//h6[normalize-space()='problems']");
    }

    get newProblemButton () {
        return $ ("//button[normalize-space()='New Problem']");
    }

    get columns () {
        return $ ("//button[normalize-space()='Columns']");
    }

    get filters () {
        return $ ("//button[@aria-label='Show filters']");
    }

    get density () {
        return $ ("//button[@aria-label='Density']");
    }

    get export () {
        return $ ("//button[@aria-label='Export']");
    }

    get problemNameColumn () {
        return $ ("//div[contains(text(),'Problem name')]");
    }

    get positionColumn () {
        return $ ("//div[contains(text(),'Position')]");
    }

    get companyColumn () {
        return $ ("//div[contains(text(),'Company')]");
    }

    get solutionsColumn () {
        return $ ("//div[contains(text(),'Solutions')]");
    }

    get creatorColumn () {
        return $ ("//div[contains(text(),'Creator')]");
    }

    get pagination () {
        return $ ("//p[contains(text(),'1–10')]");
    }

    get pagePrev () {
        return $ ("//button[@title='Go to previous page']");
    }

    get pageNext () {
        return $ ("//button[@title='Go to next page']");
    }

    get columnsTooltip () {
        return $ (" //div[@role='tooltip']");
    }

    get findColumnField () {
        return $ ("//input[@type='text']");
    }

    get problemNameToggle () {
        return $ ("//span[normalize-space()='Problem name']");
    }

    get showAllBtn () {
        return $ ("//button[normalize-space()='Show all']");
    }

    get hideAllBtn () {
        return $ ("//button[normalize-space()='Hide all']");
    }



    open (){
        return super.open ("/problems");
    }
}
module.exports = new ProblemsPage();