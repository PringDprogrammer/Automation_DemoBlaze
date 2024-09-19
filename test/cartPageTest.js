const {Builder} = require("selenium-webdriver");
const HomePage = require("../page/homePageObjects");
const BasePage = require("../page/basePageObjects");
const LogInPage = require("../page/loginPageObjects");
const Cart = require("../page/cartPageObjects");
const Categories = require("../page/categoriesPageObjects");
require("chromedriver");


describe("Cart Page test", () => {

    let driver;
    let logInPage;
    let homePage;
    let basePage;
    let cart;
    let categories;

    beforeEach(async () => {
        driver = new Builder().forBrowser("chrome").build();
        homePage = new HomePage(driver);
        basePage = new BasePage(driver);
        logInPage = new LogInPage(driver);
        cart = new Cart(driver);
        categories = new Categories(driver);

        await basePage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async () => {
        await driver.quit();
    });

    xit("TC001 - Logged In -> Logged In -> Cart is empty", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await homePage.navigateToCart();
        await cart.checkCart();
    });
    
    xit("TC002 - Logged In ->Logged In -> Cart have 1 item", async () => {
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();
        await categories.clickLaptopCateg();
        await categories.clickLaptopItemList1();
        await categories.firstLaptopItemDetails();
        await cart.clickAddToCartBtn();
        await cart.successfullyAddedToCartItem();
        await homePage.navigateToCart();
        await cart.checkCart();

    });

    it("TC003 - Logged In ->Logged In -> Cart have many items", async () => {

        // log in to app
        await homePage.clickLoginBtn();
        await logInPage.enterUsername("test_test_test123");
        await logInPage.enterPassword("test_test_test123");
        await logInPage.clickLoginBtn();
        await logInPage.isSuccessfullyLoggedIn();

        // add Laptop item to cart
        await categories.clickLaptopCateg();
        await categories.clickLaptopItemList1();
        await categories.firstLaptopItemDetails();
        await cart.clickAddToCartBtn();
        await cart.successfullyAddedToCartItem();
        await homePage.clickHomeBtn();

        // add monitor to cart
        await categories.clickMonitorsCateg();
        await categories.clickMonitorsList();
        await categories.isMonitorListItemDetailsDisplay();
        await cart.clickAddToCartBtn();
        await cart.successfullyAddedToCartItem();
        await homePage.clickHomeBtn();

        // add cellphone to cart
        await categories.clickPhoneCateg();
        await categories.clickPhoneItem1();
        await categories.isPhoneItem1DetailsDisplay();
        await cart.clickAddToCartBtn();
        await cart.successfullyAddedToCartItem();
        await homePage.clickHomeBtn();

        // navigate to cart page
        await homePage.navigateToCart();
        await cart.checkCarts();
    });



});