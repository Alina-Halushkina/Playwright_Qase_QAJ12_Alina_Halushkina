import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProjectPage } from "../pages/project.page";
import { CasePage } from "../pages/case.page";
import { TestRunPage } from "../pages/testRun.page";
import * as allure from "allure-js-commons";
import { fakerEN } from "@faker-js/faker";
import path from "node:path";
import {
  generateCaseName,
  generateProjectCode,
  generateProjectName,
  generateTestRunName,
} from "../test-data-generator";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let casePage: CasePage;
let testRunPage: TestRunPage;
const projectName = generateProjectName();
const projectCode = generateProjectCode();
const caseName = generateCaseName();
const filePath = path.dirname(__filename) + "/../files/scr-test.png";
const testRunName = generateTestRunName();

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  projectPage = new ProjectPage(page);
  casePage = new CasePage(page);
  testRunPage = new TestRunPage(page);

  await loginPage.goto();
  await loginPage.login();

  await homePage.createProject(projectName, projectCode);
  await expect(projectPage.projectNameHeading(projectName)).toBeVisible();

  await projectPage.createCaseButtonClick();
  await casePage.createCase(caseName, filePath);
  await casePage.caseSave();
  await expect(casePage.caseNameHeading(caseName)).toBeVisible();
});

test.afterEach(async ({ page }) => {
  await projectPage.deleteProject();
  await expect(homePage.createdProjects).not.toContainText(projectName);
});

test("Create test run", async ({ page }) => {
  await allure.epic("Web interface");
  await allure.feature("Create test run");
  await allure.severity("Normal");

  await projectPage.testRunButtonClick();
  await testRunPage.createTestRun(testRunName);
  await expect(testRunPage.testRunNameHeading(testRunName)).toBeVisible();
});
