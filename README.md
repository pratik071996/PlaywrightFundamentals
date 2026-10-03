# Playwright Fundamentals

A hands-on learning project for end-to-end testing with [Playwright](https://playwright.dev/). It walks through the core building blocks — browser, context, page — plus test annotations, test options, locators, and parallel multi-user scenarios.

## Requirements

- Node.js 18 or newer
- npm

## Getting started

Install the project dependencies:

```bash
npm install
```

Install the Playwright browsers (required before the first test run):

```bash
npx playwright install
```

## Running tests

Run the whole test suite:

```bash
npx playwright test
```

Run one folder or one spec file:

```bash
npx playwright test tests/01_Basics
npx playwright test tests/02_TestAnnotations/223_TestAnnotations.spec.ts
npx playwright test tests/03_Locator_Commands
```

Run a single browser project:

```bash
npx playwright test --project=chromium
```

Filter tests by title:

```bash
npx playwright test -g "Login Page"
```

Useful interactive helpers:

```bash
npx playwright test --ui       # UI mode
npx playwright test --debug    # step through with Inspector
npx playwright codegen         # record a test
npx playwright show-report     # open the last HTML report
```

## Project structure

```text
.
├── playwright.config.ts              # Playwright configuration
├── tests/
│   ├── 01_Basics/
│   │   ├── 216_example.spec.ts           # Title + "Get started" link checks
│   │   ├── 217_tta-check.spec.ts         # Login form on The Testing Academy
│   │   ├── 218_multiple_context.spec.ts  # Two isolated contexts (admin vs viewer)
│   │   ├── 219_normal_Pw.spec.ts         # Raw Browser/Context/Page lifecycle
│   │   ├── 220_BCP.spec.ts               # Browser to Context to Page, step by step
│   │   ├── 221_TA.spec.ts                # Three roles in three parallel contexts
│   │   └── 222_Test_Options.spec.ts      # Context options: viewport, locale, geolocation, mobile
│   ├── 02_TestAnnotations/
│   │   ├── 223_TestAnnotations.spec.ts   # skip, only, fail, fixme, slow
│   │   └── 224_TestDescribe.spec.ts      # Grouping tests with test.describe
│   └── 03_Locator_Commands/
│       ├── 225_LC.spec.ts                # goto options: waitUntil, timeout, referer
│       ├── 226_Referer.spec.ts           # Referer header for a whole context
│       ├── 227_Fresh.spec.ts             # Default locators on the VWO login page
│       ├── 228_Project3.spec.ts          # XPath locators on the Wingify free-trial form
│       ├── 229_getByRole.spec.ts         # getByRole textboxes on the Wingify login page
│       └── 230_getByRole.spec.ts         # getByRole link click on the Katalon Cura site
├── package.json
└── README.md
```

## What each section covers

**01_Basics** — the browser/context/page hierarchy and how isolation works.

- `219_normal_Pw.spec.ts` and `220_BCP.spec.ts` use the raw `playwright` API (`chromium.launch()`) rather than the test runner, so they execute as plain Node scripts and log to the console.
- `218_multiple_context.spec.ts` shows two contexts sharing one browser — separate cookies, one process.
- `221_TA.spec.ts` does the same through the `browser` fixture inside the test runner.
- `222_Test_Options.spec.ts` demonstrates per-context options such as viewport, locale, timezone, geolocation permissions, and an emulated mobile device.

**02_TestAnnotations** — controlling which tests run and how.

| Annotation | Effect |
| --- | --- |
| `test.skip` | Test is skipped entirely |
| `test.only` | Only this test in the file runs — all others are ignored |
| `test.fail` | Test is expected to fail; passes if it does |
| `test.fixme` | Test is skipped and flagged as needing a fix |
| `test.slow()` | Triples the test timeout (30s to 90s) |

`test.fixme(condition, reason)` can also be applied conditionally, as shown for the webkit-specific case in `223_TestAnnotations.spec.ts`.

> **Note:** `223_TestAnnotations.spec.ts` contains a `test.only`, so running the full suite currently executes only that one test. The `forbidOnly` guard in the config is CI-only, so it will not stop you locally. Remove the `.only` to run everything.

**03_Locator_Commands** — navigating with options and finding elements.

- `225_LC.spec.ts` passes `waitUntil`, `timeout`, and `referer` to `page.goto` to control navigation timing and the request's referer header.
- `226_Referer.spec.ts` sets the `referer` once via `extraHTTPHeaders` on a manually created context, so it applies to every page in that context.
- `227_Fresh.spec.ts` shows the default locators on the VWO login page — `#id` for the username, password, and login button, plus an assertion on the error message. Default locators map to CSS selectors: `#id`, `.class`, `[name="value"]`, and tag name.
- `228_Project3.spec.ts` is a negative test on the Wingify free-trial form. It locates the email field with XPath (`//input[@id='free-trial-step1-email']`), clicks the two consent checkboxes by CSS id, submits with `//button[@data-qa='page-su-submit']`, and asserts the inline error text. It ends with `page.pause()`, so run it with `--debug` or remove that line for a normal run.
- `229_getByRole.spec.ts` uses role-based locators on the Wingify login page — `getByRole('textbox', { name: 'Email' })` and `{ name: 'Password' }` — to fill the credentials. It also ends with `page.pause()`.
- `230_getByRole.spec.ts` opens the Katalon Cura demo site and clicks the link found with `getByRole('link', { name: 'Make Appointment', exact: true })`. It also ends with `page.pause()`.

## Configuration

`playwright.config.ts` is the single source of truth for how tests run:

| Setting | Value |
| --- | --- |
| `testDir` | `./tests` |
| `fullyParallel` | `true` |
| `retries` | `2` on CI, `0` locally |
| `workers` | `1` on CI, auto locally |
| `reporter` | `html` |
| `trace` | `on-first-retry` |
| `use.headless` | `false` — browsers run visibly by default |

Three browser projects are enabled: **chromium**, **firefox**, and **webkit**. Mobile viewports and branded browsers (Edge, Chrome) are included as commented-out entries you can enable when needed.

The config reads `process.env.CI`, so CI-tuned settings (retries, single worker, `forbidOnly`) only apply in a CI environment.

## Reports and artifacts

Test output goes to `playwright-report/` and `test-results/`. Both, along with `node_modules/`, are ignored by git.

## Writing your first test

Create a file under `tests/`, for example `tests/01_Basics/228_login.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

See the [Playwright documentation](https://playwright.dev/docs/intro) for locators, assertions, fixtures, and network interception.
