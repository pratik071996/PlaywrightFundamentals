import {test,expect} from '@playwright/test'

test("set referer for entire context", async ({ browser })=> {

    let context = await browser.newContext({
        extraHTTPHeaders:{
        referer: "https://thetestingacademy.com"

    }
});

let page = await context.newPage();
await page.goto("https://app.vwo.com/#login");
console.log("Page 1 - partner refere included");
await page.goto ("https://katalon-demo-cura.herokuapp.com/profile.php$login");
console.log ("Page 2 - partner refere included");


})