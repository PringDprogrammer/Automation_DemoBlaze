
const {Builder} = require("selenium-webdriver");
require("chromedriver");
const BasePage = require("../page/basePageObjects");
const HomePage = require("../page/homePageObjects");


describe("Home page Test", () => {

    let driver;
    let basepage;
    let homePage;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        basepage = new BasePage(driver);
        homePage = new HomePage(driver);

        await basepage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async () => {
        await driver.quit();
    })

    it("TC001 Home Page test", async () => {
        
        await homePage.clickHomeBtn();        
        await homePage.handleHomeTitle();
        await homePage.clickNextBtnImage();
    })

})