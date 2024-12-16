import { test, expect } from '@playwright/test';

test('Login with correct email and password', async ({ page }) => {
  await page.goto('https://app.qase.io/login');
  await page.getByPlaceholder('Email').fill(process.env.EMAIL);
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
  await page.getByRole('button', {name: 'Sign'}).click();
  await expect(page.getByRole('button', {name: 'Create new project'})).toBeVisible();
});

test('Login with incorrect email and password', async ({ page }) => {
  await page.goto('https://app.qase.io/login');
  await page.getByPlaceholder('Email').fill('test@gmail.com');
    await page.getByPlaceholder('Password').fill('Testing1749!');
    await page.getByRole('button', {name: 'Sign'}).click();
    await expect(page.getByText('These credentials do not').first()).toBeVisible();
});

test('Login with incorrect email and simple password', async ({ page }) => {
  await page.goto('https://app.qase.io/login');
  await page.getByPlaceholder('Email').fill('test@gmail.com');
  await page.getByPlaceholder('Password').fill('123');
  await page.getByRole('button', {name: 'Sign'}).click();
  await expect(page.getByText('Security notice: The password')).toBeVisible();
});
