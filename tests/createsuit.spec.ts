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

test('Create suit', async ({page}) => {
    await page.getByRole('button', {name: 'Create new project'}).click();
    await page.getByPlaceholder('For example: Web Application').fill('Test Project');
    await page.getByPlaceholder('For example: WA').fill('TP');
    await page.getByRole('button', { name: 'Create project' }).click();
    await expect(page.getByRole('heading', { name: 'Test Project' })).toBeVisible();
    await page.getByRole('button', { name: 'Suite', exact: true }).click();
    await page.getByPlaceholder('For example: Web Application').fill('Test suite');
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await expect(page.getByRole('heading', {name: 'Test suite'})).toBeVisible();
});