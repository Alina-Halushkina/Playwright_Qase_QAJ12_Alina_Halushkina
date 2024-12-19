import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
});

test('Create project', async ({page}) => {
    await homePage.createProject('Test Project 1', 'TP');
    await expect(homePage.projectName).toBeVisible();
});

test('Delete project', async ({page}) => {
    await homePage.createProject('Test Project 1', 'TP');
    await expect(homePage.projectName).toBeVisible();
    await homePage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText('Test Project 1');
});