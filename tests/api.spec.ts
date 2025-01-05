import { expect, test } from "@playwright/test";
import * as allure from "allure-js-commons";

const baseUrl = "https://api.qase.io/v1";

test.beforeAll(async ({ request }) => {
  const responsePostProject = await request.post(`${baseUrl}/project`, {
    data: {
      title: "Test project",
      code: "TP",
    },
    headers: {
      "Content-Type": "application/json",
      Token: process.env.API_TOKEN,
    },
  });

  expect(responsePostProject.status()).toBe(200);

  const responseBody = JSON.parse(await responsePostProject.text());
  expect(responseBody.result.code).toBe("TP");
});

test.afterAll("Create suite", async ({ request }) => {
  const responseDeleteProject = await request.delete(`${baseUrl}/project/TP`, {
    headers: {
      "Content-Type": "application/json",
      Token: process.env.API_TOKEN,
    },
  });

  expect(responseDeleteProject.status()).toBe(200);
});

test("Create suite", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create suite");
  await allure.severity("Critical");
  await allure.tag("smoke");

  const responsePostSuite = await request.post(`${baseUrl}/suite/TP`, {
    data: {
      title: "Test suite",
    },
    headers: {
      "Content-Type": "application/json",
      Token: process.env.API_TOKEN,
    },
  });

  expect(responsePostSuite.status()).toBe(200);
});

test("Create case", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create case");
  await allure.severity("Critical");
  await allure.tag("smoke");

  const responsePostCase = await request.post(`${baseUrl}/case/TP`, {
    data: {
      title: "Test case",
    },
    headers: {
      "Content-Type": "application/json",
      Token: process.env.API_TOKEN,
    },
  });

  expect(responsePostCase.status()).toBe(200);
});

test("Create plan", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create plan");
  await allure.severity("Normal");

  const responsePostPlan = await request.post(`${baseUrl}/plan/TP`, {
    data: {
      title: "Test plan",
      cases: [1],
    },
    headers: {
      "Content-Type": "application/json",
      Token: process.env.API_TOKEN,
    },
  });

  expect(responsePostPlan.status()).toBe(200);
});

test("Create defect", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create defect");
  await allure.severity("Normal");

  const responsePostDefect = await request.post(`${baseUrl}/defect/TP`, {
    data: {
      title: "Test defect",
      actual_result: "Test defect",
      severity: 1,
    },
    headers: {
      "Content-Type": "application/json",
      Token: process.env.API_TOKEN,
    },
  });

  expect(responsePostDefect.status()).toBe(200);
});

test("Create test run", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create test run");
  await allure.severity("Normal");

  const responsePostRun = await request.post(`${baseUrl}/run/TP`, {
    data: {
      title: "Test run",
      cases: [1],
    },
    headers: {
      "Content-Type": "application/json",
      Token: process.env.API_TOKEN,
    },
  });

  expect(responsePostRun.status()).toBe(200);
});

/**
 * @see https://developers.qase.io/reference/create-configuration
 */
test("Create configuration", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create configuration");
  await allure.severity("Normal");

  const responsePostConfigGroup = await request.post(
    `${baseUrl}/configuration/TP/group`,
    {
      data: {
        title: "Test configuration group",
      },
      headers: {
        "Content-Type": "application/json",
        Token: process.env.API_TOKEN,
      },
    },
  );

  expect(responsePostConfigGroup.status()).toBe(200);

  const responsePostConfiguration = await request.post(
    `${baseUrl}/configuration/TP`,
    {
      data: {
        title: "Test configuration",
        group_id: 1,
      },
      headers: {
        "Content-Type": "application/json",
        Token: process.env.API_TOKEN,
      },
    },
  );

  expect(responsePostConfiguration.status()).toBe(200);
});
