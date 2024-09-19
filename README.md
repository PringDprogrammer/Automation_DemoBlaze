# Automation_DemoBlaze
This is my practice stage doing automation testing process

---

## Tools
- Selenium Webdriver 
- chromedriver
- Mocha

## Installation
- npm install selenium-webdriver chromedriver
- npm install mocha


## Run the test
- npm run test

### Some Other details
- You will see this in package.json file  "test": "mocha './test/runAllTests.js' --timeout 60000".
- It will run accordingly base on runAllTests.js.
- You can run each test by changing the filename of the JavaScript file in './test/{put the JS filename here}.js'.
- I create 2 folder the page and the test.
1. The page folder contains all the objects.
2. The test folder contains all the Test cases and the execution.