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
});

test('Create suite', async ({page}) => {
    await projectPage.createSuite('Test suite 1');
    await expect(projectPage.suiteName).toBeVisible();
});