import {BasePage} from "./base.page";

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

    get projectName() {
        return this.page.getByRole('heading', { name: 'Test Project 1' });
    }

    get projectSettingsButton() {
        return this.page.getByRole('link', { name: 'Settings' });
    }

    get projectDeleteButton() {
        return this.page.getByRole('button', { name: 'Delete project' });
    }

    get projectDeleteConfirmButton() {
        return this.page.getByLabel('Delete project').getByRole('button', { name: 'Delete project' });
    }

    get createdProjects() {
        return this.page.getByText('ProjectsCreate new');
    }

    async logout() {
        await this.userIcon.click();
        await this.logoutButton.click();
    }

    async createProject(projectName: string, projectCode: string) {
        await this.createProjectButton.click();
        await this.page.getByPlaceholder('For example: Web Application').fill(projectName);
        await this.page.getByPlaceholder('For example: WA').fill(projectCode);
        await this.page.getByRole('button', {name: 'Create project'}).click();
    }

    async deleteProject() {
        await this.projectSettingsButton.click();
        await this.projectDeleteButton.click();
        await this.projectDeleteConfirmButton.click();
    }
}