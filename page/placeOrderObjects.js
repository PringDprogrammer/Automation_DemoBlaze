const { By, until } = require("selenium-webdriver");
const assert = require("assert");

class PlaceOrder {

    constructor(driver) {
        this.driver = driver;
        this.placeOrderBtn = By.xpath('//button[@type="button" and contains(text(), "Place Order")]');
        this.purchaseBtn = By.xpath('//button[contains (text(), "Purchase")]');
        this.closeBtn = By.xpath("//div[contains(@id, 'orderModal')]//button[contains(@data-dismiss, 'modal') and text()='Close']");
        this.modalOrder = By.xpath('//div[@id="orderModal"]');
    }

    async clickPlaceOrder() {
        // wait for the place order button to be located
        await this.driver.wait(until.elementLocated(this.placeOrderBtn), 10000);
        let orderBtn = await this.driver.findElement(this.placeOrderBtn);
        await orderBtn.click();
        console.log("button clicked!");
        await this.driver.sleep(3000);

    }

    async clickCloseBtn() {

            try {
                let modal = await this.driver.findElement(this.modalOrder);
                await this.driver.wait(until.elementIsVisible(modal), 10000);
                console.log("modal is visible");

                // Scroll down the modal
                await this.driver.executeScript('arguments[0].scrollTop = arguments[0].scrollHeight;', modal);
                await this.driver.sleep(5000);

                let close_Btn = await this.driver.findElement(this.closeBtn);
                
                // Click the Close button
                await close_Btn.click();
                
                console.log("Close button click!");
            }
            catch (error) {
                console.error(error);
            }
        
    }

    async clickPurchaseBtn() {

        await this.driver.wait(until.elementLocated(this.purchaseBtn), 100000);
        let purchaseBtn = await this.driver.findElement(this.purchaseBtn);
        await purchaseBtn.click();
        await this.driver.sleep(3000);

    }
    
    async purchaseAlertPrompt() {
        await this.driver.wait(until.alertIsPresent(), 10000);
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await assert.equal(alertText, "Please fill out Name and Creditcard.");
        await alert.accept();
        console.log("successfully accept the alert");
        await this.driver.sleep(2000);
    }
    

    async successfulPurchaseAlertPrompt() {
        await this.driver.wait(until.alertIsPresent(), 10000);
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await assert.equal(alertText, "Thank you for your purchase!");
        await alert.accept();
        console.log("successfully accept the alert");
        await this.driver.sleep(2000);
    }
}


module.exports = PlaceOrder;