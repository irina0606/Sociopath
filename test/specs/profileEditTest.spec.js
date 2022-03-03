const { expect: chaiExpect, assert } = require("chai");
const {userCredentials} = require("../data/login.data");

const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const ProfileEditPage = require("../pageobjects/ProfileEdit.page");
const { compareElementsOfArrays } = require('../helpers/uiMethods');
const firstNameString = "Mary";
const lastNameString = "Star";
const jobTitleString = "QA Lead";
const imageLinkString = "https://static7.depositphotos.com/1297553/795/i/600/depositphotos_7951909-stock-photo-team-of-lifting-it-information.jpg";
const aboutString = "the best";
const langListDropdown = [".NET", "C", "C++", "C#", "Go", "Dart", "JavaScript", "Java", "Objective-C", "Kotlin", "Perl", "PHP", "Ruby", "Python", "Scala", "Rust", "TypeScript", "Swift"];
const langListInput = [".NET", "C", "C++", "C#", "Go", "Dart", "JavaScript", "Java", "Objective-C", "Kotlin", "Perl", "PHP", "Ruby", "Python", "Scala", "Rust", "TypeScript", "Swift"];

describe("Profile edit page", async () => {

    before(async () => {
        await LoginPage.login(userCredentials.email, userCredentials.pw);
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
        await ProfilePage.editBtn.click();
    });

    it('TC#1: Should contain label about', async () => {
        const aboutLabel = await ProfileEditPage.labelAbout.getText();
        await chaiExpect(aboutLabel).to.equal("About");
    });

    it('TC#2: Should contain label about - negative', async () => {
        const aboutLabel = await ProfileEditPage.labelAbout.getText();
        await chaiExpect(aboutLabel).not.to.equal("About@");
    });

    it('TC#3: Should be able click Cancel button, be redirected to profile page and back to edit', async () => {
        await expect(ProfileEditPage.btnCancel).toBeClickable();
        await ProfileEditPage.btnCancel.click();
        const titleText = await ProfilePage.title.getText();
        expect(titleText).toEqual("user");
        await ProfilePage.editBtn.click();
        const url = await browser.getUrl();
        await chaiExpect(url).to.include('/edit');
    });

    it("TC#4: Should be able to clean the form", async () => {
        await ProfileEditPage.cleanForm();
        const firstNameField = await ProfileEditPage.inputFirstName.getValue();
        await chaiExpect(firstNameField.length).to.equal(0);
        const lastNameField = await ProfileEditPage.inputLastName.getValue();
        await assert.isEmpty(lastNameField);
        const jobTitleField = await ProfileEditPage.inputJobTitle.getValue();
        await expect(jobTitleField.length).toEqual(0);
        const imageLinkField = await ProfileEditPage.inputImageLink.getValue();
        await expect(imageLinkField.length).toEqual(0);
        const aboutField = await ProfileEditPage.inputAbout.getValue();
        await expect(aboutField.length).toEqual(0);
        const langField = await ProfileEditPage.langInputField.getValue();
        await expect(langField.length).toEqual(0);

    });

    it("TC#5: Should be able to count languages in the dropdown and return all names", async () => {
        const length = (await ProfileEditPage.getLang(ProfileEditPage.dropdownLanguages)).length;
        const names = (await ProfileEditPage.getLang(ProfileEditPage.dropdownLanguages));
        await expect(length).toEqual(18);
        await expect(await compareElementsOfArrays(names, langListDropdown)).toEqual(true);
    });

    it("TC#5: Should be able to count languages in the dropdown and return langs with first letter 'J'", async () => {
        const letter = "J";
        const arr = await ProfileEditPage.getSpecificLangs(langListDropdown, letter);
        console.log("+++++++++++++++" + arr);
        expect(arr.length).toEqual(2);
    });
    //
    // it("TC#6: Should be able to sort languages in the dropdown and check if they are in asc order", async () => {
    //     const names = (await ProfileEditPage.getLang(ProfileEditPage.dropdownLanguages)).toString();
    //     const namesAsc = (await ProfileEditPage.getLang(ProfileEditPage.dropdownLanguages)).sort().toString();
    //     await expect(names === namesAsc);
    // });
    //
    // it("TC#7: Should be able to select and count selected languages in the languages field", async () => {
    //     await ProfileEditPage.selectAllLanguages();
    //     const length= (await ProfileEditPage.getLang(ProfileEditPage.selectedLangs)).length;
    //     const names = (await ProfileEditPage.getLang(ProfileEditPage.selectedLangs));
    //     await expect(length).toEqual(18);
    //     await expect(await compareElementsOfArrays(names, langListInput)).toEqual(true);
    // });
    //
    // it("TC#8: Should compare Languages after selection", async () => {
    //     const length1 = (await ProfileEditPage.getLang(ProfileEditPage.dropdownLanguages)).length;
    //     const names1 = (await ProfileEditPage.getLang(ProfileEditPage.dropdownLanguages)).toString();
    //     const length2= (await ProfileEditPage.getLang(ProfileEditPage.selectedLangs)).length;
    //     const names2= (await ProfileEditPage.getLang(ProfileEditPage.selectedLangs)).toString();
    //     await expect(length1).not.toEqual(length2);
    // });
    //
    // it('TC#9: Should verify empty Dropdown', async () => {
    //     await ProfileEditPage.langInputField.click();
    //     const names = (await ProfileEditPage.getLang(ProfileEditPage.dropdownLanguages));
    //     await chaiExpect(names).to.deep.equal([]);
    //     await expect(ProfileEditPage.emptyDropdown).toHaveText("No options");
    // });
    //
    // it("TC#10: Should be able to fill the form and check the field first name", async () => {
    //     await ProfileEditPage.fillForm(firstNameString, lastNameString, jobTitleString, imageLinkString, aboutString);
    //     const getFirstName = await ProfileEditPage.inputFirstName;
    //     expect(getFirstName.inputFirstName).toHaveText(firstNameString);
    //     await chaiExpect(getFirstName).to.not.be.empty;
    // });
    //
    // it ('TC#11: Should be able to remove all languages and select one lang', async () => {
    //     await ProfileEditPage.langDropdownBtn.click();
    //     await ProfileEditPage.cleanLang.click();
    //     const oneLang = await ProfileEditPage.dropdownLanguages[5].getText();
    //     await chaiExpect(oneLang).to.be.equal("Go");
    //     await ProfileEditPage.dropdownLanguages[5].click();
    //     await expect(ProfileEditPage.selectedLangs[0]).toHaveText("Go");
    // });
    //
    // it("TC#12: Should be able to  save", async () => {
    //     await ProfileEditPage.btnSave.click();
    //     const titleText = await ProfilePage.title.getText();
    //     expect(titleText).toEqual("user");
    //     expect(ProfilePage.aboutInfo).toHaveTextContaining(aboutString);
    // });
});

