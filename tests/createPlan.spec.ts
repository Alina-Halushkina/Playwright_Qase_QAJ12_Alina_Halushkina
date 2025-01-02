import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import {PlanPage} from "../pages/plan.page";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";
import path from "node:path";

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

    const projectName =`Project ${fakerEN.string.alpha(5)}`;
    const projectCode = fakerEN.string.alpha(2).toUpperCase();
    await homePage.createProject(projectName, projectCode);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();

    const caseName = `Case ${fakerEN.string.alpha(5)}`;
    const filePath = path.dirname(__filename) + '/../files/scr test.png';
    await projectPage.createCaseButtonClick()
    await casePage.createCase(caseName, filePath);
    await casePage.caseSave();
    await expect(casePage.caseNameHeading(caseName)).toBeVisible();
});

test.afterEach(async ({page}) => {
    const projectName =`Project ${fakerEN.string.alpha(5)}`;
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create plan', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create plan");
    await allure.severity('Normal')

    const planName = `Plan ${fakerEN.string.alpha(5)}`;
    await projectPage.plansButtonClick();
    await planPage.createPlan(planName);
    await expect(planPage.planNameHeading(planName)).toBeVisible();
});