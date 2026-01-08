import { test, expect, Page } from '@playwright/test';
 

test('Salesforce Lead Conversion - Opportunity Account Verification', async ({ page }) => {
  page.setDefaultTimeout(5000);

  // 1. Login with Non-CPQ user
  await page.goto('http://test.salesforce.com');
  await page.fill('#username', 'sfdcconnectapp+testnon-cpquser@uber.com.staging');
  await page.fill('#password', 'YOUR_PASSWORD'); // replace with actual
  await page.click('input[id="Login"]');
  await expect(page).toHaveURL(/lightning/);

  
  // 2. Navigate to Lead tab → New
  await safeClick(page, page.locator('div[title="New"]'));

  // 3. Fill mandatory fields
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

  // 5. Mark status as complete
  await page.click('button:has-text("Mark Status as Complete")');
  await expect(page.locator('#leadStatus')).toHaveText('Qualifying');

  // 6. Sub-status → Sales Ready
  await selectComboboxOption(page, 'Lead Sub Status', 'Sales Ready');
  await page.click('button:has-text("Done")');

  // 7. Convert lead
  await page.click('button:has-text("Convert")');
  await page.click('button:has-text("Convert")');

  // 8. Verify lead conversion message
  await expect(page.locator('.toast-message')).toContainText('Lead converted successfully');

  // 9. Click on opportunity link
  await page.click('a:has-text("Opportunity")');

  // 10. Verify Account of newly created opportunity is of Physical Location type
  const accountType = await page.locator('span[data-field="Account Type"]').innerText();
  expect(accountType).toBe('Physical Location');
});

// Helpers (reuse from earlier)
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