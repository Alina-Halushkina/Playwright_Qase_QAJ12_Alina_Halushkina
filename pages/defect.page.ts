import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as allure from "allure-js-commons";

export class DefectPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/defect/TP";
    }

    get createDefectButton() {
        return this.page.getByRole('link', { name: 'Create new defect' });
    }

    get defectNameField() {
        return this.page.getByPlaceholder('For example: Regression');
    }

    get defectDescriptionField() {
        return this.page.getByRole('paragraph');
    }

    get createDefectButtonConfirm() {
        return this.page.getByRole('button', { name: 'Create defect' });
    }

    defectNameHeading(defectName: string = this.defectName) {
        return this.page.getByRole('link', { name: defectName});
    }

    get defectName() {
        return `Defect ${fakerEN.string.alpha(5)}`;
    }

    get defectDescription() {
        return `Defect descr ${fakerEN.string.alpha(8)}`;
    }

    async createDefect(defectName: string = this.defectName, defectDescription: string = this.defectDescription) {
        await allure.step('Create defect', async () => {
            await this.createDefectButton.click();
            await this.defectNameField.fill(defectName);
            await this.defectDescriptionField.fill(defectDescription);
            await this.createDefectButtonConfirm.click();
        })
    }
}