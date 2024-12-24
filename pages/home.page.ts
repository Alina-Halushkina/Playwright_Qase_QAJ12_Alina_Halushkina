import {BasePage} from "./base.page";
import {fakerEN} from "@faker-js/faker";

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

    get projectName() {
        return `Project ${fakerEN.string.sample(5)}`;
    }

    get projectCode() {
        return fakerEN.string.sample(2).toUpperCase();
    }

    async logout() {
        await this.userIcon.click();
        await this.logoutButton.click();
    }

    async createProject(projectName: string = this.projectName, projectCode: string = this.projectCode) {
        await this.createProjectButton.click();
        await this.page.getByPlaceholder('For example: Web Application').fill(projectName);
        await this.page.getByPlaceholder('For example: WA').fill(projectCode);
        await this.page.getByRole('button', {name: 'Create project'}).click();
    }
}