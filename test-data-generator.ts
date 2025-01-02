import {fakerEN} from "@faker-js/faker";

export function generateProjectName() {
    return `Project ${fakerEN.string.alpha(5)}`
}

export function generateProjectCode() {
    return fakerEN.string.alpha(2).toUpperCase();
}

export function generateCaseName() {
    return `Case ${fakerEN.string.alpha(5)}`;
}

export function generateSuiteName() {
    return `Suite ${fakerEN.string.alpha(5)}`;
}

export function generateConfigurationGroupName() {
    return `Configuration Group ${fakerEN.string.alpha(5)}`;
}

export function generateFirstConfigurationName() {
    return `Configuration ${fakerEN.string.alpha(5)}`;
}

export function generateSecondConfigurationName() {
    return `Configuration ${fakerEN.string.alpha(5)}`;
}

export function generateDefectName() {
    return `Defect ${fakerEN.string.alpha(5)}`;
}

export function generateDefectDescription() {
    return `Description ${fakerEN.string.alpha(5)}`;
}

export function generateEnvironmentName() {
    return `Environment ${fakerEN.string.alpha(5)}`;
}

export function generateSlugName() {
    return `Slug ${fakerEN.string.alpha(5)}`;
}

export function generatePlanName() {
    return `Plan ${fakerEN.string.alpha(5)}`;
}

export function generateTestRunName() {
    return `Test Run ${fakerEN.string.alpha(5)}`;
}