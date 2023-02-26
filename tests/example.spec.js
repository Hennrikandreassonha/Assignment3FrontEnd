// @ts-check
const { test, expect } = require('@playwright/test');
const exp = require('constants');

test('AddNote', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/Assignment3FrontEnd/index.html');

  await page.fill('input[type="text"]', 'Ny notering');
  await page.keyboard.press('Enter');
  
  await expect(page.locator("li")).toContainText("Ny notering");
});

test('One item left controll', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/Assignment3FrontEnd/index.html');

  await page.fill('input[type="text"]', 'Ny notering');
  await page.keyboard.press('Enter');

  await expect(page.locator("text = 1 item left")).toBeVisible();
});

test('3 Notes test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/Assignment3FrontEnd/index.html');

  await page.fill('input[type="text"]', 'Note 1');
  await page.keyboard.press('Enter');

  await page.fill('input[type="text"]', 'Note 2');
  await page.keyboard.press('Enter');

  await page.fill('input[type="text"]', 'Note 3');
  await page.keyboard.press('Enter');

  await page.getByRole('checkbox').first().check();

  await expect(page.locator("text = 2 items left")).toBeVisible();
});