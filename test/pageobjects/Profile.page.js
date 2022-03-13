const Page = require('./Page');
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page")

class ProfilePage extends Page {

    get title () {
        return $("//h6[text()='user']");
    }

    get btnBack() {
        return $(".btn.btn-link")
    }

    get editBtn () {
        return $("//body//div//div//div//button[contains(@type,'button')]");
    }

    get profileImageInitials () {
        return $("//div[@class='profile-image initials']");
    }

    get profileName() {
        return $("//div[@class = 'MuiTypography-root MuiTypography-h4 css-1xvinid']");
    }
    get aboutInfo() {
        return $("//p[@class='MuiTypography-root MuiTypography-body1 css-18m8r0v']//div[2]");
    }

    get checkEmail () {
        return $("//div[3]");
    }

    async getToProfilePage() {
        await GlobalNavigationPage.clickMenu();
        await GlobalNavigationPage.clickProfile();
    }

    open() {
        return super.open('/profile');
    }
}
module.exports = new ProfilePage();