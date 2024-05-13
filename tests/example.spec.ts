import { test, expect, Page } from '@playwright/test';

const url = 'http://localhost:3000';

async function goToExample (page: Page)  {
    await page.goto(`${url}/example.html`);
}

test.describe('buttons', () => {
  test('nope', async ({ page }) => {
    await goToExample(page);
    const button = page.getByText('Button', {exact: true})
    await expect(button).toBeVisible();

    const button1 = page.getByText('Button 1')
    await expect(button1).toBeVisible();
  })
  test('get by role', async ({ page }) => {
    await goToExample(page);
    const button = page.getByRole('button', { name: 'Button 1' });
    await expect(button).toBeVisible();

    await goToExample(page);
    const button1 = page.getByText('Button 1');
    await expect(button1).toBeVisible();
  })
})
