import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProjectPage } from "../pages/project.page";
import { CasePage } from "../pages/case.page";
import * as path from "node:path";
import * as allure from "allure-js-commons";
import { fakerEN } from "@faker-js/faker";
import {
  generateCaseName,
  generateProjectCode,
  generateProjectName,
} from "../test-data-generator";

let loginPage: LoginPage;
let homePage: HomePage;
let projectPage: ProjectPage;
let casePage: CasePage;
const projectName = generateProjectName();
const projectCode = generateProjectCode();
const filePath = path.dirname(__filename) + "/../files/scr-test.png";
const fileName = filePath.replace(/^.*[\\/]/, "");
const caseName = generateCaseName();

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  projectPage = new ProjectPage(page);
  casePage = new CasePage(page);

  await loginPage.goto();
  await loginPage.login();

  await homePage.createProject(projectName, projectCode);
  await expect(projectPage.projectNameHeading(projectName)).toBeVisible();
});

test.afterEach(async ({ page }) => {
  await projectPage.deleteProject();
  await expect(homePage.createdProjects).not.toContainText(projectName);
});

test("Create case with attachment", { tag: "@smoke" }, async ({ page }) => {
  await allure.epic("Web interface");
  await allure.feature("Create case");
  await allure.severity("Critical");
  await allure.tag("smoke");

  await projectPage.createCaseButtonClick();
  await casePage.createCase(caseName, filePath);
  // await expect(page.getByText(fileName)).toBeVisible();
  await casePage.caseSave();
  await expect(casePage.caseNameHeading(caseName)).toBeVisible();
});
