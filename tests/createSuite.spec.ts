import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";
import {generateProjectCode, generateProjectName, generateSuiteName} from "../test-data-generator";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
const projectName = generateProjectName();
const projectCode = generateProjectCode();
const suiteName = generateSuiteName();

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);

    await loginPage.goto();
    await loginPage.login();

    await homePage.createProject(projectName, projectCode);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test.afterEach(async ({page}) => {
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create suite', {tag: "@smoke"}, async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create suite");
    await allure.severity('Critical');
    await allure.tag("smoke")

    await projectPage.createSuite(suiteName);
    await expect(projectPage.suiteNameHeading(suiteName)).toBeVisible();
});