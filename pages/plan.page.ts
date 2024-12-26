import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as allure from "allure-js-commons";

export class PlanPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/plan/TP";
    }

    get createPlanButton() {
        return this.page.getByRole('link', { name: 'Create plan' }).first();
    }

    get planNameField() {
        return this.page.getByPlaceholder('For example: Regression');
    }

    get addCasesButton() {
        return this.page.locator('#edit-plan-add-cases-button');
    }

    get selectCasesButton() {
        return this.page.getByText('Select all').first();
    }

    get confirmCasesButton() {
        return this.page.getByRole('button', { name: 'Done' });
    }

    get createPlanButtonConfirm() {
        return this.page.getByRole('button', { name: 'Create plan' });
    }

    get planName() {
        return `Plan ${fakerEN.string.alpha(5)}`;
    }

    planNameHeading(planName: string) {
        return this.page.getByRole('link', { name: planName});
    }

    async createPlan(planName: string) {
        await allure.step('Create plan', async () => {
            await this.createPlanButton.click();
            await this.planNameField.fill(planName);
            await this.addCasesButton.click();
            await this.selectCasesButton.click();
            await this.confirmCasesButton.click();
            await this.createPlanButtonConfirm.click();
        })
    }
}