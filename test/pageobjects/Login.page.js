const Page = require('./Page');

class LoginPage extends Page {

    get loginTitle() {
        return $("//h3")
    }

    get inputEmail() {
        return $("#email");
    }

    get inputPassword() {
        return $("#password");
    }

    get btnLogin() {
        return $("button[type=\"submit\"]");
    }

    get titleOfInputEmailBox() {
        return $("//label[@id = 'email-label']" );
    }

    get titleOfInputPasswordBox() {
        return $("//label[@id = 'password-label'] ");
    }

    get hrefReset() {
        return $("//a[@href='/passwordReset']");
    }

    get hrefSignup() {
        return $("//a[@href='/signup']");
    }

    get popupAlert() {
        return $("//div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 m-auto login-form p-4 css-aoeo82']//form");
    }

    async login(userEmail, password) {
        await this.open();
        await this.inputEmail.setValue(userEmail);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
        await browser.pause(3000)
    }

    open() {
        return super.open("/login");
    }
}
module.exports = new LoginPage();