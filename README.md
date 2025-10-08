# SauceDemo Automation Framework

Senior-level E2E testing framework built with Playwright, featuring Allure reporting, Page Object Pattern, and CI/CD integration.

## 🚀 Quick Start

### 1. Installation

```bash
npm install
npx playwright install
```

### 2. Configuration

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

### 3. Running Tests

```bash
# All tests on all browsers
npm test

# With visible browser
npm run test:headed

# Specific browsers
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

## 📊 Reports

### Allure Report

```bash
npm run allure:generate    # Generate report
npm run allure:serve        # Open report
```

## 🧪 Tests

- **login.spec.js** - Authentication and logout
- **shopping.spec.js** - Shopping cart operations (add/remove items)
- **checkout.spec.js** - Complete checkout flow with generated data

## 📁 Project Structure

```
├── config.js                   # Test configuration (timeouts, workers, viewports)
├── playwright.config.js        # Playwright configuration
├── .env                        # Environment variables (BASE_URL, credentials)
├── .env.example                # Environment template
│
├── src/
│   ├── constants/              # Test constants
│   │   └── testData.constants.js  # Page titles, messages, timeouts, cart counts
│   ├── data/                   # Test data
│   │   ├── dataGenerator.js    # Faker for data generation
│   │   └── testData.js         # Static test data (users, products)
│   ├── fixtures/               # Playwright fixtures
│   │   └── baseFixtures.js     # Page Object fixtures
│   ├── helpers/                # Utilities
│   │   └── logger.js           # Logging with steps
│   └── pages/                  # Page Objects
│       ├── BasePage.js         # Base class with common methods
│       ├── LoginPage.js
│       ├── ProductsPage.js
│       ├── CartPage.js
│       ├── CheckoutPage.js
│       └── locators/           # Selectors separated from logic
│           ├── LoginPageLocators.js
│           ├── ProductsPageLocators.js
│           ├── CartPageLocators.js
│           └── CheckoutPageLocators.js
│
├── tests/
│   └── e2e/                    # E2E tests
│       ├── login.spec.js
│       ├── shopping.spec.js
│       └── checkout.spec.js
│
└── .github/
    └── workflows/              # CI/CD
        └── playwright.yml
```

## 🏗️ Architecture

### Page Object Pattern

- Each page is a separate class with encapsulated methods
- Base class `BasePage` contains common methods (click, fill, assertions)
- Page Objects contain only business logic methods (>1 actions)
- Simple actions (single click/assertion) are called directly through BasePage

### Separation of Concerns

- **Locators** are extracted to separate files (locators/)
- **Constants** (texts, timeouts) in testData.constants.js
- **Config** (static settings) in config.js
- **Environment variables** (sensitive data) in .env

### Data Generation

- **Faker.js** for automatic test data generation
- **testData.js** for static data (users, products)

### Logging

- Automatic logging of every Page Object method via Proxy
- Improved report readability

## 🔧 Code Quality

```bash
npm run lint           # Check code
npm run lint:fix       # Auto-fix issues
npm run format         # Format with prettier
```

## ⚙️ Configuration

### config.js - Static Settings

```javascript
{
  timeout: 60000,              // Test timeout
  retryCount: 0,               // Retry count on failure (local)
  workers: 4,                  // Parallel workers (local)

  // CI-specific settings
  ci: {
    retries: 3,                // 3 retries in CI
    workers: 3,                // 3 workers per browser in CI
  },

  navigationTimeout: 30000,    // Navigation timeout
  actionTimeout: 15000,        // Action timeout
  headless: true,              // Headless mode
  viewport: { width: 1920, height: 1080 }
}
```

### .env - Sensitive Data

```env
BASE_URL=https://www.saucedemo.com  # Application URL
STANDARD_USER=standard_user          # Test user
STANDARD_PASSWORD=secret_sauce       # Password
```

**Benefits of separation:**

- Config can be changed without access to credentials
- .env contains minimal sensitive information
- .env.example helps to quickly set up the project

## 📈 CI/CD

### Setup GitHub Secrets

Before running tests in CI/CD, configure the following secrets in repository settings:

```
Settings → Secrets and variables → Actions → New repository secret
```

Required secrets:

- `BASE_URL` - Application URL (e.g., https://www.saucedemo.com)
- `STANDARD_USER` - Test username
- `STANDARD_PASSWORD` - Test password

### Automatic Triggers

GitHub Actions automatically runs tests on:

- Push to `main`, `master`, or `develop` branches
- Pull requests to these branches

### Manual Trigger

You can manually trigger tests from GitHub Actions tab:

- **All browsers** - runs tests on Chromium, Firefox, and WebKit
- **Specific browser** - choose one browser to test

### Features

- ✅ Parallel execution on 3 browsers (matrix strategy)
- ✅ 3 workers per browser for faster execution
- ✅ 3 retries on test failure in CI
- ✅ Automatic Allure report generation
- ✅ Report publishing to GitHub Pages with history (20 reports)
- ✅ Test artifacts retention (30 days)
- ✅ Environment variables from GitHub Secrets

## 🛠️ Technologies

- **Playwright** - E2E testing framework
- **Allure** - Advanced test reporting
- **Faker.js** - Test data generation
- **ESLint + Prettier** - Code quality
- **dotenv** - Environment variables management
- **GitHub Actions** - CI/CD pipeline

## 📋 Best Practices

- ✅ Page Object Pattern with separated locators
- ✅ Base class for shared logic
- ✅ Constants for all magic values
- ✅ Automatic test data generation
- ✅ Logging of all steps
- ✅ Separation of config and sensitive data
- ✅ Parallel test execution
- ✅ Detailed reports with screenshots and videos
