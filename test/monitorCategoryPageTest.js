const {Builder} = require("selenium-webdriver");
const Categories = require("../page/categoriesPageObjects");
const BasePage = require("../page/basePageObjects");

require("chromedriver");

describe("Categories Page test - Monitors", () => {

    let driver;
    let CategoriesPage;
    let basePage;

    beforeEach(async () => {
        driver = new Builder().forBrowser("chrome").build();
        CategoriesPage = new Categories(driver);
        basePage = new BasePage(driver);
        await basePage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("TC0001 Click Monitors category -> click an item from the list", async () => {

        await CategoriesPage.clickMonitorsCateg();
        await CategoriesPage.clickMonitorsList();
        await CategoriesPage.isMonitorListItemDetailsDisplay();

    });
});