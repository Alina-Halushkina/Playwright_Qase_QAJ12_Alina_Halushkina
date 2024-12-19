import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import {PlanPage} from "../pages/plan.page";


let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let casePage: CasePage;
let planPage: PlanPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    casePage = new CasePage(page);
    planPage = new PlanPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
    await projectPage.createCaseButtonClick()
    await casePage.createCase('Test case 1');
    await expect(casePage.caseAttachmentFile).toBeVisible();
    await casePage.caseSave();
    await expect(casePage.caseName).toBeVisible();
});

test('Create plan', async ({page}) => {
    await projectPage.plansButtonClick();
    await planPage.createPlan('Test plan 1');
    await expect(planPage.planName).toBeVisible();
});