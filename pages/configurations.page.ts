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

    configurationGroupNameHeading(configurationGroupName: string) {
        return this.page.getByText(configurationGroupName);
    }

    get configurationCreateButton() {
        return this.page.getByRole('button', { name: '+ Create configuration' });
    }

    get configurationTitleField() {
        return this.page.getByPlaceholder('Configuration title');
    }

    firstConfigurationHeading(configurationName: string) {
        return this.page.getByText(configurationName);
    }

    secondConfigurationHeading(configurationName2: string) {
        return this.page.getByText(configurationName2);
    }

    async configurationGroupCreate(configurationGroupName: string) {
        await allure.step('Create configuration group', async () => {
            await this.configurationGroupButton.click();
            await this.configurationGroupTitleField.fill(configurationGroupName);
            await this.configurationGroupCreateButton.click();
        })
    }

    async configurationCreate(configurationName: string) {
        await allure.step('Create configuration', async () => {
            await this.configurationCreateButton.click();
            await this.configurationTitleField.fill(configurationName);
            await this.page.keyboard.press('Enter');
        })
    }
}