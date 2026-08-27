import {test,expect} from '@playwright/test';
test('SCRUM-10: standard user can log in successfully',async ({page})=>{
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Products')).toBeVisible();


});

test('user cannot log in with invalid credentials', async ({ page }) => {
  await page.goto('/');

  await page.locator('#user-name').fill('invalid_user');
  await page.locator('#password').fill('wrong_password');
  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match any user in this service',
  );
  });

  test('locked out user cannot log in', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Sorry, this user has been locked out.',
  );
  });


