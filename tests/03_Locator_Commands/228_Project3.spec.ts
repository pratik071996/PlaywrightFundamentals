import {test, expect} from '@playwright/test';

test('Verify the login page negative test', async({page})=>{

    await page.goto('https://wingify.com/free-trial/');

    let inputBox = page.locator("//input[@id='free-trial-step1-email']");
    await inputBox.fill('Test123');

    let checkBox1 = page.locator("#free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox");
    await checkBox1.click();

    let checkBox2 = page.locator("#free-trial-step1-gdpr-consent-checkboxcu-gdpr-consent-checkbox");
    await checkBox2.click();

    let createButton = page.locator("//button[@data-qa='page-su-submit']").first();
    await createButton.click()

    let errorMessage = page.locator("//div[contains(@class, 'invalid-reason')]").first();

    let errorText = await errorMessage.textContent();

    expect (errorText).toContain("The email address you entered is incorrect.");

    await page.pause();
    
})