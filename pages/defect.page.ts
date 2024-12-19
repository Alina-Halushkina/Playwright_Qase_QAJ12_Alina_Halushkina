import {BasePage} from "./base.page";

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

    get defectName() {
        return this.page.locator('div').filter({ hasText: /^Test defect 1$/ });
    }

    async createDefect(defectName: string, defectDescription: string) {
        await this.createDefectButton.click();
        await this.defectNameField.fill(defectName);
        await this.defectDescriptionField.fill(defectDescription);
        await this.createDefectButtonConfirm.click();
    }
}