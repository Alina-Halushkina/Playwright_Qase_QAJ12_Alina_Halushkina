Description of product:
Qase is a test management tool for organization, tracking, and reporting of manual and automated software testing

Testing checklist:
1. Authorization
2. Sign out
3. Create new project
4. Create suit
5. Create test case
6. Create test plan
7. Create defect
8. Create test runs
9. Create configurations
10. Create environments

Stack technologies:
1. TypeScript, JavaScript
2. Playwright
3. Allure
4. Github Actions 

# Installation

1. Create environment variables

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