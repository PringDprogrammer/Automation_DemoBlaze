const { Builder } = require("selenium-webdriver");
const PlaceOrder = require("../page/placeOrderObjects");
const BasePage = require("../page/basePageObjects");
const HomePage = require("../page/homePageObjects");
const LogInPage = require("../page/loginPageObjects");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");



describe("Place Order Test", () => {
    
    let driver;
    let placeOrder;
    let basePage;
    let homePage;
    let logInPage;

    beforeEach(async()=>{
        
        
        const options = new chrome.Options();
        options.addArguments('--start-maximized');
        
        driver = new Builder().forBrowser("chrome").build();
        // Maximize window
        await driver.manage().window().maximize();
        
        placeOrder = new PlaceOrder(driver);
        basePage = new BasePage(driver);
        homePage = new HomePage(driver);
        logInPage = new LogInPage(driver);

        await basePage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async() => {
        await driver.quit();
    });

    it("TC001 - Close the order modal", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await homePage.navigateToCart();
        await placeOrder.clickPlaceOrder();
        await placeOrder.clickCloseBtn();
    });

    xit("TC002 - Empty Field then submit the form", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await homePage.navigateToCart();
        await placeOrder.clickPlaceOrder();
        await placeOrder.clickPurchaseBtn();
        await placeOrder.purchaseAlertPrompt();
    });

    // it("TC002 - With empty name field then submit the form", async () => {
        
    // });

    // it("TC003 - With empty creditCard field then submit the form", async () => {

    // });





})