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

test('Create environments', async ({page}) => {
    await page.getByRole('link', { name: 'Environments' }).click();
    await page.getByRole('link', { name: 'Create new environment' }).click();
    await page.getByPlaceholder('Production').fill('Example env');
    await page.getByPlaceholder('prod', { exact: true }).fill('prod');
    await page.getByRole('button', { name: 'Create environment' }).click();
    await expect(page.getByRole('link', { name: 'Example env' })).toBeVisible();
});