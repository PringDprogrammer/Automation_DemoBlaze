# Automation_DemoBlaze
This is my practice stage doing automation testing process

I use Selenium Webdriver for automation tool
I use chromewebdriver for my browser
-- install selenium webdriver and the chromedriver -> npm install selenium-webdriver chromedriver

I use Mocha JS testing framework for creating and executing test cases
-- install Mocha -> npm install mocha


To run the test
-- use the npm run test
You will see this in package.json file  "test": "mocha './test/runAllTests.js' --timeout 60000"

-- It will run accordingly base on runAllTests.js 
-- You can run each test by changing the filename of the JavaScript file in './test/{put the JS filename here}.js'