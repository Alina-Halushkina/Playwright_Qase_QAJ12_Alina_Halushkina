import { expect, test } from "@playwright/test";
import * as allure from "allure-js-commons";

const projectCode = "TP";

test.beforeAll("Create project", async ({ request }) => {
  const responsePostProject = await request.post(
    `${process.env.BASE_URL}/project`,
    {
      data: {
        title: "Test project",
        code: projectCode,
      },
    },
  );

  expect(responsePostProject.status()).toBe(200);

  const responseBody = JSON.parse(await responsePostProject.text());
  expect(responseBody.result.code).toBe(projectCode);
});

test.afterAll("Delete project", async ({ request }) => {
  const responseDeleteProject = await request.delete(
    `${process.env.BASE_URL}/project/${projectCode}`,
  );

  expect(responseDeleteProject.status()).toBe(200);
});

/**
 * @see https://developers.qase.io/reference/create-suite
 */
test("Create suite", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create suite");
  await allure.severity("Critical");
  await allure.tag("smoke");

  const responsePostSuite = await request.post(
    `${process.env.BASE_URL}/suite/${projectCode}`,
    {
      data: {
        title: "Test suite",
      },
    },
  );

  expect(responsePostSuite.status()).toBe(200);
});

/**
 * @see https://developers.qase.io/reference/create-case
 */
test("Create case", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create case");
  await allure.severity("Critical");
  await allure.tag("smoke");

  const responsePostCase = await request.post(
    `${process.env.BASE_URL}/case/${projectCode}`,
    {
      data: {
        title: "Test case",
      },
    },
  );

  expect(responsePostCase.status()).toBe(200);
});

/**
 * @see https://developers.qase.io/reference/create-plan
 */
test("Create plan", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create plan");
  await allure.severity("Normal");

  const responsePostPlan = await request.post(
    `${process.env.BASE_URL}/plan/${projectCode}`,
    {
      data: {
        title: "Test plan",
        cases: [1],
      },
    },
  );

  expect(responsePostPlan.status()).toBe(200);
});

/**
 * @see https://developers.qase.io/reference/create-defect
 */
test("Create defect", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create defect");
  await allure.severity("Normal");

  const responsePostDefect = await request.post(
    `${process.env.BASE_URL}/defect/${projectCode}`,
    {
      data: {
        title: "Test defect",
        actual_result: "Test defect",
        severity: 1,
      },
    },
  );

  expect(responsePostDefect.status()).toBe(200);
});

/**
 * @see https://developers.qase.io/reference/create-run
 */
test("Create test run", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create test run");
  await allure.severity("Normal");

  const responsePostRun = await request.post(
    `${process.env.BASE_URL}/run/${projectCode}`,
    {
      data: {
        title: "Test run",
        cases: [1],
      },
    },
  );

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
    `${process.env.BASE_URL}/configuration/${projectCode}/group`,
    {
      data: {
        title: "Test configuration group",
      },
    },
  );

  expect(responsePostConfigGroup.status()).toBe(200);

  const responsePostConfiguration = await request.post(
    `${process.env.BASE_URL}/configuration/${projectCode}`,
    {
      data: {
        title: "Test configuration",
        group_id: 1,
      },
    },
  );

  expect(responsePostConfiguration.status()).toBe(200);
});

/**
 * @see https://developers.qase.io/reference/create-environment
 */
test("Create environment", async ({ request }) => {
  await allure.epic("API");
  await allure.feature("Create environment");
  await allure.severity("Normal");

  const responsePostEnvironment = await request.post(
    `${process.env.BASE_URL}/environment/${projectCode}`,
    {
      data: {
        title: "Test environment",
        slug: "Slug 123",
      },
    },
  );
  expect(responsePostEnvironment.status()).toBe(200);
});
