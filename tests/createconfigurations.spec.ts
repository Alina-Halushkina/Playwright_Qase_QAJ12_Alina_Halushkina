import {test, expect} from '@playwright/test';
import {beforeEach} from "node:test";

test.beforeEach(
    async ({page}) => {
        await page.goto('https://app.qase.io/login');
        await page.getByPlaceholder('Email').fill(process.env.EMAIL);
        await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
        await page.getByRole('button', {name: 'Sign'}).click();
        await expect(page.getByRole('button', {name: 'Create new project'})).toBeVisible();

        await page.getByRole('button', {name: 'Create new project'}).click();
        await page.getByPlaceholder('For example: Web Application').fill('Test Project 1');
        await page.getByPlaceholder('For example: WA').fill('TP');
        await page.getByRole('button', {name: 'Create project'}).click();
        await expect(page.getByRole('heading', {name: 'Test Project 1'})).toBeVisible();
    });

test('Create configuration', async ({page}) => {
    await page.getByRole('link', {name: 'Configurations'}).click();
    await page.getByRole('button', { name: 'Create configuration group' }).click();
    await page.getByPlaceholder('Please enter configuration title').fill('Operating system');
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await expect(page.locator('div').filter({ hasText: /^Operating system$/ }).first()).toBeVisible();
    await page.getByRole('button', { name: '+ Create configuration' }).click();
    await page.getByPlaceholder('Configuration title').fill('Mac OS');
    await page.keyboard.press('Enter');
    await expect(page.locator('div').filter({ hasText: /^Mac OS$/ }).nth(1)).toBeVisible();
    await page.getByRole('button', { name: '+ Create configuration' }).click();
    await page.getByPlaceholder('Configuration title').fill('Windows OS');
    await page.keyboard.press('Enter');
    await expect(page.locator('div').filter({ hasText: /^Windows OS$/ })).toBeVisible();
});