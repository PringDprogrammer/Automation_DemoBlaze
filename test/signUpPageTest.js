const { Builder } = require("selenium-webdriver");
require("chromedriver");
const SignUpPage = require("../page/signUpPageObjects");
const BasePage = require("../page/basePageObjects");
const HomePage = require("../page/homePageObjects");


describe("Sign up page test", () => {
    
    let driver;
    let signUpPage;
    let basePage;
    let homePage;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();        
        signUpPage = new SignUpPage(driver);
        basePage = new BasePage(driver);
        homePage = new HomePage(driver);

        await basePage.openUrl("https://www.demoblaze.com/index.html");
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("TC001 Negative test - Click the Sign Up button without filling all the fields.", async () => {

        await homePage.clickSignUpBtn();
        await driver.sleep(2000)
        await signUpPage.clickSignUpBtn();
        await driver.sleep(2000)
        await signUpPage.emptySignUpFieldsAlert();

    });

    it("TC002 Negative test - User is already exist", async () => {

        await homePage.clickSignUpBtn();
        await driver.sleep(2000)

        await signUpPage.enterUsername("123123")
        await signUpPage.enterPassword("123123")
        await signUpPage.clickSignUpBtn();
        await driver.sleep(2000)
        await signUpPage.userAlreadyExistAlert();

    });

    // Note if the alert turns to "This user already exist." meaning you need to change the username since I tried to run it on my end
    it("TC003 Positive Test - User able to signup", async () => {
        await homePage.clickSignUpBtn();
        await driver.sleep(2000)

        await signUpPage.enterUsername("test_test_test123")
        await signUpPage.enterPassword("test_test_test123")
        await signUpPage.clickSignUpBtn();
        await driver.sleep(2000)
        await signUpPage.userSuccessfullySignUpAlert();

    });
})