const Page = require('./Page');
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");

class PeoplePage extends Page {

    get menuButton(){
        return $('//button[@id = "nav-bar-toggle"]');
    }

    get peopleTitle(){
        return $('//h6[text()="people"]');
    }

    get inviteButton(){
        return $('//button[text()="Invite"]');
    }

    get firstUserLink(){
        return $('//div[@class = "ml-2 user-text"]');
    }

    get firstUserImage() {
        return $('//div[@id="root"]/div/div/div[1]/div/a');
    }

    get firstUserTitle() {
        return $('//div[@id="root"]/div/div/div[1]/div/div/a/div[1]/b');
    }


    get firstUserJobTitle(){
        return $('//div[@id="root"]/div/div/div[1]/div/div/a/div[2]');
    }

    getToPeoplePage(){
        GlobalNavigationPage.clickMenu();
        GlobalNavigationPage.clickPeople();
    }
}

module.exports = new PeoplePage();