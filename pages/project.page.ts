import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as allure from "allure-js-commons";

export class ProjectPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/projects/TP";
    }

    projectNameHeading(projectName: string) {
        return this.page.getByRole('heading', {name: projectName});
    }

    get projectSettingsButton() {
        return this.page.getByRole('link', {name: 'Settings'});
    }

    get projectDeleteButton() {
        return this.page.getByRole('button', {name: 'Delete project'});
    }

    get projectDeleteConfirmButton() {
        return this.page.getByLabel('Delete project').getByRole('button', {name: 'Delete project'});
    }

    get createSuiteButton() {
        return this.page.getByRole('button', { name: 'Suite', exact: true });
    }

    get suiteNameField() {
        return this.page.getByPlaceholder('For example: Web Application');
    }

    get suiteButtonCreate() {
        return this.page.getByRole('button', { name: 'Create', exact: true });
    }

    suiteNameHeading(suiteName: string) {
        return this.page.getByRole('heading', {name: suiteName});
    }

    get caseButtonCreate() {
        return this.page.getByRole('button', {name: 'Case', exact: true});
    }

    get plansButton() {
        return this.page.getByRole('link', { name: 'Test Plans' });
    }

    get defectsButton() {
        return this.page.getByRole('link', {name: 'Defects'});
    }

    get testRunButton() {
        return this.page.getByRole('link', { name: 'Test Runs' });
    }

    get configurationButton() {
        return this.page.getByRole('link', {name: 'Configurations'});
    }

    get environmentsButton() {
        return this.page.getByRole('link', {name: 'Environments'});
    }

    async deleteProject() {
        await allure.step('Create plan', async () => {
            await this.projectSettingsButton.click();
            await this.projectDeleteButton.click();
            await this.projectDeleteConfirmButton.click();
        })
    }

    async createSuite(suiteName: string) {
        await allure.step('Create plan', async () => {
            await this.createSuiteButton.click();
            await this.suiteNameField.fill(suiteName);
            await this.suiteButtonCreate.click();
        })
    }

    async createCaseButtonClick() {
        await this.caseButtonCreate.click();
    }

    async plansButtonClick() {
        await this.plansButton.click();
    }

    async defectsButtonClick() {
        await this.defectsButton.click();
    }

    async testRunButtonClick() {
        await this.testRunButton.click();
    }

    async configurationButtonClick() {
        await this.configurationButton.click();
    }

    async environmentsButtonClick() {
        await this.environmentsButton.click();
    }
}