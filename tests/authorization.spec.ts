import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page";
import {HomePage} from "../pages/home.page";
import * as allure from "allure-js-commons";

let loginPage: LoginPage;
let homePage: HomePage;


test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
});

test('Login with correct email and password', {tag: "@smoke"}, async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Authorization");
    await allure.severity('Blocker')
    await allure.tag("smoke");

    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
});

test('Login with incorrect email and password', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Authorization");
    await allure.severity('Normal')

    await loginPage.login('test@gmail.com', 'Testing1749!');
    await expect(loginPage.incorrectEmailMessage).toBeVisible();
});

test('Login with incorrect email and simple password', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Authorization");
    await allure.severity('Normal')

    await loginPage.login('test@gmail.com', '123');
    await expect(loginPage.simplePasswordMessage).toBeVisible();
});

test('Sign out', async ({page}) => {
    await allure.epic("Web interface");
    await allure.feature("Authorization");
    await allure.severity('Normal')

    await loginPage.login();
    await expect(homePage.createProjectButton).toBeVisible();
    await homePage.logout();
    await expect(loginPage.loginButton).toBeVisible();
});