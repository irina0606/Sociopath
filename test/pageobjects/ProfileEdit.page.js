const Page = require('./Page');
const {clearInput} = require("../../test/helpers/uiMethods");

class ProfileEditPage extends Page {

    get container() {
        return $("//div[@class='container']");
    }

    get inputFirstName() {
        return $('#first-name');
    }

    get inputLastName() {
        return $('#last-name');
    }

    get inputJobTitle() {
        return $('#job-title');
    }

    get inputImageLink() {
        return $('#image');
    }

    get inputAbout() {
        return $('#about');
    }

    get labelAbout() {
        return $('#about-label');
    }

    get langDropdownBtn() {
        return $("//button[@title='Open']");
    }

    get langInputField() {
        return $("#languages");
    }

    get langOption() {
        return $("//li[@id='languages-option-0']");
    }

    get dropdownLanguages() {
        return $$("//ul[@id='languages-listbox']/li");
    }

    get anyLangFromDropdown() {
        return $("//ul[@id='languages-listbox']/li");
    }

    get selectedLangs() {
        return $$("//span[@class='MuiChip-label MuiChip-labelSmall css-1pjtbja']");
    }

    get cleanLang() {
        return $("(//button[@title='Clear'])");
    }

    get emptyDropdown() {
        return $("div[class='MuiAutocomplete-noOptions css-t0bixx']");
    }

    get btnSave() {
        return $('//button[@type="submit"]');
    }

    get btnCancel() {
        return $("//button[normalize-space()='Cancel']");
    }

    async cleanForm() {
        await clearInput(this.inputFirstName);
        await clearInput(this.inputLastName);
        await clearInput(this.inputJobTitle);
        await clearInput(this.inputImageLink);
        await clearInput(this.inputAbout);
        await this.langInputField.click();
        await this.langInputField.click();
        await this.cleanLang.click();
    }

    async fillForm(firstName, lastName, jobTitle, imageLink, about) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputJobTitle.setValue(jobTitle);
        await this.inputImageLink.setValue(imageLink);
        await this.inputAbout.setValue(about);
    }

    async selectAllLanguages() {
        do {                                                           // if we don`t know the quantity of languages
            await this.langOption.click();
            await this.langInputField.click();
        }
        while (await this.langOption.isClickable());
        await this.langInputField.click();

        // for (let i = 0; i <= 17; i++) {                             // if we know the quantity of languages
        //     await this.langInputField.click();
        //     await this.langOption.click();
        // }
    }

    async getLang(list) {
        const langList = [];
        await list.map(async (elem) => langList.push(await elem.getText()));
        return langList;
    }

    async getSpecificLangs (list, text) {
        return list.filter(lang => lang.includes(`${text}`));
    }

    open() {
        return super.open('/edit');
    }
}

module.exports = new ProfileEditPage();