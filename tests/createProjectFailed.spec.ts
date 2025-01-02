import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";
import {generateProjectCode, generateProjectName} from "../test-data-generator";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
const projectName = generateProjectName();
const projectCode = generateProjectCode();

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);

    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
});

test.afterEach(async ({page}) => {
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create project failed', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create project failed");
    await allure.severity('Trivial');

    await homePage.createProject(projectName, projectCode);
    await expect(projectPage.projectNameHeading('123')).toBeVisible();
});