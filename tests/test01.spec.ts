import { test, expect, Page } from '@playwright/test';


test('Salesforce Lead Creation and Conversion - Non CPQ User', async ({ page }) => {
  page.setDefaultTimeout(3000);
  /*
   await page.goto('https://www.redbus.in/');
 
   await page.fill('#srcinput', 'DELHI');
   await page.waitForTimeout(4000);
    
 
   const city= await page.$$("//div[@role='heading' and contains(@aria-label,'Delhi')]/parent::div");
 
 
   for(const cc of city) {
 
     const cityName= await cc.textContent();
     console.log(cityName);
     }
 
 
     const cities = page.locator(
     'xpath=//div[@role="heading" and contains(@aria-label,"Delhi")]'
   );
 
   await cities.first().waitFor();
 
   const count = await cities.count();
   for (let i = 0; i < count; i++) {
     console.log(await cities.nth(i).getAttribute('aria-label'));
   }
 
 */
  page.setDefaultTimeout(5000);
  await page.goto('https://testautomationpractice.blogspot.com/');

  page.setDefaultTimeout(5000);
  const tab = page.locator("#productTable");

  const rows = tab.locator("tbody tr");
  const rowCount = await rows.count();
  console.log("No of rows: " + rowCount);
  expect(rowCount).toBe(5);
  const col = tab.locator("thead tr th");
  console.log("No of cols: " + await col.count());
  expect(await col.count()).toBe(4);
  const page1 = await page.locator(".pagination li a");
  console.log("No of pages: " + await page1.count());

  for (let p = 0; p < await page1.count(); p++) {
    if (p < await page1.count()) {
      await page1.nth(p).click();
      page.setDefaultTimeout(5000);
      for (let r = 0; r < rowCount; r++) {
        const rowData = await rows.nth(r).locator("td").allTextContents();
        console.log(rowData);
      }
    }
  }
});