import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {CasePage} from "../pages/case.page";
import {DefectPage} from "../pages/defect.page";
import * as allure from "allure-js-commons";
import {fakerEN} from "@faker-js/faker";
import {
    generateDefectDescription,
    generateDefectName,
    generateProjectCode,
    generateProjectName
} from "../test-data-generator";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let defectPage: DefectPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    projectPage = new ProjectPage(page);
    defectPage = new DefectPage(page);

    await loginPage.goto();
    await loginPage.login();

    const projectName = generateProjectName();
    const projectCode = generateProjectCode();
    await homePage.createProject(projectName, projectCode);
    await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test.afterEach(async ({page}) => {
    const projectName =`Project ${fakerEN.string.alpha(5)}`;
    await projectPage.deleteProject();
    await expect(homePage.createdProjects).not.toContainText(projectName);
});

test('Create defect', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Create defect");
    await allure.severity('Normal')

    const defectName = generateDefectName();
    const defectDescription = generateDefectDescription();
    await projectPage.defectsButtonClick();
    await defectPage.createDefect(defectName, defectDescription);
    await expect(defectPage.defectNameHeading(defectName)).toBeVisible();
});