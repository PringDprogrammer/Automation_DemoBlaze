const { Builder } = require("selenium-webdriver");
const chrome = require('chromedriver');
const HomePage = require("../page/homePageObjects");
const LogInPage = require("../page/loginPageObjects");
const BasePage = require("../page/basePageObjects");

//correct credentials for login
//username: test_test_test123
//password: test_test_test123


describe("Login page test", () => {

    let driver;
    let homePage;
    let loginPage;
    let basePage;

    beforeEach(async () => {
        driver = new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
        loginPage = new LogInPage(driver);
        basePage = new BasePage(driver);

        await basePage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("TC001 Negative test - User enter correct password but wrong username", async () => {

        await homePage.clickLoginBtn();
        await driver.sleep(2000);

        await loginPage.enterUsername("test_test_test1");
        await loginPage.enterPassword("test_test_test123");

        await loginPage.clickLoginBtn();
        await driver.sleep(2000);
        await loginPage.userDoesNotExistAlert();
        
    });

    it("TC002 Negative test - User enter correct username but wrong password", async () => {

        await homePage.clickLoginBtn();
        await driver.sleep(2000);

        await loginPage.enterUsername("test_test_test123");
        await loginPage.enterPassword("test_test_test1");

        await loginPage.clickLoginBtn();
        await driver.sleep(2000);
        await loginPage.userWrongPasswordAlert();
    });

    it("TC003 Negative test - Click the Login button without completing all the fields", async () => {

        await homePage.clickLoginBtn();
        await driver.sleep(2000);

        await loginPage.clickLoginBtn();
        await driver.sleep(2000);
        await loginPage.userEmptyFieldAlert();
    });

    it("TC004 Positive test - User enters correct username and password", async () => {
        
        await homePage.clickLoginBtn();
        await driver.sleep(2000);

        await loginPage.enterUsername("test_test_test123");
        await loginPage.enterPassword("test_test_test123");

        await loginPage.clickLoginBtn();
        await driver.sleep(2000);
        await loginPage.isVisibleLogOutBtn();
        
    });
})