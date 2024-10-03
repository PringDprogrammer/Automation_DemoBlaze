const { By, until, Key } = require("selenium-webdriver");
const assert = require("assert");

class PlaceOrder {

    constructor(driver) {
        this.driver = driver;
        this.placeOrderBtn = By.xpath('//button[@type="button" and contains(text(), "Place Order")]');
        this.purchaseBtn = By.xpath('//button[contains (text(), "Purchase")]');
        this.closeBtn = By.xpath("//div[contains(@id, 'orderModal')]//button[contains(@data-dismiss, 'modal') and text()='Close']");
        this.modalOrder = By.xpath('//div[@id="orderModal"]');
        this.purchaseAlertBox = By.css('.sweet-alert.visible');
        this.purchaseAlertTitle = By.css('h2');
        this.purchaseAlertOkBtn = By.xpath('//button[@class="confirm btn btn-lg btn-primary" and contains(text(), "OK")]');
        this.orderName = By.id('name');
        this.orderCountry = By.id('country');
        this.orderCity = By.id('city');
        this.orderCard = By.id('card');
        this.orderMonth = By.id('month');
        this.orderYear = By.id('year');
    }

    async clickPlaceOrder() {
        // wait for the place order button to be located
        await this.driver.wait(until.elementLocated(this.placeOrderBtn), 10000);
        let orderBtn = await this.driver.findElement(this.placeOrderBtn);
        await orderBtn.click();
        console.log("Place order button click!");
        await this.driver.sleep(3000);

    }

    async enterName(name) {
        await this.driver.wait(until.elementLocated(this.orderName), 10000);
        let order_name = await this.driver.findElement(this.orderName);
        await order_name.sendKeys(name);
        await this.driver.sleep(3000);
    }

    async enterCountry(country) {
        await this.driver.wait(until.elementLocated(this.orderCountry), 10000);
        let order_country = await this.driver.findElement(this.orderCountry);
        await order_country.sendKeys(country);
        await this.driver.sleep(3000);
    }

    async enterCity(city) {
        await this.driver.wait(until.elementLocated(this.orderCity), 10000);
        let order_city = await this.driver.findElement(this.orderCity);
        await order_city.sendKeys(city);
        await this.driver.sleep(3000);
    }

    async enterCard(card) {
        await this.driver.wait(until.elementLocated(this.orderCard), 10000);
        let order_card = await this.driver.findElement(this.orderCard);
        await order_card.sendKeys(card);
        await this.driver.sleep(3000);
    }

    async enterMonth(month) {
        await this.driver.wait(until.elementLocated(this.orderMonth), 10000);
        let order_month = await this.driver.findElement(this.orderMonth);
        await order_month.sendKeys(month);
        await this.driver.sleep(3000);
    }

    async enterYear(year) {
        await this.driver.wait(until.elementLocated(this.orderYear), 10000);
        let order_year = await this.driver.findElement(this.orderYear);
        await order_year.sendKeys(year);
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
    
    async validateRequiredFieldsAlertPrompt() {
        await this.driver.wait(until.alertIsPresent(), 10000);
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await assert.equal(alertText, "Please fill out Name and Creditcard.");
        await alert.accept();
        console.log("successfully accept the alert");
        await this.driver.sleep(2000);
    }
    
    // Alert for successfully purchase
    async successfulPurchaseAlertPrompt() {

        let alertDiv = await this.driver.wait(until.elementLocated(this.purchaseAlertBox), 10000);
        let alertTitle = await alertDiv.findElement(this.purchaseAlertTitle).getText();
        console.log(alertTitle);

        await this.driver.wait(until.elementLocated(this.purchaseAlertOkBtn), 10000);
        let okBtn = await this.driver.findElement(this.purchaseAlertOkBtn);
        await assert.equal(alertTitle, "Thank you for your purchase!");
        await okBtn.click();
        console.log("Purchase successfully accept the alert");
        await this.driver.sleep(2000);
        
    }

    

}


module.exports = PlaceOrder;