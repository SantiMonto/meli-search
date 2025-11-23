import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mercado Libre/);
  });

  test('search results page loads', async ({ page }) => {
    await page.goto('/?q=iphone');
    await expect(page).toHaveURL(/q=iphone/);
  });
});
