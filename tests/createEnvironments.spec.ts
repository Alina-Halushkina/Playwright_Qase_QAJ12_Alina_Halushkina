import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {EnvironmentPage} from "../pages/environment.page";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";
import {
    generateEnvironmentName,
    generateProjectCode,
    generateProjectName,
    generateSlugName
} from "../test-data-generator";

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

    const projectName = generateProjectName();
    const projectCode = generateProjectCode();
    await homePage.createProject(projectName, projectCode);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test.afterEach(async ({page}) => {
    const projectName =`Project ${fakerEN.string.alpha(5)}`;
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create environments', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create environments");
    await allure.severity('Normal')

    const environmentName = generateEnvironmentName();
    const slugName = generateSlugName();

    await projectPage.environmentsButtonClick();
    await environmentPage.createEnvironment(environmentName, slugName);
    await expect(environmentPage.environmentNameHeading(environmentName)).toBeVisible();
});