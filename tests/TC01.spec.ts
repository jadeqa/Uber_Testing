import { test, expect, Page } from '@playwright/test';

 
test('Lead creation and conversion flow', async ({ page }) => {
  // 1. Log in with non-CPQ user
   page.setDefaultTimeout(5000);
  await page.goto('http://test.salesforce.com');
//await page.goto('https://uber--staging.sandbox.lightning.force.com/lightning/o/Lead/list?filterName=__Recent');

  await page.fill('#username', 'sfdcconnectapp+testnon-cpquser@uber.com.staging');
  await page.fill('#password', 'FLW!T9r)108ID%T%');
  await page.click('input[id="Login"]');
  await expect(page).toHaveURL(/lightning/);
await page.waitForTimeout(8000);

   
 // await page.click('//div[@title="New"]');
await safeClick(page,page.locator('div[title="New"]'));

 await page.waitForTimeout(3000);

  // 5. Fill mandatory fields
  await page.fill('//input[@name="Company"]','Softek');
   await page.fill('//input[@name="lastName"]',"abd");
   /*
// Compact version with  
await page.getByRole('combobox', { name: 'Salutation' }).click();
await page.waitForTimeout(500); 
 await page.getByRole('option', { name: 'Mr.' }).click();
 
*/

await selectComboboxOption(page, 'Salutation', 'Mr.');
await selectComboboxOption(page, 'Lead Source', 'Outbound')

await page.getByRole('combobox', { name: 'Lead Source' }).click();
await page.waitForTimeout(500); 
await page.waitForSelector('lightning-base-combobox-item[data-value="Outbound"]:visible');
await page.locator('lightning-base-combobox-item[data-value="Outbound"]').click();


  // Sales Segment → SMB
await page.getByRole('combobox', { name: 'Sales Segment' }).click();
await page.getByRole('option', { name: 'SMB' }).click();

// Merchant Category → Restaurant & Takeout
await page.getByRole('combobox', { name: 'Merchant Category' }).click();
await page.getByRole('option', { name: 'Restaurant & Takeout' }).click();

// Merchant Cuisine/Sub-Category → American
await page.getByRole('combobox', { name: 'Merchant Cuisine/Sub-Category' }).click();
await page.getByRole('option', { name: 'American', exact: true }).click();


// Address field
// await page.fill('#address', 'Wilhelminaplein 1');
await page.setDefaultTimeout(5000);
 
// Fill the search box
   await page.getByRole('combobox', { name: 'Service Territory' }).click();
  await page.getByRole('combobox', { name: 'Service Territory' }).fill('amster');
  await page.waitForTimeout(2000);
  await page.getByTitle('Amsterdam, Netherlands').click();

// Optional: wait for any post-selection processing
await page.waitForTimeout(1000);


 

  // 6. Save
  await page.click('button:has-text("Save")');
await page.waitForTimeout(5000);
await page.pause();
  // 7. Verify successful lead creation message
 // await expect(page.locator('.toast-message')).toContainText('Lead created successfully');

  // 8. Verify lead status is "new"
 // await expect(page.locator('#leadStatus')).toHaveText('New');

  // 9. Mark status as complete
  await page.click('button:has-text("Mark Status as Complete")');

  // 10. Verify status is qualifying
  await expect(page.locator('#leadStatus')).toHaveText('Qualifying');

  // 11. Select lead sub status as "sales ready"
  await page.selectOption('#leadSubStatus', 'Sales Ready');

  // 12. Click done
  await page.click('button:has-text("Done")');

  // 13. Verify status changed successfully message
  await expect(page.locator('.toast-message')).toContainText('Status changed successfully');

  // 14. Click convert button twice
  await page.click('button:has-text("Convert")');
  await page.click('button:has-text("Convert")');

  // 15. Verify lead converted successfully
  await expect(page.locator('.toast-message')).toContainText('Lead converted successfully');

  // 16. Verify lead details
  await expect(page.locator('#leadStatus')).toHaveText('New');
  await expect(page.locator('#conversionStatus')).toHaveText('Converted');
  await expect(page.locator('.links')).toHaveCount(3);
});
 

async function selectComboboxOption(page: Page, comboboxName: string, optionValue: string) {
  await page.getByRole('combobox', { name: comboboxName }).click();
  await page.waitForSelector('[role="listbox"]:visible'); // wait for dropdown
  const option = page.locator(`lightning-base-combobox-item[data-value="${optionValue}"]`).first();

  await expect(option).toBeVisible({ timeout: 5000 });
  await option.click();
}

async function safeClick(page: Page, locator: import('@playwright/test').Locator) {
  await expect(locator).toBeVisible({ timeout: 10000 });
  await locator.click();
}

