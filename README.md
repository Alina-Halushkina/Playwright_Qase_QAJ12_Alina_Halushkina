Table of content:
1. Project goal
2. Tested product description
3. Testing plan
4. Local env installation


# 1. Project goal

The project is a final work of JavaScript / TypeScript QA automation course.
Includes:
1. Tests based on Playwright framework
2. Allure report
3. CI/CD:
    - Running tests based on GitHub Actions
    - Deployment test report on GitHub Pages
> [Test report](https://alina-halushkina.github.io/Playwright_Qase_QAJ12_Alina_Halushkina)

Stack:

- JavaScript / TypeScript
- Playwright
- Allure report
- GitHub Actions
- GitHub Pages

# 2. Tested product description

Qase.io is a test management tool for organization, tracking, and reporting of manual and automated software testing

# 3. Testing plan

Testing checklist:
1. Authorization
2. Sign out
3. Create new project
4. Create suite
5. Create test case
6. Create test plan
7. Create defect
8. Create test runs
9. Create configurations
10. Create environments

# 4. Local env installation

1. Install dependencies and create `.env` file and populate `.env` file

```shell
make project_install
```

2. Run tests

```shell
npx playwright test
```

Safari
```shell
npx playwright test --project=webkit
```

Chrome
```shell
npx playwright test --project=chromium
```

Firefox
```shell
npx playwright test --project=firefox
```

Smoke
```shell
npx playwright test --grep @smoke
```

Report
```shell
npx playwright show-report
```