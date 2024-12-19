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

test('Create defect', async ({page}) => {
    await page.getByRole('link', {name: 'Defects'}).click();
    await page.getByRole('link', { name: 'Create new defect' }).click();
    await page.getByPlaceholder('For example: Regression').fill('Test defect 1');
    await page.getByRole('paragraph').fill('Actual test result');
    await page.getByRole('button', { name: 'Create defect' }).click();
    await expect(page.locator('div').filter({ hasText: /^Test defect 1$/ })).toBeVisible();
});