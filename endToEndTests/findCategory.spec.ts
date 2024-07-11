import { test, expect } from '@playwright/test';

test("Should find the longboards category and go back to main page", async ({ page }) => {
    // Go to the skateboards page from the main page
    await page.goto("/");
    await page.click("text=Skateboards");
    await expect(page).toHaveURL("/products?p=c563ddaa-22e3-47d6-ac65-a67625749133");
    const skateboardsHeading = await page.locator('h1:has-text("Skateboards")');
    await expect(skateboardsHeading).toContainText("Skateboards");

    // Click on the Longboards subcategory and navigate to the Longboards page
    const longboardSpan = await page.locator('span:has-text("Longboards")');
    await expect(longboardSpan).toContainText("Longboards");
    await longboardSpan.click();
    await expect(page).toHaveURL("products?p=49eabc91-e262-4711-8493-dcc39cdbd74c");
    const longboardsHeading = await page.locator('h1:has-text("Longboards")');
    await expect(longboardsHeading).toContainText("Longboards");

    // Navigate back to main page
    const skateshopHeading = await page.locator('h1:has-text("Skate Shop")');
    await expect(skateshopHeading).toContainText("Skate Shop");
    await skateshopHeading.click();
    await expect(page).toHaveURL("/");
});