
const { By, until } = require("selenium-webdriver");
const assert = require("assert");


class HomePage {
    
    constructor(driver){
        this.driver = driver;
        // navigate to Login page
        this.loginBtn = By.id("login2");
        // checker for login modal display
        this.username = By.id("loginusername");
        // navigate to signUp page
        this.signUpBtn = By.linkText("Sign up");
        // navigate to home page
        this.homeBtn = By.xpath("//a[text()='Home ']");
        // Clicking Images
        this.nextBtnImage = By.css('.carousel-control-next');
        this.carouselImages = By.css('.carousel-inner img');
        // Navigate to Cart page
        this.clickCartBtn = By.xpath("//a[text()='Cart']");
        this.h2Product = By.xpath("//h2[text()='Products']");

        // table element in cart page
        this.table = By.css("#tbodyid");
    }

    async clickLoginBtn() {
        let LoginBtn = await this.driver.findElement(this.loginBtn);
        await LoginBtn.click();
        await this.driver.sleep(2000);
    }

    async clickSignUpBtn() {
        let SignUpBtn = await this.driver.findElement(this.signUpBtn);
        await SignUpBtn.click();
    }

    async clickHomeBtn() {
        
        let HomeBtn = await this.driver.findElement(this.homeBtn);
        await HomeBtn.click();
        console.log("Navigate to home page");
        await this.driver.sleep(2000);
        
    }

    async handleHomeTitle() {

        let title = await this.driver.getTitle();
        console.log(title);
        assert.strictEqual(title, 'STORE');
    }

    async isImageVisible() {
        
        await this.driver.wait(until.elementsLocated(this.carouselImages), 5000);
        let Images = await this.driver.findElements(this.carouselImages);

        console.log(`number of elements ${Images.length}`);

        for (let image of Images) {

            let imageSrc = await image.getAttribute("src");
            if(imageSrc.includes("nexus1.jpg")) {
                console.log(`Image with src containing: ${imageSrc}`);
                return;
            }

        }
        
        return false;
    }

    async clickNextBtnImage() {
        
        for(let clickCount = 0; clickCount < 4; clickCount++) {
            console.log(`attemp click ${clickCount++}`);
            let NextBtn = await this.driver.findElement(this.nextBtnImage);
            await NextBtn.click();
            await this.driver.sleep(2000);

            if(await this.isImageVisible()) {
                return;
            }
        }   
    }

    async navigateToCart() {
        
        let expectedURL = "https://www.demoblaze.com/cart.html";

        await this.driver.wait(until.elementLocated(this.clickCartBtn), 10000);

        let navigateToCartPage = await this.driver.findElement(this.clickCartBtn);
        await navigateToCartPage.click();

        await this.driver.sleep(5000);

        let currentUrl = await this.driver.getCurrentUrl();

        await assert.strictEqual(currentUrl, expectedURL, `Expected URL to be "${expectedURL}" but got "${currentUrl}".`);
        
    }

}

module.exports = HomePage;