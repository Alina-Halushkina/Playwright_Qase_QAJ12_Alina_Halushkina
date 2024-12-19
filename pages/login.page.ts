import {BasePage} from "./base.page";

export class LoginPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/login";
    }

    get emailField() {
        return this.page.getByPlaceholder('Email');
    }

    get passwordField() {
        return this.page.getByPlaceholder('Password');
    }

    get loginButton() {
        return this.page.getByRole('button', {name: 'Sign'});
    }

    get incorrectEmailMessage() {
        return this.page.getByText('These credentials do not').first();
    }

    get simplePasswordMessage() {
        return this.page.getByText('Security notice: The password');
    }

    async login() {
        await this.page.getByPlaceholder('Email').fill(process.env.EMAIL);
        await this.page.getByPlaceholder('Password').fill(process.env.PASSWORD);
        await this.page.getByRole('button', {name: 'Sign'}).click();
    }

}