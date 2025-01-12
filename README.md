Table of content:
1. Project goal
2. Tested product description
3. Testing plan
4. Local env installation


# 1. Project goal

The project is a final work of JavaScript / TypeScript QA automation course.

Technology stack used:
<table>
    <tr>
        <td>
            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="50px" height="50px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>file_type_typescript</title><path d="M23.827,8.243A4.424,4.424,0,0,1,26.05,9.524a5.853,5.853,0,0,1,.852,1.143c.011.045-1.534,1.083-2.471,1.662-.034.023-.169-.124-.322-.35a2.014,2.014,0,0,0-1.67-1c-1.077-.074-1.771.49-1.766,1.433a1.3,1.3,0,0,0,.153.666c.237.49.677.784,2.059,1.383,2.544,1.095,3.636,1.817,4.31,2.843a5.158,5.158,0,0,1,.416,4.333,4.764,4.764,0,0,1-3.932,2.815,10.9,10.9,0,0,1-2.708-.028,6.531,6.531,0,0,1-3.616-1.884,6.278,6.278,0,0,1-.926-1.371,2.655,2.655,0,0,1,.327-.208c.158-.09.756-.434,1.32-.761L19.1,19.6l.214.312a4.771,4.771,0,0,0,1.35,1.292,3.3,3.3,0,0,0,3.458-.175,1.545,1.545,0,0,0,.2-1.974c-.276-.395-.84-.727-2.443-1.422a8.8,8.8,0,0,1-3.349-2.055,4.687,4.687,0,0,1-.976-1.777,7.116,7.116,0,0,1-.062-2.268,4.332,4.332,0,0,1,3.644-3.374A9,9,0,0,1,23.827,8.243ZM15.484,9.726l.011,1.454h-4.63V24.328H7.6V11.183H2.97V9.755A13.986,13.986,0,0,1,3.01,8.289c.017-.023,2.832-.034,6.245-.028l6.211.017Z" style="fill:#007acc"/></svg>
        </td>
        <td>
            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="50px" height="50px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"><path d="M0 0h256v256H0V0z" fill="#F7DF1E"/><path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"/></svg>
        </td>
    </tr>
</table>

2. Playwright
3. Allure
4. Github Actions

# 2. Tested product description

Qase.io is a test management tool for organization, tracking, and reporting of manual and automated software testing

# 3. Testing plan

<table>
    <thead>
        <tr>
            <th>Feature</th>
            <th>Documentation</th>
            <th>Tests</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Authorization</td>
            <td>N/A</td>
            <td>
                <ul>
                    <li><a href="./tests/api.spec.ts">API test</a> </li>
                    <li><a href="./tests/createEnvironments.spec.ts">e2e test</a></li>
                </ul>
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>



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
    - [API test](./tests/api.spec.ts)
    - [e2e test](./tests/createEnvironments.spec.ts)

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