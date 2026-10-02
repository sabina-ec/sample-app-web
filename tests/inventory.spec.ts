import { test, expect } from "@playwright/test";

test("SCRUM-14: problem user should see correct product images", async ({
  page,
}) => {
  test.fail(true, "SCRUM-20: known defect - incorrect product images");

  // Open the login page
  await page.goto("/");

  // Log in as problem_user
  await page.locator("#user-name").fill("problem_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // Verify that the Products page is displayed
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText("Products")).toBeVisible();

  // Verify that all six products are displayed
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

  // Define the expected image for each product
  const expectedImages = [
    {
      product: "Sauce Labs Backpack",
      image: /sauce-backpack-1200x1500\.jpg/,
    },
    {
      product: "Sauce Labs Bike Light",
      image: /bike-light-1200x1500\.jpg/,
    },
    {
      product: "Sauce Labs Bolt T-Shirt",
      image: /bolt-shirt-1200x1500\.jpg/,
    },
    {
      product: "Sauce Labs Fleece Jacket",
      image: /sauce-pullover-1200x1500\.jpg/,
    },
    {
      product: "Sauce Labs Onesie",
      image: /red-onesie-1200x1500\.jpg/,
    },
    {
      product: "Test.allTheThings() T-Shirt (Red)",
      image: /red-tatt-1200x1500\.jpg/,
    },
  ];

  // Verify that every product displays its expected image
  for (const { product, image } of expectedImages) {
    const productImage = page.getByRole("img", {
      name: product,
    });

    await expect
      .soft(productImage)
      .toHaveAttribute("src", image, { timeout: 1000 });
  }
});
