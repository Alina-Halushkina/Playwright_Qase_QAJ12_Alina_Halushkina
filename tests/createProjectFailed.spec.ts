import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import * as allure from "allure-js-commons";

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
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create project failes', {tag: "@smoke"}, async ({page}) => {
    await allure.epic("Project management");
    await allure.story("As an active user, I want to successfully create a project");
    await allure.tags("smoke");

    await homePage.createProject(projectName);
    await expect(projectPage.projectNameHeading('123')).toBeVisible();
});