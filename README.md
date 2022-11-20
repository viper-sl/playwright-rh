# Test task playwright-rh
### Description

UI and API tests. Written with pure Playwright framework

### Requirements:

Node.js v12+

### Setup:
```
npm install
```

### How to run tests

#### Use scripts:
- ```e2e``` for run all ui tests
- ```api``` for run all API tests

#### Console run from root:
```
npm run-script e2e
```

### Reporting

Console output provides simple description of ran tests.

HTML report can be found in:
- `./api-report` for API tests
- `./e2e-report` for UI tests

To serve HTML report run `npm run-script e2e-report`

### CI/CD

CI/CD config can be found here: `.circleci/config.yml`