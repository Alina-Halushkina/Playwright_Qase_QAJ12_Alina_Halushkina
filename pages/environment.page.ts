import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";

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

    environmentNameHeading(environmentName: string = this.environmentName) {
        return this.page.getByRole('link', { name: environmentName });
    }

    get environmentName() {
        return `Environment ${fakerEN.string.alpha(5)}`;
    }

    get slugName() {
        return `Environment ${fakerEN.string.alpha(6)}`;
    }

    async environmentCreate(environmentName: string = this.environmentName, slugName: string = this.slugName) {
        await this.createNewEnvironmentButton.click();
        await this.environmentNameField.fill(environmentName);
        await this.slugNameField.fill(slugName);
        await this.environmentButtonCreate.click();
    }
}