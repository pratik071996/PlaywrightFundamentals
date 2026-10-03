import {test, expect} from '@playwright/test'

test("Verify the link navigation", async({page})=>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    let makeAppointment = page.getByRole("link",{ name:"Make Appointment", exact: true});
    await makeAppointment.click();

    await page.pause();

});