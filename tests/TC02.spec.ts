import { test, expect, Page } from '@playwright/test';


test('Salesforce Lead Creation and Conversion - Non CPQ User', async ({ page }) => {
  page.setDefaultTimeout(5000);

  // 1. Login (reuse stable login flow)
//  await page.goto('http://test.salesforce.com');
  await page.goto('https://uber--staging.sandbox.lightning.force.com/lightning/o/Lead/list?filterName=__Recent');
  await page.fill('#username', 'sfdcconnectapp+testnon-cpquser@uber.com.staging');
  await page.fill('#password', 'FLW!T9r)108ID%T%');
  await page.click('input[id="Login"]');
   page.setDefaultTimeout(4000);
  await expect(page).toHaveURL(/lightning/);

 /* 
 await page.pause();
 
 // Click the App Launcher button
await page.locator('//button[@title="App Launcher"]').click();
 page.setDefaultTimeout(5000);
// Wait for the search input to be visible
const searchBox = page.locator('input[placeholder="Search apps and items..."]');
//await searchBox.waitFor({ state: 'visible', timeout: 10000 });
await page.waitForTimeout(2000);
await page.locator('input[placeholder="Search apps and items..."]').nth(0).fill('Lead');
// Fill with "Lead"
//await searchBox.fill('Lead');

// Wait for the dropdown option to appear
const leadsOption = page.getByRole('option', { name: 'Leads' });
  page.setDefaultTimeout(5000);
// Click the option
await leadsOption.click();
 
 
 */
  // 2. Navigate to Lead tab → New
  await safeClick(page, page.locator('div[title="New"]'));
 page.setDefaultTimeout(5000);
  // 3. Fill mandatory fields (reuse locators)
  await page.fill('//input[@name="Company"]', 'Softek');
  await page.fill('//input[@name="lastName"]', 'abd');
   
  await selectComboboxOption(page, 'Salutation', 'Mr.');
  await selectComboboxOption(page, 'Lead Source', 'Outbound');
  await selectComboboxOption(page, 'Sales Segment', 'SMB');
  await selectComboboxOption(page, 'Merchant Category', 'Restaurant & Takeout');
  await selectComboboxOption(page, 'Merchant Cuisine/Sub-Category', 'American');

  // Address / Service Territory
  await page.getByRole('combobox', { name: 'Service Territory' }).click();
  await page.getByRole('combobox', { name: 'Service Territory' }).fill('amster');
  await page.getByTitle('Amsterdam, Netherlands').click();

  // 4. Save
  await page.click('button:has-text("Save")');

  // 5. Assert lead creation
 // await expect(page.locator('.toast-message')).toContainText('Lead created successfully');
  await expect(page.locator('#leadStatus')).toHaveText('New');

  // 6. Mark status as complete
   await page.getByLabel('Path Options').getByTitle('Qualifying').click();
   await page.locator('button').filter({ hasText: 'Mark as Current Status' }).click();

  // 7. Sub-status → Sales Ready
  await selectComboboxOption(page, 'Lead Sub Status', 'Sales Ready');
  await page.click('button:has-text("Done")');
  await expect(page.locator('.toast-message')).toContainText('Status changed successfully');

  // 8. Convert lead
  await page.click('button:has-text("Convert")');
  await page.click('button:has-text("Convert")');
  await expect(page.locator('.toast-message')).toContainText('Lead converted successfully');
});



async function selectComboboxOption(page: Page, comboboxName: string, optionValue: string) {
  await page.getByRole('combobox', { name: comboboxName }).click();
 // await page.waitForTimeout(2000);
//  await page.waitForSelector('[role="listbox"]:visible'); // wait for dropdown
  const option = page.locator(`lightning-base-combobox-item[data-value="${optionValue}"]`).first();
 await page.waitForTimeout(2000);
 // await expect(option).toBeVisible({ timeout: 5000 });
  await option.click();
}

async function safeClick(page: Page, locator: import('@playwright/test').Locator) {
  await expect(locator).toBeVisible({ timeout: 10000 });
  await locator.click();
}

