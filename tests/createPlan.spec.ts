import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
    await projectPage.createCase('Test case 1');
    await expect(projectPage.caseAttachmentFile).toBeVisible();
    await projectPage.caseSave();
    await expect(projectPage.caseName).toBeVisible();
});

test('Create plan', async ({page}) => {
    await page.getByRole('link', { name: 'Test Plans' }).click();
    await page.getByRole('link', { name: 'Create plan' }).first().click();
    await page.getByPlaceholder('For example: Regression').fill('Test plan 1');
    await page.getByRole('button', { name: ' Add cases' }).click();
    await page.getByText('Select all').first().click();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('button', { name: 'Create plan' }).click();
    await expect(page.getByRole('link', { name: 'Test plan 1' })).toBeVisible();
});