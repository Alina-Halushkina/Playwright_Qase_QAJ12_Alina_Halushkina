import {test, expect} from '@playwright/test';
import {beforeEach} from "node:test";

test.beforeEach(
    async ({page}) => {
        await page.goto('https://app.qase.io/login');
        await page.getByPlaceholder('Email').fill(process.env.EMAIL);
        await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
        await page.getByRole('button', {name: 'Sign'}).click();
        await expect(page.getByRole('button', {name: 'Create new project'})).toBeVisible();
    }
)

test('Create case with attachment', async ({page}) => {
    await page.getByRole('button', {name: 'Create new project'}).click();
    await page.getByPlaceholder('For example: Web Application').fill('Test Project 1');
    await page.getByPlaceholder('For example: WA').fill('TP');
    await page.getByRole('button', {name: 'Create project'}).click();
    await expect(page.getByRole('heading', {name: 'Test Project 1'})).toBeVisible();
    await page.getByRole('button', {name: 'Case', exact: true}).click();
    await page.getByPlaceholder('For example: Authorization').fill('Test case 1');
    await page.getByRole('button', { name: 'Add attachment' }).click();
    await page.getByRole('link', { name: 'Browse' }).click();
    await page.getByRole('link', { name: 'disc.png 280.74 KB' }).click();
    await expect(page.getByRole('link', { name: 'disc.png 280.74 KB' })).toBeVisible();
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.getByRole('heading', {name: 'Test case 1'})).toBeVisible();
});