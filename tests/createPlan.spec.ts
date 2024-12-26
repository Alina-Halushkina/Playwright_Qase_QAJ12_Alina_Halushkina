import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import {PlanPage} from "../pages/plan.page";
import * as allure from "allure-js-commons";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let casePage: CasePage;
let planPage: PlanPage;
let projectName: string;
let caseName: string;
let planName: string;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    casePage = new CasePage(page);
    planPage = new PlanPage(page);
    projectName = homePage.projectName;
    caseName = casePage.caseName;
    planName = planPage.planName;
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

test('Create plan', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create plan");
    await allure.severity('Normal')

    await projectPage.plansButtonClick();
    await planPage.createPlan(planName);
    await expect(planPage.planNameHeading(planName)).toBeVisible();
});