const {Builder} = require("selenium-webdriver");
const BasePage = require("../page/basePageObjects");
const Categories = require("../page/categoriesPageObjects");
require("chromedriver");


describe("Categories Page test - Phones", () => {

    let driver;
    let basePage;
    let categories;

    beforeEach(async () => {
        driver = new Builder().forBrowser("chrome").build();
        basePage = new BasePage(driver);
        categories = new Categories(driver);

        await basePage.openUrl("https://www.demoblaze.com/index.html");

    });

    afterEach(async () => {
        await driver.quit();
    });

    it("TC0001 Click Phones category -> click multiple item from the list", async () => {

        await categories.clickPhoneCateg();
        await categories.goScrollDown();
        await categories.clickPhoneItem1();
        await categories.isPhoneItem1DetailsDisplay();
        await categories.goBack();
        await categories.goScrollUp();
        await categories.clickPhoneItem2();
        await categories.isPhoneItem2DetailsDisplay();
    });


})