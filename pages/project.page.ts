import {BasePage} from "./base.page";

export class ProjectPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/projects/TP";
    }

    get projectName() {
        return this.page.getByRole('heading', {name: 'Test Project 1'});
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

    get caseNameField() {
        return this.page.getByPlaceholder('For example: Authorization');
    }

    get caseAttachmentButton() {
        return this.page.getByRole('button', { name: 'Add attachment' });
    }

    get caseAttachmentBrowse() {
        return this.page.getByRole('link', { name: 'Browse' });
    }

    get caseAttachmentFile() {
        return this.page.getByRole('link', { name: 'disc.png 280.74 KB' });
    }

    get caseSaveButton() {
        return this.page.getByRole('button', { name: 'Save', exact: true });
    }

    get caseName() {
        return this.page.getByRole('heading', {name: 'Test case 1'});
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

    async createCase(caseName: string) {
        await this.caseButtonCreate.click();
        await this.caseNameField.fill(caseName);
        await this.caseAttachmentButton.click();
        await this.caseAttachmentBrowse.click();
        await this.caseAttachmentFile.click();
    }
    async caseSave() {
        await this.caseSaveButton.click();
    }
}