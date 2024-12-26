import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as allure from "allure-js-commons";

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

    configurationGroupNameHeading(configurationGroupName: string = this.configurationGroupName) {
        return this.page.getByText(configurationGroupName);
    }

    get configurationCreateButton() {
        return this.page.getByRole('button', { name: '+ Create configuration' });
    }

    get configurationTitleField() {
        return this.page.getByPlaceholder('Configuration title');
    }

    get configurationGroupName() {
        return `Conf group ${fakerEN.string.alpha(5)}`;
    }

    get configurationName() {
        return `Conf ${fakerEN.string.alpha(5)}`;
    }

    get configurationName2() {
        return `Conf ${fakerEN.string.alpha(6)}`;
    }

    firstConfigurationHeading(configurationName: string = this.configurationName) {
        return this.page.getByText(configurationName);
    }

    secondConfigurationHeading(configurationName2: string = this.configurationName2) {
        return this.page.getByText(configurationName2);
    }

    async configurationGroupCreate(configurationGroupName: string = this.configurationGroupName) {
        await allure.step('Create configuration group', async () => {
            await this.configurationGroupButton.click();
            await this.configurationGroupTitleField.fill(configurationGroupName);
            await this.configurationGroupCreateButton.click();
        })
    }

    async configurationCreate(configurationName: string = this.configurationName) {
        await allure.step('Create configuration', async () => {
            await this.configurationCreateButton.click();
            await this.configurationTitleField.fill(configurationName);
            await this.page.keyboard.press('Enter');
        })
    }
}