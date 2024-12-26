import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {EnvironmentPage} from "../pages/environment.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let projectName: string;
let environmentPage: EnvironmentPage;
let environmentName: string;
let slugName: string;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    environmentPage = new EnvironmentPage(page);
    projectName = homePage.projectName;
    environmentName = environmentPage.environmentName;
    slugName = environmentPage.slugName;
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject(projectName);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test.afterEach(async ({page}) => {
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create environments', async ({page}) => {
    await projectPage.environmentsButtonClick();
    await environmentPage.createEnvironment(environmentName, slugName);
    await expect(environmentPage.environmentNameHeading(environmentName)).toBeVisible();
});