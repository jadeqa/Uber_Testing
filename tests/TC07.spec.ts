import { test, expect, Page } from '@playwright/test';

// TC07: Lead conversion with existing PL and Group account - error validation

test('TC07: Lead conversion with existing PL and Group account - error validation', async ({ page }) => {
  // 1. Log in with CPQ user
  page.setDefaultTimeout(5000);
  await page.goto('http://test.salesforce.com');
  await page.fill('#username', 'sfdcconnectapp+testcpquser@uber.com.staging');
  await page.fill('#password', 'YOUR_CPQ_PASSWORD'); // replace with actual
  await page.click('input[id="Login"]');
  await expect(page).toHaveURL(/lightning/);
  await page.waitForTimeout(8000);

  // 2. Click "New" to create a lead
  await safeClick(page, page.locator('div[title="New"]'));
  await page.waitForTimeout(3000);

  // 3. Fill all mandatory fields
  await page.fill('//input[@name="Company"]', 'Softek');
  await page.fill('//input[@name="lastName"]', 'abd');
  await selectComboboxOption(page, 'Salutation', 'Mr.');
  await selectComboboxOption(page, 'Lead Source', 'Outbound');
  await page.getByRole('combobox', { name: 'Sales Segment' }).click();
  await page.getByRole('option', { name: 'SMB' }).click();
  await page.getByRole('combobox', { name: 'Merchant Category' }).click();
  await page.getByRole('option', { name: 'Restaurant & Takeout' }).click();
  await page.getByRole('combobox', { name: 'Merchant Cuisine/Sub-Category' }).click();
  await page.getByRole('option', { name: 'American', exact: true }).click();

  // Address and Service Territory
  await page.getByRole('combobox', { name: 'Service Territory' }).click();
  await page.getByRole('combobox', { name: 'Service Territory' }).fill('San Francisco');
  await page.waitForTimeout(2000);
  await page.getByTitle('San Francisco, USA').click();
  await page.waitForTimeout(1000);

  // 4. Enter already created PL and Group accounts
  await page.fill('//input[@name="Matched Physical Location Account"]', 'PL Account Name'); // replace with actual
  await page.fill('//input[@name="Matched Group Account"]', 'Group Account Name'); // replace with actual

  // 5. Save
  await page.click('button:has-text("Save")');
  await page.waitForTimeout(5000);

  // 6. Mark status as complete
  await page.click('button:has-text("Mark Status as Complete")');
  await expect(page.locator('#leadStatus')).toHaveText('Qualifying');

  // 7. Select lead sub status as "sales ready"
  await page.selectOption('#leadSubStatus', 'Sales Ready');
  await page.click('button:has-text("Done")');
  await expect(page.locator('.toast-message')).toContainText('Status changed successfully');

  // 8. Click convert button twice
  await page.click('button:has-text("Convert")');
  await page.click('button:has-text("Convert")');

  // 9. Verify the error message
  await expect(page.locator('.toast-message, .forceToastMessage')).toContainText(/error|already exists|cannot convert/i);
});

// Helpers
async function selectComboboxOption(page: Page, comboboxName: string, optionValue: string) {
  await page.getByRole('combobox', { name: comboboxName }).click();
  await page.waitForSelector('[role="listbox"]:visible');
  const option = page.locator(`lightning-base-combobox-item[data-value="${optionValue}"]`).first();
  await expect(option).toBeVisible({ timeout: 5000 });
  await option.click();
}

async function safeClick(page: Page, locator: import('@playwright/test').Locator) {
  await expect(locator).toBeVisible({ timeout: 10000 });
  await locator.click();
}
