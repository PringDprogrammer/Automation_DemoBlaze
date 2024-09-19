const { Builder } = require("selenium-webdriver");
const PlaceOrder = require("../page/placeOrderObjects");
const BasePage = require("../page/basePageObjects");
const HomePage = require("../page/homePageObjects");
require("chromedriver");



describe("", () => {
    let driver;
    let placeOrder;
    let basePage;
    let homePage;
    
    beforeEach(async()=>{
        driver = new Builder().forBrowser("chrome").build();
        placeOrder = new PlaceOrder(driver);
        basePage = new BasePage(driver);
        homePage = new HomePage(driver);
        
        await basePage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async() => {
        await driver.quit();
    })
})