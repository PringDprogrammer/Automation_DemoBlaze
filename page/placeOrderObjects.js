const { By, until } = require("selenium-webdriver");
const assert = require("assert");

class PlaceOrder {

    constructor(driver) {
        this.driver = driver;
        this.placeOrderBtn = By.xpath('//button[@type="button" and contains(text(), "Place Order")]');
    }

    async clickPlaceOrder() {
        await this.driver.wait(until.elementLocated(this.placeOrderBtn), 10000);
        let orderBtn = await this.driver.findElement(this.placeOrderBtn);
        console.log(await orderBtn.getText());

    }

}


module.exports = PlaceOrder;