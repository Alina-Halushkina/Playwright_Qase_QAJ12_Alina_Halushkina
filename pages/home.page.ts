import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";
import * as allure from "allure-js-commons";

export class HomePage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/projects";
    }

    get createProjectButton() {
        return this.page.getByRole('button', {name: 'Create new project'});
    }

    get userIcon() {
        return this.page.getByLabel('user', { exact: true });
    }

    get logoutButton() {
        return this.page.getByRole('menuitem', { name: 'Sign out' });
    }

    get createdProjects() {
        return this.page.getByText('ProjectsCreate new');
    }

    async logout() {
        await allure.step('Logout', async () => {
            await this.userIcon.click();
            await this.logoutButton.click();
        });
    }

    async createProject(projectName: string, projectCode: string) {
        await allure.step('Create project', async () => {
            await this.createProjectButton.click();
            await this.page.getByPlaceholder('For example: Web Application').fill(projectName);
            await this.page.getByPlaceholder('For example: WA').fill(projectCode);
            await this.page.getByRole('button', {name: 'Create project'}).click();
        });
    }
}