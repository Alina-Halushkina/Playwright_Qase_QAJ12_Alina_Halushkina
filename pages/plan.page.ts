import {BasePage} from "./base.page";

export class PlanPage extends BasePage {

    get pageURL(): string {
        return "https://app.qase.io/plan/TP";
    }
}