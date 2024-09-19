const {By, until} = require("selenium-webdriver");

const assert = require("assert");
const Typo = require("typo-js");

class Categories {
    constructor(driver) {
        this.driver = driver;
        //Monitor category
        this.monitors = By.linkText("Monitors");
        this.monitorsListItem = By.css('a.hrefch');
        this.H2TagName = By.css('h2.name');
        this.H3TagName = By.css('h3.price-container');
        this.productLabelDescription = By.css('div#more-information strong');
        this.productDescription = By.xpath('//*[@id="more-information"]/p');
        
        // Laptop category
        this.laptops = By.xpath("//a[text()='Laptops']");
        this.laptopItem1 = By.linkText("Sony vaio i7");
        this.laptopItem2 = By.linkText("MacBook Pro");

        // Phone category
        this.phones = By.linkText("Phones");
        this.phone1 = By.linkText("HTC One M9");
        this.phone2 = By.linkText("Nokia lumia 1520");
    }

    async clickPhoneCateg() {
        let phone = await this.driver.findElement(this.phones);
        await phone.click();
        await this.driver.sleep(3000);
    }

    async clickPhoneItem1() {
        let phone1 = await this.driver.findElement(this.phone1);
        await phone1.click();
        await this.driver.sleep(2000);
    }

    async clickPhoneItem2() {
        let phone2 = await this.driver.findElement(this.phone2);
        await phone2.click();
        await this.driver.sleep(2000);
    }

    async isPhoneItem1DetailsDisplay() {
        await this.driver.wait(until.elementLocated(this.H2TagName), 5000);
        let expectedDescription = `The HTC One M9 is powered by 1.5GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card.`;
        let h2TagName = await this.driver.findElement(this.H2TagName).getText();
        let h3TagName = await this.driver.findElement(this.H3TagName).getText();
        let productLabelDescription = await this.driver.findElement(this.productLabelDescription).getText();
        let productDescription = await this.driver.findElement(this.productDescription).getText();

        await assert.equal(h2TagName, "HTC One M9");
        await assert.equal(h3TagName, "$700 *includes tax");
        await assert.equal(productLabelDescription, "Product description");
        await assert.equal(productDescription, expectedDescription);
        await this.driver.sleep(2000);
    }

    async isPhoneItem2DetailsDisplay() {
        await this.driver.wait(until.elementLocated(this.H2TagName), 5000);
        let expectedDescription = `The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.`;
        let h2TagName = await this.driver.findElement(this.H2TagName).getText();
        let h3TagName = await this.driver.findElement(this.H3TagName).getText();
        let productLabelDescription = await this.driver.findElement(this.productLabelDescription).getText();
        let productDescription = await this.driver.findElement(this.productDescription).getText();

        await assert.equal(h2TagName, "Nokia lumia 1520");
        await assert.equal(h3TagName, "$820 *includes tax");
        await assert.equal(productLabelDescription, "Product description");
        await assert.equal(productDescription, expectedDescription);
    }

    async clickLaptopCateg() {
        let laptop = await this.driver.findElement(this.laptops);
        await laptop.click();
        await this.driver.sleep(3000);
    }

    async clickLaptopItemList1() {
        let laptopItem = await this.driver.findElement(this.laptopItem1);
        await laptopItem.click();
        await this.driver.sleep(3000);
    }

    async clickLaptopItemList2() {
        let laptopItem = await this.driver.findElement(this.laptopItem2);
        await laptopItem.click();
        await this.driver.sleep(3000);
    }

    async firstLaptopItemDetails() {
        await this.driver.wait(until.elementLocated(this.H2TagName), 5000);
        let expectedDescription = `REVIEW Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight, higher-resolution display, more storage space, and a Blu-ray drive.`;
        let h2TagName = await this.driver.findElement(this.H2TagName).getText();
        let h3TagName = await this.driver.findElement(this.H3TagName).getText();
        let productLabelDescription = await this.driver.findElement(this.productLabelDescription).getText();
        let productDescription = await this.driver.findElement(this.productDescription).getText();

        await assert.equal(h2TagName, "Sony vaio i7");
        await assert.equal(h3TagName, "$790 *includes tax");
        await assert.equal(productLabelDescription, "Product description");
        await assert.equal(productDescription, expectedDescription);
    }

    async secondLaptopItemDetails() {
        await this.driver.wait(until.elementLocated(this.H2TagName), 5000);
        let expectedDescription = `Apple has introduced three new versions of its MacBook Pro line, including a 13-inch and 15-inch model with the Touch Bar, a thin, multi-touch strip display that sits above the MacBook Pro's keyboard.`;
        let h2TagName = await this.driver.findElement(this.H2TagName).getText();
        let h3TagName = await this.driver.findElement(this.H3TagName).getText();
        let productLabelDescription = await this.driver.findElement(this.productLabelDescription).getText();
        let productDescription = await this.driver.findElement(this.productDescription).getText();

        await assert.equal(h2TagName, "MacBook Pro");
        await assert.equal(h3TagName, "$1100 *includes tax");
        await assert.equal(productLabelDescription, "Product description");
        await assert.equal(productDescription, expectedDescription);
    }

    async clickMonitorsCateg() {
        let monitor = await this.driver.findElement(this.monitors);
        // console.log(await monitor.getText());
        await monitor.click();
        await this.driver.sleep(3000);
    }

    async clickMonitorsList() {
        let monitorListItem = await this.driver.findElement(this.monitorsListItem);
        // console.log(await monitorListItem.getText());
        await monitorListItem.click();
    }

    async isMonitorListItemDetailsDisplay() {

        await this.driver.wait(until.elementLocated(this.H2TagName), 5000);
        let expectedDescription = 'LED Cinema Display features a 27-inch glossy LED-backlit TFT active-matrix LCD display with IPS technology and an optimum resolution of 2560x1440. It has a 178 degree horizontal and vertical viewing angle, a "typical" brightness of 375 cd/m2, contrast ratio of 1000:1, and a 12 ms response time.';
        let h2TagName = await this.driver.findElement(this.H2TagName).getText();
        let h3TagName = await this.driver.findElement(this.H3TagName).getText();
        let productLabelDescription = await this.driver.findElement(this.productLabelDescription).getText();
        let productDescription = await this.driver.findElement(this.productDescription).getText();

        await assert.equal(h2TagName, "Apple monitor 24");
        await assert.equal(h3TagName, "$400 *includes tax");
        await assert.equal(productLabelDescription, "Product description");
        await assert.equal(productDescription, expectedDescription);
    }

    async goBack() {
        await this.driver.navigate().back();
        await this.driver.sleep(2000);
    }

    async goScrollDown() {
        await this.driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
        await this.driver.sleep(3000);
    }

    async goScrollUp() {
        await this.driver.executeScript('window.scrollBy(0, -window.innerHeight);')
        await this.driver.sleep(3000);
    }
}

module.exports = Categories;