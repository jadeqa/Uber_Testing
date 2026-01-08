import { test, expect, Page } from '@playwright/test';

  
test('Salesforce Lead Creation and Conversion - Account Verification', async ({ page }) => {
  page.setDefaultTimeout(5000);

  // 1. Login
  await page.goto('http://test.salesforce.com');
  await page.fill('#username', 'YOUR_USER'); // replace with actual
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
  await page.getByRole('combobox', { name: 'Service Territory' }).fill('San Fran');
  await page.getByTitle('San Francisco, United States').click();

  // 4. Save
  await page.click('button:has-text("Save")');

  // 5. Assert lead creation
  await expect(page.locator('.toast-message')).toContainText('Lead created successfully');
  await expect(page.locator('#leadStatus')).toHaveText('New');

  // 6. Mark status as complete
  await page.click('button:has-text("Mark Status as Complete")');
  await expect(page.locator('#leadStatus')).toHaveText('Qualifying');

  // 7. Sub-status → Sales Ready
  await selectComboboxOption(page, 'Lead Sub Status', 'Sales Ready');
  await page.click('button:has-text("Done")');
  await expect(page.locator('.toast-message')).toContainText('Status changed successfully');

  // 8. Convert lead
  await page.click('button:has-text("Convert")');
  await page.click('button:has-text("Convert")');

  // 9. Click on account link
  await page.click('a:has-text("Account")');

  // 10. Verify account details
  const accountName = await page.locator('span[data-field="Account Name"]').innerText();
  const parentAccount = await page.locator('span[data-field="Parent Account"]').innerText();
  const primaryContact = await page.locator('span[data-field="Primary Contact"]').innerText();
  const phoneNumber = await page.locator('span[data-field="Phone"]').innerText();
  const address = await page.locator('span[data-field="Address"]').innerText();
  const leadSource = await page.locator('span[data-field="Lead Source"]').innerText();
  const accountType = await page.locator('span[data-field="Account Type"]').innerText();

  // Assertions: compare with values entered earlier
  expect(accountName).toContain('Softek');
  expect(parentAccount).not.toBeNull(); // optional, depending on setup
  expect(primaryContact).toContain('abd');
  expect(phoneNumber).not.toBeNull(); // optional if phone was filled
  expect(address).toContain('USA');
  expect(leadSource).toContain('Outbound');
  expect(accountType).toBe('PL');
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