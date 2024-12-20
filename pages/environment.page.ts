import {BasePage} from "./base.page";

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

    get environmentName() {
        return this.page.getByRole('link', { name: 'Example env' });
    }

    async environmentCreate(environmentName: string, slugName: string) {
        await this.createNewEnvironmentButton.click();
        await this.environmentNameField.fill(environmentName);
        await this.slugNameField.fill(slugName);
        await this.environmentButtonCreate.click();
    }
}