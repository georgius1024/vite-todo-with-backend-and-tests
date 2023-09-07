import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/#/');
  await page.getByRole('link', { name: '2' }).click();
  await page.getByRole('link', { name: '1' }).click();
  await page.getByRole('link', { name: '⨯delectus aut autem' }).click();
  await page.getByText('Completed').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('12345');
  await page.getByText('Completed').click();
  await page.getByRole('button', { name: 'Save' }).click();
  const locator = page.getByRole("list");
  await expect(locator).toContainText('12345');
});