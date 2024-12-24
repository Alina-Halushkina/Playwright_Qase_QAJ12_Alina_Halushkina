import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import {TestRunPage} from "../pages/testRun.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let casePage: CasePage;
let testRunPage: TestRunPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    casePage = new CasePage(page);
    testRunPage = new TestRunPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
    await projectPage.createCaseButtonClick()
    await casePage.createCase('Test case 1');
    await expect(casePage.caseAttachmentFile).toBeVisible();
    await casePage.caseSave();
    await expect(casePage.caseNameHeading).toBeVisible();
});

test('Create test run', async ({page}) => {
    await projectPage.testRunButtonClick();
    await testRunPage.createTestRun('Test run 1');
    await expect(testRunPage.testRunName).toBeVisible();
});