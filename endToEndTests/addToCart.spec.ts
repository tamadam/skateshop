import { test, expect } from '@playwright/test';

test("Add a product to Cart and check the cart content afterwards", async ({ page }) => {
    // Skateboards page
    await page.goto("/products?p=c563ddaa-22e3-47d6-ac65-a67625749133");

    // hardcoded url at the moment
    await page.goto("/product/80db9a44-f4e4-4672-b457-f5985d23c045");
    await page.getByRole("button", { name: "Add to Cart"}).click();

    const cartIcon = await page.locator("div.CartPreview_cartPreviewWrapper__l75O_");
    cartIcon.click();

    await page.getByText("Go to cart").click();
    await expect(page).toHaveURL("/cart");
});