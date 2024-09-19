const {By, until} = require("selenium-webdriver");
const assert = require("assert");


class Cart {
    constructor(driver) {
        this.driver = driver; 

        this.table = By.css("#tbodyid");
        this.cartTable = By.css("tbody tr");
        this.cartTableCells = By.css("td");
        this.categoriesLabel = By.xpath("//a[text()='CATEGORIES']");

        this.addCartBtn = By.xpath("//a[text()='Add to cart']");

        this.itemTotals = By.id("totalp");

        this.deleteCartItems = By.xpath("//a[text()='Delete']");
    }
    
    async clickAddToCartBtn() {
        await this.driver.wait(until.elementLocated(this.addCartBtn), 10000);
        let addToCart = await this.driver.findElement(this.addCartBtn);
        await addToCart.click();
        await this.driver.sleep(2000);
    }
    
    async successfullyAddedToCartItem() {
        await this.driver.wait(until.alertIsPresent(), 10000);
        let alert = await this.driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log(alertText);
        await assert.equal(alertText, "Product added.");
        await alert.accept();
        console.log("successfully accept the alert");
        await this.driver.sleep(2000);
    }

    async checkCart() {

        // wait until the table element is located
        await this.driver.wait(until.elementLocated(this.table), 5000);
        // find the table element
        let table = this.driver.findElement(this.table);
        // find all rows in the table
        let cartTableRows = await table.findElements(this.cartTable);


        // if the cart is empty
        if(cartTableRows.length === 0) {
            // navigate going back to previous page
            await this.driver.navigate().back();
            await this.driver.sleep(3000);
            // wait until the element categories label is located
            await this.driver.wait(until.elementLocated(this.categoriesLabel), 3000);
            // set a varibale to get the text of the categories label
            let categorieLabel = await this.driver.findElement(this.categoriesLabel);
            console.log("Categories labe is: ", await categorieLabel.getText());
        }
        // if the cart is not empty
        else {

            // define the variable for the value of the Price
            let value;

            for(let cartTableRow of cartTableRows) {
                // locate all cells in the rows
                let cells = await cartTableRow.findElements(this.cartTableCells);

                // locating the Price label by cells index
                let label = await cells[0].getText();

                // check if the cell label is Price
                if(label !== "Price") {
                    value = await cells[2].getText();
                    console.log('Price:', value);
                    break;
                }
            }
            // Calling the method clickDeleteCartItem to delete items until only one remains
            await this.clickDeleteCartItem();
            
            
            // get the total value
            let totalValue = await this.driver.findElement(this.itemTotals);
            // get the text of the total value element
            let totalText = await totalValue.getText();
            // assertion for total value and price
            await assert.equal(value, totalText, `The total price is ${value} and the total value of the item is ${totalText}`);
            console.log(`The total price is ${value} and the total value of the item is ${totalText}`);
        }

    }

    async checkCarts() {
        // wait until the table element is located
        await this.driver.wait(until.elementLocated(this.table), 10000);

        // find the table element
        let table = this.driver.findElement(this.table);

        // find all rows in the table
        let cartTableRows = await table.findElements(this.cartTable);

        if(cartTableRows.length === 0) {
            // navigate back to previous page if the cart is empty
            await this.driver.navigate().back();
            await this.driver.sleep(3000);
            console.log("No item in the cart!");
        }
        else {

            // define the variable for the value of the Price
            let value;
            let total = 0;

            for(let cartTableRow of cartTableRows) {
                // locate all cells in the rows
                let cells = await cartTableRow.findElements(this.cartTableCells);

                // locating the Price label by cells index
                let label = await cells[0].getText();

                // check if the cell label is Price
                if(label !== "Price") {
                    value = await cells[2].getText();
                    // Removes non-numeric characters
                    // value = value.replace(/[^0-9.-]+/g, "");
                    total += parseFloat(value) || 0;
                }
            }
            
            // get the total value
            let totalValue = await this.driver.findElement(this.itemTotals);
            // get the text of the total value element
            let totalText = await totalValue.getText();
            console.log("Total:", totalText);
            console.log("Total computed price:", total);

            // assertion for total value and price
            await assert.equal(total, totalText, `The total price is ${total} and the total value of the items ${totalText}`);
            console.log(`The total price is ${total} and the total value of the item is ${totalText}`);
        }

    }

    async clickDeleteCartItem() {
        
        while(true) {
            // wait until the table element is located
            await this.driver.wait(until.elementLocated(this.table), 5000);
            // find the table element
            let table = await this.driver.findElement(this.table);
    
            // find all rows in the table
            let cartTableRows = await table.findElements(this.cartTable);
    
            try {
                
                if(cartTableRows.length > 1) {
                    // Find the delete button in the first row
                    let deleteButton = await cartTableRows[1].findElement(this.deleteCartItems);

                    // Click the delete button
                    await deleteButton.click();

                    // Optionally, wait for the row to be removed
                    await this.driver.sleep(3000);

                    // Wait for the table to update
                    await this.driver.wait(until.elementsLocated(this.cartTable), 10000);

                } else {
                    console.log('Only one item remains.');
                    break;
                }
            }
            catch (error) {
                if (error.name === "StaleElementReferenceError") {
                    // Re-try by re-fetching the table and rows
                    console.warn('StaleElementReferenceError occurred. Retrying...');
                    // Small delay before retrying
                    await this.driver.sleep(2000);
                }
                else {
                    // Log other errors for debugging and throw
                    console.error('An error occurred:', error);
                    throw error;
                }
            }
        }
    }
}
module.exports = Cart;