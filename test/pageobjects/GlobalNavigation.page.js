const Page = require ('./Page');

class GlobalNavigationPage extends Page {

    get btnMenu() {
        return $("//button[@id='nav-bar-toggle']");
    }

    get publicationsOption(){
        return $("//span[text()='Publications']");
    }

    get peopleOption(){
        return $("#people");
    }

    get companiesOption(){
        return $("#companies");
    }

    get problemsOption(){
        return $("#problems");
    }

    get profileOption(){
        return $("#profile");
    }

    get logOutOption(){
        return $("#logout");
    }

    open () {
        return super.open('/publication');
    }
}
module.exports = new GlobalNavigationPage();