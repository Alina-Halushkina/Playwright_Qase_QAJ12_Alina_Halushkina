import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as allure from "allure-js-commons";

export class TestRunPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/run/TP";
    }

    get createTestRunButton() {
        return this.page.getByRole('button', { name: 'Start new test run' }).first();
    }

    get testRunNameField() {
        return this.page.getByPlaceholder('Give a name to the test run');
    }

    get selectCasesButton() {
        return this.page.getByRole('button', { name: 'Select cases' });
    }

    get selectAllCasesButton() {
        return this.page.getByText('Select all').first();
    }

    get selectCasesButtonConfirm() {
        return this.page.getByRole('button', { name: 'Done' });
    }

    get testRunConfirmButton() {
        return this.page.getByRole('button', { name: 'Start a run' });
    }

    testRunNameHeading(testRunName: string = this.testRunName) {
        return this.page.getByRole('heading', {name: testRunName});
    }

    get testRunName() {
        return `Test run ${fakerEN.string.alpha(5)}`;
    }

    async createTestRun(testRunName: string = this.testRunName) {
        await allure.step('Create plan', async () => {
            await this.createTestRunButton.click();
            await this.testRunNameField.fill(testRunName);
            await this.selectCasesButton.click();
            await this.selectAllCasesButton.click();
            await this.selectCasesButtonConfirm.click();
            await this.testRunConfirmButton.click();
        })
    }

}