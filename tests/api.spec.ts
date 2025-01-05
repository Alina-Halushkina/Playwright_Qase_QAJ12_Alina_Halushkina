import {expect, test} from "@playwright/test";
import * as allure from "allure-js-commons";

const baseUrl = 'https://api.qase.io/v1';

test('Create and delete project', async ({request}) => {
    await allure.epic("API");
    await allure.feature("Create project");
    await allure.severity('Blocker');
    await allure.tag("smoke")

    const response = await request.post(`${baseUrl}/project`, {
        data: {
            "title": "Test project",
            "code": "TP"
        },
        headers: {
            "Content-Type": "application/json",
            "Token": process.env.API_TOKEN
        }
    })

    await expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());

    expect(responseBody.result.code).toBe("TP");


    const responseDelete = await request.delete(`${baseUrl}/project/TP`, {
        headers: {
            "Content-Type": "application/json",
            "Token": process.env.API_TOKEN
        }
    })

    await expect(responseDelete.status()).toBe(200);
});