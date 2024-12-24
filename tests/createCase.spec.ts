import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let casePage: CasePage;
let projectName: string;
let caseName: string;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    casePage = new CasePage(page);
    projectName = homePage.projectName;
    caseName = casePage.caseName;
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject(projectName);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test('Create case with attachment', {tag: "@smoke"}, async ({page}) => {
    await projectPage.createCaseButtonClick()
    await casePage.createCase(caseName);
    await expect(casePage.caseAttachmentFile).toBeVisible();
    await casePage.caseSave();
    await expect(casePage.caseNameHeading(caseName)).toBeVisible();
});