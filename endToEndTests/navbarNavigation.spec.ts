import { test, expect } from '@playwright/test';

test("Should navigate from the Main page to the Marketplace page", async ({ page }) => {
    // Start from the main page (the baseURL is set in the playwright.config.ts)
    await page.goto("/");

    // Find an element with the text 'Marketplace' and click on it
    await page.click("text=Marketplace");
    // The new URL should be "/marketplace" (baseURL is used there)
    await expect(page).toHaveURL("/marketplace");

    // The new page should contain an h1 with "Marketplace"
    const heading = await page.locator('h1:has-text("Marketplace")');
    await expect(heading).toContainText("Marketplace");
});

test("Should navigate from the Marketplace page to the Clothes page", async ({ page }) => {
    await page.goto("/marketplace");

    await page.click("text=Clothes");
    await expect(page).toHaveURL("/products?p=f6d0287d-22a0-4bd3-bb08-d4884c48bb49");

    const heading = await page.locator('h1:has-text("Clothes")');
    await expect(heading).toContainText("Clothes");
});

test("Should navigate from the Marketplace page to the Accessories page", async ({ page }) => {
    await page.goto("/marketplace");

    await page.click("text=Accessories");
    await expect(page).toHaveURL("/products?p=f3914c89-dd10-47ea-bc91-8a47cbc131ab");

    const heading = await page.locator('h1:has-text("Accessories")');
    await expect(heading).toContainText("Accessories");
});