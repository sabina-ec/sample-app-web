import {test,expect} from '@playwright/test';
test('SCRUM-10: standard user can log in successfully',async ({page})=>{
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Products')).toBeVisible();


   
});