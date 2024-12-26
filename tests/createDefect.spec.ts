import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import {DefectPage} from "../pages/defect.page";
import * as allure from "allure-js-commons";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let defectPage: DefectPage;
let projectName: string;
let defectName: string;
let defectDescription: string;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    defectPage = new DefectPage(page);
    projectName = homePage.projectName;
    defectName = defectPage.defectName;
    defectDescription = defectPage.defectDescription;
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

test('Create defect', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create defect");
    await allure.severity('Normal')

    await projectPage.defectsButtonClick();
    await defectPage.createDefect(defectName, defectDescription);
    await expect(defectPage.defectNameHeading(defectName)).toBeVisible();
});