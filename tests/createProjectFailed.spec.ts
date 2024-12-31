import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";

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

test.afterEach(async ({page}) => {
    const projectName =`Project ${fakerEN.string.alpha(5)}`;
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create project failed', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create project failed");
    await allure.severity('Trivial');

    await homePage.createProject(projectName);
    await expect(projectPage.projectNameHeading('123')).toBeVisible();
});