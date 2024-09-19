
const { By } = require("selenium-webdriver");
const assert = require('assert');


class SignUpPage{
    constructor(driver) {
        this.driver = driver;
        this.username = By.id("sign-username");
        this.password = By.id("sign-password");
        this.signUpBtn = By.css('button[onclick="register()"]');
    }

    async enterUsername(username1){
        let userName = await this.driver.findElement(this.username);
        await userName.sendKeys(username1);
    }

    async enterPassword(pass){
        let password1 = await this.driver.findElement(this.password);
        await password1.sendKeys(pass);
    }

    async clickSignUpBtn() {
        let SignUpBtn = await this.driver.findElement(this.signUpBtn);
        await SignUpBtn.click();
    }

    async emptySignUpFieldsAlert() {
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        await assert.equal(alertText, "Please fill out Username and Password.");
        await alert.accept();
    }

    async userAlreadyExistAlert() {
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        await assert.equal(alertText, "This user already exist.");
        await alert.accept();
    }

    async userSuccessfullySignUpAlert() {
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        await assert.equal(alertText, "Sign up successful.");
        await alert.accept();
    }

}

module.exports = SignUpPage;