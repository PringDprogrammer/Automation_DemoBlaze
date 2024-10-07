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

    it("TC002 - Validation process for empty order form", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await homePage.navigateToCart();
        await placeOrder.clickPlaceOrder();
        await placeOrder.clickPurchaseBtn();
        await placeOrder.validateRequiredFieldsAlertPrompt();
    });

    it("TC003 - Validation process - required field Name is empty", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await homePage.navigateToCart();
        await placeOrder.clickPlaceOrder();
        await placeOrder.enterCountry("Philippines");
        await placeOrder.enterCity("Lucena City");
        await placeOrder.enterCard("12312312313123");
        await placeOrder.enterMonth("Oct");
        await placeOrder.enterYear("2024");
        await placeOrder.clickPurchaseBtn();
        await placeOrder.validateRequiredFieldsAlertPrompt();
    });

    it("TC004 - Validation process - required field Credit Card is empty", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await homePage.navigateToCart();
        await placeOrder.clickPlaceOrder();
        await placeOrder.enterName("Example Tester");
        await placeOrder.enterCountry("Philippines");
        await placeOrder.enterCity("Lucena City");
        await placeOrder.enterMonth("Oct");
        await placeOrder.enterYear("2024");
        await placeOrder.clickPurchaseBtn();
        await placeOrder.validateRequiredFieldsAlertPrompt();
    });

    it("TC005 - Validation process - Successfully place the order", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await homePage.navigateToCart();
        await placeOrder.clickPlaceOrder();
        await placeOrder.enterName("Example Tester");
        await placeOrder.enterCountry("Philippines");
        await placeOrder.enterCity("Lucena City");
        await placeOrder.enterCard("1232223322123");
        await placeOrder.enterMonth("Oct");
        await placeOrder.enterYear("2024");
        await placeOrder.clickPurchaseBtn();
        await placeOrder.successfulPurchaseAlertPrompt();
        await basePage.getURL();
    });





})