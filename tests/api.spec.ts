import {expect, test} from "@playwright/test";
import * as allure from "allure-js-commons";

const baseUrl = 'https://api.qase.io/v1';

test.beforeAll(async ({request}) => {
    const responsePostProject = await request.post(`${baseUrl}/project`, {
        data: {
            "title": "Test project",
            "code": "TP"
        },
        headers: {
            "Content-Type": "application/json",
            "Token": process.env.API_TOKEN
        }
    })
    await expect(responsePostProject.status()).toBe(200);

    const responseBody = JSON.parse(await responsePostProject.text());
    expect(responseBody.result.code).toBe("TP");
});


test.afterAll('Create suite', async ({request}) => {
    const responseDeleteProject = await request.delete(`${baseUrl}/project/TP`, {
        headers: {
            "Content-Type": "application/json",
            "Token": process.env.API_TOKEN
        }
    })
    await expect(responseDeleteProject.status()).toBe(200);
});


test('Create suite', async ({request}) => {
    await allure.epic("API");
    await allure.feature("Create suite");
    await allure.severity('Critical');
    await allure.tag("smoke")

    const responsePostSuite = await request.post(`${baseUrl}/suite/TP`, {
        data: {
            "title": "Test suite",
        },
        headers: {
            "Content-Type": "application/json",
            "Token": process.env.API_TOKEN
        }
    })
    await expect(responsePostSuite.status()).toBe(200);
})

test('Create case', async ({request}) => {
    await allure.epic("API");
    await allure.feature("Create case");
    await allure.severity('Critical');
    await allure.tag("smoke")

    const responsePostCase = await request.post(`${baseUrl}/case/TP`, {
        data: {
            "title": "Test case",
        },
        headers: {
            "Content-Type": "application/json",
            "Token": process.env.API_TOKEN
        }
    })
    await expect(responsePostCase.status()).toBe(200);
})

test('Create plan', async ({request}) => {
    await allure.epic("API");
    await allure.feature("Create plan");
    await allure.severity('Normal');

    const responsePostPlan = await request.post(`${baseUrl}/plan/TP`, {
        data: {
            "title": "Test plan",
            "cases": [1]
        },
        headers: {
            "Content-Type": "application/json",
            "Token": process.env.API_TOKEN
        }
    })
    await expect(responsePostPlan.status()).toBe(200);
    });