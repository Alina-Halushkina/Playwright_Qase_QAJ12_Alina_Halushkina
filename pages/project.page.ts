import {BasePage} from "./base.page";

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

    get suiteName() {
        return this.page.getByRole('heading', {name: 'Test suite 1'});
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
        await this.projectSettingsButton.click();
        await this.projectDeleteButton.click();
        await this.projectDeleteConfirmButton.click();
    }

    async createSuite(suiteName: string) {
        await this.createSuiteButton.click();
        await this.suiteNameField.fill(suiteName);
        await this.suiteButtonCreate.click();
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