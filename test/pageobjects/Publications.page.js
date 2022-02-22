const Page = require ("./Page");
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");

class PublicationsPage extends Page {

    get publicationsTitle() {return $("//h6[text()='publications']");}

    get btnAddPost(){return $('//button[text()=\'Add Publication\']');}

    get first_btnLike(){return $('(//button[@id=\'like-btn\'])[1]');}

    get btnComment(){return $('#comment-btn');}

    get inputComment(){return $('#comment-input');}

    get sendComment(){return $('#send-btn');}

    get publicationsList (){return $('div.pb-4>div:nth-child(2)>div>a>div');}

    get comments (){return $('div[class=\'bg-light p-2\'] div:nth-child(2)');}

    get btnLoadMore(){return $('//div[@class=\'btn-link\']');}

    get btnLike(){return $('#like-btn');}

    get mlCountLike() {return $('(//span[@class="ml-1"])[1]');}

    // async getToPublicationsPage() {
    //     await GlobalNavigationPage.clickMenu();
    //     await GlobalNavigationPage.clickPublications();
    // }

    findPublication(title) {
        return this.publicationsList.find(async (publication) =>
            await publication.$("div>a[href*='/publication/']").getText() === title);
    }

    async  createComments(text) {
        for (let i = 1; i <= 3; i++) {
            await this.inputComment.click();
            await this.inputComment.setValue(text + `${i}`);
            await this.sendComment.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            let temp = await this.comments.getText();
            await expect(temp).toEqual(text + `${i}`);
        }
    }

    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();