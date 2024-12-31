import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import * as path from "node:path";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let casePage: CasePage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    casePage = new CasePage(page);

    await loginPage.goto();
    await loginPage.login();
    const projectName =`Project ${fakerEN.string.alpha(5)}`;
    const projectCode = fakerEN.string.alpha(2).toUpperCase();
    await homePage.createProject(projectName, projectCode);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test.afterEach(async ({page}) => {
    const projectName =`Project ${fakerEN.string.alpha(5)}`;
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create case with attachment', {tag: "@smoke"}, async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create case");
    await allure.severity('Critical')
    await allure.tag("smoke")

    const filePath = path.dirname(__filename) + '/../files/scr test.png';
    const fileName = filePath.replace(/^.*[\\/]/, '')
    const caseName = `Case ${fakerEN.string.alpha(5)}`;

    await projectPage.createCaseButtonClick()
    await casePage.createCase(caseName, filePath);
    await expect(page.getByText(fileName)).toBeVisible();
    await casePage.caseSave();
    await expect(casePage.caseNameHeading(caseName)).toBeVisible();
});