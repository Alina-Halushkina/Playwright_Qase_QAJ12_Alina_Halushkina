import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let projectName: string;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    projectName = homePage.projectName;
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
});

test('Create project failes', {tag: "@smoke"}, async ({page}) => {
    await homePage.createProject(projectName);
    await expect(projectPage.projectNameHeading('123')).toBeVisible();
});