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

    async logout() {
        await this.userIcon.click();
        await this.logoutButton.click();
    }
}