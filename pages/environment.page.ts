import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as allure from "allure-js-commons";

export class EnvironmentPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/environment/TP";
    }

    get createNewEnvironmentButton() {
        return this.page.getByRole('link', { name: 'Create new environment' });
    }

    get environmentNameField() {
        return this.page.getByPlaceholder('Production');
    }

    get slugNameField() {
        return this.page.getByPlaceholder('prod', { exact: true });
    }

    get environmentButtonCreate() {
        return this.page.getByRole('button', { name: 'Create environment' });
    }

    environmentNameHeading(environmentName: string) {
        return this.page.getByRole('link', { name: environmentName });
    }

    async createEnvironment(environmentName: string, slugName: string) {
        await allure.step('Create environment', async () => {
            await this.createNewEnvironmentButton.click();
            await this.environmentNameField.fill(environmentName);
            await this.slugNameField.fill(slugName);
            await this.environmentButtonCreate.click();
        })
    }
}