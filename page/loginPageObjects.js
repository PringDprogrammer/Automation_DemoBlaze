const { By, until } = require("selenium-webdriver");
const assert = require('assert');


class LogInPage {
    constructor(driver){
        this.driver = driver;
        this.username = By.id("loginusername");
        this.password = By.id("loginpassword");
        this.loginBtn = By.css('button[onclick="logIn()"]');
        this.logoutBtn = By.id("logout2");
        this.welcomeUserName = By.css('#nameofuser');
    }

    async enterUsername(name) {
        let userName = await this.driver.findElement(this.username);
        await userName.sendKeys(name);
    }

    async enterPassword(pass) {
        let passWord = await this.driver.findElement(this.password);
        await passWord.sendKeys(pass);
        await this.driver.sleep(2000);
    }

    async clickLoginBtn() {
        let logInBtn = await this.driver.findElement(this.loginBtn);
        await logInBtn.click();
    }

    async isSuccessfullyLoggedIn() {

        while(true) {
            await this.driver.wait(until.elementLocated(this.welcomeUserName), 15000);
            console.log("Welcome name element was located");
        
            try {
                let name = await this.driver.findElement(this.welcomeUserName);
                await this.driver.wait(until.elementIsVisible(name), 15000)  
                const isDisplayed = await name.isDisplayed();

                if(isDisplayed) {
                        
                    await this.driver.wait(until.elementIsVisible(name), 10000);
                    console.log("Welcome element is now visible");
                    
                    let nameText = await name.getText();

                    assert.ok(nameText, `Welcome "${nameText}" is now visible`);
                    console.log(`Welcome "${nameText}" is now visible`);
                    await this.driver.sleep(2000);
                    break;
                }
                else {
                    console.error("Welcome name element is not displayed on the page.");
                }
                
            }
            catch(error) {
                if(error.name === "StaleElementReferenceError") {
                    // Re-try by re-fetching the table and rows
                    console.warn('StaleElementReferenceError occurred. Retrying...');
                    // Small delay before retrying
                    await this.driver.sleep(2000);
                }
                else {
                        // Log other errors for debugging and throw
                        console.error('An error occurred:', error);
                        throw error;
                }
            }
        }    

    }
    
    async userDoesNotExistAlert() {
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await assert.equal(alertText, "User does not exist.");
        await alert.accept();
    }

    async userWrongPasswordAlert() {
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await assert.equal(alertText, "Wrong password.");
        await alert.accept();
    }

    async userEmptyFieldAlert() {
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await assert.equal(alertText, "Please fill out Username and Password.");
        await alert.accept();
    }
}

module.exports = LogInPage;