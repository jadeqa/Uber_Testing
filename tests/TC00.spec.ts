import { test, expect, Page } from '@playwright/test';


test('Salesforce Lead Creation and Conversion - Non CPQ User', async ({ page }) => {
  page.setDefaultTimeout(5000);

  // 1. Login (reuse stable login flow)
//  await page.goto('http://test.salesforce.com');
  await page.goto('https://uber--staging.sandbox.lightning.force.com/lightning/o/Lead/list?filterName=__Recent');
  await page.fill('#username', 'sfdcconnectapp+testnon-cpquser@uber.com.staging');
  await page.fill('#password', 'FLW!T9r)108ID%T%');
  await page.click('input[id="Login"]');
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL(/lightning/);


  await page.locator('//button[@aria-label="Search"]').fill('abd');
  
  await page.locator('//span[@title="abd"])[1]').click();

  await page.locator('//a[@data-tab-name="Qualifying"]').click();

  await page.locator('//span[text()="Mark as Current Status"]').click();

page.setDefaultTimeout(4000);

//await page.locator('//button[@data-value="Qualifying"]').click();
//await page.locator('//button[@data-value="Sales Ready"]').click();


// Open the dropdown first
await page.getByRole('combobox', { name: 'Status' }).click();

// Select "Qualifying"
await page.getByRole('option', { name: 'Qualifying' }).click();

// Open the sub-status dropdown
await page.getByRole('combobox', { name: 'Lead Sub Status' }).click();

// Select "Sales Ready"
await page.getByRole('option', { name: 'Sales Ready' }).click();

await page.locator('//div[@class="modal-footer slds-modal__footer"]/button[@class="slds-button slds-button_brand"]').click();


await page.locator('button:has-text("Mark as Current Status")').click();

});
