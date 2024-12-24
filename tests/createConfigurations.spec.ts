import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {ConfigurationsPage} from "../pages/configurations.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let projectName: string;
let configurationsPage: ConfigurationsPage;
let configurationGroupName: string;
let configurationName: string;
let configurationName2: string;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    configurationsPage = new ConfigurationsPage(page);
    projectName = homePage.projectName;
    configurationGroupName = configurationsPage.configurationGroupName;
    configurationName = configurationsPage.configurationName;
    configurationName2 = configurationsPage.configurationName2;
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject(projectName);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test('Create configuration', async ({page}) => {
    await projectPage.configurationButtonClick();
    await configurationsPage.configurationGroupCreate(configurationGroupName);
    await expect(configurationsPage.configurationGroupNameHeading(configurationGroupName)).toBeVisible();
    await configurationsPage.configurationCreate(configurationName);
    await expect(configurationsPage.firstConfigurationHeading(configurationName)).toBeVisible();
    await configurationsPage.configurationCreate(configurationName2);
    await expect(configurationsPage.secondConfigurationHeading(configurationName2)).toBeVisible();
});