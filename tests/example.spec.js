// @ts-check
const { test, expect } = require('@playwright/test');

test('AddNote', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/Assignment3FrontEnd/index.html');

  // Expect a title "to contain" a substring.
  const elem = await page.locator('input');

  
  await page.fill('input[type="text"]', 'Ny notering');
  await page.keyboard.press('Enter');
  
  await expect(page.locator("li")).toContainText("Ny notering");
});

test('One item left controll', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
