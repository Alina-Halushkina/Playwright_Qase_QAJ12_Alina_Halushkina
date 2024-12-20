import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {ConfigurationsPage} from "../pages/configurations.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let configurationsPage: ConfigurationsPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    configurationsPage = new ConfigurationsPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
});

test('Create configuration', async ({page}) => {
    await projectPage.configurationButtonClick();
    await configurationsPage.configurationGroupCreate('Operating system');
    await expect(configurationsPage.configurationGroupName).toBeVisible();
    await configurationsPage.configurationCreate('Mac OS');
    await expect(configurationsPage.firstConfiguration).toBeVisible();
    await configurationsPage.configurationCreate('Windows OS');
    await expect(configurationsPage.secondConfiguration).toBeVisible();
});