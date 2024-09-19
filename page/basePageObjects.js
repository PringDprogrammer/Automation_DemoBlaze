const { Builder } = require("selenium-webdriver")

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async openUrl(url) {
        await this.driver.get(url);
    }

}

module.exports = BasePage;