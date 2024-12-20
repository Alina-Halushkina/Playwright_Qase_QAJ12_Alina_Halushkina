import {BasePage} from "./base.page";

export class ConfigurationsPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/configuration/TP";
    }

    get configurationGroupButton() {
        return this.page.getByRole('button', { name: 'Create configuration group' });
    }

    get configurationGroupTitleField() {
        return this.page.getByPlaceholder('Please enter configuration title');
    }

    get configurationGroupCreateButton() {
        return this.page.getByRole('button', { name: 'Create', exact: true });
    }

    get configurationGroupName() {
        return this.page.locator('div').filter({ hasText: /^Operating system$/ }).first();
    }

    get configurationCreateButton() {
        return this.page.getByRole('button', { name: '+ Create configuration' });
    }

    get configurationTitleField() {
        return this.page.getByPlaceholder('Configuration title');
    }

    get firstConfiguration() {
        return this.page.locator('div').filter({ hasText: /^Mac OS$/ }).nth(1);
    }

    get secondConfiguration() {
        return this.page.locator('div').filter({ hasText: /^Windows OS$/ });
    }

    async configurationGroupCreate(configurationGroupTitle: string) {
        await this.configurationGroupButton.click();
        await this.configurationGroupTitleField.fill(configurationGroupTitle);
        await this.configurationGroupCreateButton.click();
    }

    async configurationCreate(configurationTitle: string) {
        await this.configurationCreateButton.click();
        await this.configurationTitleField.fill(configurationTitle);
        await this.page.keyboard.press('Enter');
    }
}