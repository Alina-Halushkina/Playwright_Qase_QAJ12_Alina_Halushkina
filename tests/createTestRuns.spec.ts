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
let projectName: string;
let caseName: string;
let testRunName: string;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    casePage = new CasePage(page);
    testRunPage = new TestRunPage(page);
    projectName = homePage.projectName;
    caseName = casePage.caseName;
    testRunName = testRunPage.testRunName;
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject(projectName);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
    await projectPage.createCaseButtonClick()
    await casePage.createCase(caseName);
    await casePage.caseSave();
    await expect(casePage.caseNameHeading(caseName)).toBeVisible();
});

test.afterEach(async ({page}) => {
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create test run', async ({page}) => {
    await projectPage.testRunButtonClick();
    await testRunPage.createTestRun(testRunName);
    await expect(testRunPage.testRunNameHeading(testRunName)).toBeVisible();
});