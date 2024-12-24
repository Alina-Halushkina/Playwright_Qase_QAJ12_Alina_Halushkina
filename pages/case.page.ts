import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";

export class CasePage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/case/TP/create";
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

    caseNameHeading(caseName: string) {
        return this.page.getByRole('heading', {name: caseName});
    }

    get caseName() {
        return `Case ${fakerEN.string.alpha(5)}`;
    }

    async createCase(caseName: string = this.caseName) {
        await this.caseNameField.fill(caseName);
        await this.caseAttachmentButton.click();
        await this.caseAttachmentBrowse.click();
        await this.caseAttachmentFile.click();
    }
    async caseSave() {
        await this.caseSaveButton.click();
    }
}