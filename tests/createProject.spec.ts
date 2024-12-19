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
});

test('Create project', async ({page}) => {
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
});

test('Delete project', async ({page}) => {
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText('Test Project 1');
});