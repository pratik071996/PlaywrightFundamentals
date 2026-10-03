import {test, expect} from '@playwright/test';

test("Verify that login page using default locator", async({page})=>{

   await page.goto("https://app.wingify.com/#/login");
   let userName = page.getByRole("textbox", {name: "Email"});
   let password = page.getByRole("textbox", {name: "Password"});

   await userName.fill("test123@gmail.com");
   await password.fill("1234");

   await page.pause();

});