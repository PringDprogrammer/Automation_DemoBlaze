const {Builder} = require("selenium-webdriver");
const Categories = require("../page/categoriesPageObjects");
const BasePage = require("../page/basePageObjects");
require("chromedriver");

describe("Categories Page test - Laptops", () => {

    let categories
    let driver;
    let basePage;

    beforeEach(async () => {
        driver = new Builder().forBrowser("chrome").build();
        categories = new Categories(driver);
        basePage = new BasePage(driver);

        await basePage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async () => {
        await driver.quit();
    });


    it("TC0001 Click Laptops category -> click multiple item from the list", async () => {
        await categories.clickLaptopCateg();
        await categories.clickLaptopItemList1();
        await categories.firstLaptopItemDetails();
        await categories.goBack();
        await categories.goScrollDown();
        await categories.clickLaptopItemList2();
        await categories.secondLaptopItemDetails();
    });

})

