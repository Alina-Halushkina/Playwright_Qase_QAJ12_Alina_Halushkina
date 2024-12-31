import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as path from "node:path";
import * as allure from "allure-js-commons";

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

    get caseAttachmentUpload() {
        return this.page.getByLabel('Upload attachment').locator('form');
    }

    get caseSaveButton() {
        return this.page.getByRole('button', { name: 'Save', exact: true });
    }

    caseNameHeading(caseName: string) {
        return this.page.getByRole('heading', {name: caseName});
    }

    async createCase(
        caseName: string,
        filePath: string = path.dirname(__filename) + '/../files/scr test.png'
    ) {
        await allure.step('Create case', async () => {
            await this.caseNameField.fill(caseName);
            await this.caseAttachmentButton.click();
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.caseAttachmentUpload.click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(filePath);
        })
    }

    async caseSave() {
        await allure.step('Save case', async () => {
            await this.caseSaveButton.click();
        })
    }
}