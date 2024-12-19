import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import {ProjectPage} from "../pages/project.page";
import {DefectPage} from "../pages/defect.page";

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
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.createProject('Test Project 1', 'TP');
    await expect(projectPage.projectName).toBeVisible();
});

test('Create defect', async ({page}) => {
    await projectPage.defectsButtonClick();
    await defectPage.createDefect('Test defect 1', 'Actual result');
    await expect(defectPage.defectName).toBeVisible();
});