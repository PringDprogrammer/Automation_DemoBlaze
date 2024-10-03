const { Builder } = require("selenium-webdriver")

const assert = require("assert");


class BasePage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async openUrl(url) {
        await this.driver.get(url);
    }

    // this is to validate the current URL
    async getURL() {
        let getUrl = await this.driver.getCurrentUrl();
        await assert.strictEqual(getUrl, "https://www.demoblaze.com/index.html");
        console.log("URL:", getUrl);
    }

}

module.exports = BasePage;