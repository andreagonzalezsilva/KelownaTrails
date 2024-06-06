const {By, Builder, Browser} = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const expectedTitle = "DevOps Bonus Project - CCTB";
const expectedMemberName = "Test, Selenium";
const expectedMembersAfterDeletion = 0;

(async function deleteButtonTest() {

  // Set Chrome option
  let options = new chrome.Options();
  options.addArguments('headless');
  options.addArguments('disable-gpu');
  options.setChromeBinaryPath('/usr/bin/google-chrome');

  let driver;
  
  try {
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get('https://testing-example2-devops.web.app/');

    // Maxime the window
    driver.manage().window().maximize();

    // Validate the expected title
    let title = await driver.getTitle();
    assert.equal(title, expectedTitle);
    await driver.manage().setTimeouts({implicit: 500});
  
    // Add a new member
    // Create the web elements 
    let lastNameField = await driver.findElement(By.id('lastname'));
    let firstNameField = await driver.findElement(By.id('firstname'));
    let groupSize = await driver.findElement(By.id('GroupSize'));
    let addMemberBtn = await driver.findElement(By.id('addMemberBtn'));
    let deleteMemberBton = await driver.findElement(By.id('deleteMemberBtn'));

    // Create the new member by inputting the first name, last name and group size
    await lastNameField.sendKeys("Test");
    await firstNameField.sendKeys("Selenium");  
    await groupSize.sendKeys("5");  
    await addMemberBtn.click();
    
    // Search for the new created member
    let createdMember = await driver.findElement(By.xpath('//*[@id="members"]/option'));
    let createdMemberName = await createdMember.getText();

    // Validate the member has been created
    assert.equal(createdMemberName, expectedMemberName)

    // Select and delete the new member
    await createdMember.click();
    await deleteMemberBton.click();

    // Validate the member has been deleted
    let foundMembers = await driver.findElements(By.xpath('//*[@id="members"]/option'));
    if(foundMembers.length === expectedMembersAfterDeletion){
        console.log('Test Success');
    } else{
        console.log('Test Failed');
    }
    assert.equal(foundMembers.length, expectedMembersAfterDeletion);
  } catch (e) {
    console.log('An error occurred: ', e);
  } finally {
      await driver.quit();
  }
}())
