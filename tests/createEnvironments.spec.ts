import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {EnvironmentPage} from "../pages/environment.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let environmentPage: EnvironmentPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    environmentPage = new EnvironmentPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
});

test('Create environments', async ({page}) => {
    await projectPage.environmentsButtonClick();
    await environmentPage.environmentCreate('Example env', 'prod');
    await expect(environmentPage.environmentName).toBeVisible();
});