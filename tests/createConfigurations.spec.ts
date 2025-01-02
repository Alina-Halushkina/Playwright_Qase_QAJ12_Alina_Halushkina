import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {ConfigurationsPage} from "../pages/configurations.page";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";
import {
    generateConfigurationGroupName,
    generateFirstConfigurationName,
    generateProjectCode,
    generateProjectName, generateSecondConfigurationName
} from "../test-data-generator";

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

test('Create configuration', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create configuration");
    await allure.severity('Normal')

    const configurationGroupName = generateConfigurationGroupName();
    const firstConfigurationName = generateFirstConfigurationName();
    const secondConfigurationName = generateSecondConfigurationName();

    await projectPage.configurationButtonClick();
    await configurationsPage.configurationGroupCreate(configurationGroupName);
    await expect(configurationsPage.configurationGroupNameHeading(configurationGroupName)).toBeVisible();
    await configurationsPage.configurationCreate(firstConfigurationName);
    await expect(configurationsPage.firstConfigurationHeading(firstConfigurationName)).toBeVisible();
    await configurationsPage.configurationCreate(secondConfigurationName);
    await expect(configurationsPage.secondConfigurationHeading(secondConfigurationName)).toBeVisible();
});