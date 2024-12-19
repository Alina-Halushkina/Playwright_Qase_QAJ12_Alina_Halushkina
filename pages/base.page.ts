import {expect, type Locator, type Page} from "@playwright/test";

export abstract class BasePage {
    abstract get pageURL(): string;

    constructor(protected readonly page: Page) {
    }

    async goto() {
        await this.page.goto(this.pageURL);
    }
}