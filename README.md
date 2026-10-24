# Valorant Esports Playwright POM Automation Suite

![Playwright Tests](https://github.com/Naomi-qa/valorant-esports-playwright-pom/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-1.x-orange?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

An End-to-End (E2E) test automation and visual regression framework built for the Valorant Esports portal ([https://valorantesports.com/](https://valorantesports.com/)). As someone who enjoys gaming is a fan of Riot Games' competitive ecosystem, I chose this media heavy platform to address real world automation challenges like dynamic schedules and real-time updates while showcasing modern software quality engineering practices, scalable Page Object Model test design, visual snapshot assertions, and automated CI/CD workflows.

---

## Development Journey

 **Refactoring to Page Object Model**
 
I started out writing my test logic and selectors all in one file, but I realised quickly that this would be difficult to maintain if Riot updated their UI layout. To fix this, I refactored the suite into a pages/ directory (homepage.ts, matchespage.ts). Separating locators from actual test assertions made the code much cleaner and saved me from having to update selectors in multiple places.

 **Adding Visual Regression Testing**
 
Since the Valorant Esports site is heavy on graphics and media, simple text checks weren't enough to catch visual bugs. I added Playwright’s toHaveScreenshot() to check for pixel-level layout shifts. My first run actually failed because Playwright didn't have a baseline image to compare against yet—I fixed this by running --update-snapshots to store a baseline, and adjusted maxDiffPixelRatio so live match timers wouldn't trigger false alarms.
  
 **Setting Up CI/CD with GitHub Actions**
 
I wanted to make sure these tests actually ran automatically instead of just sitting on my laptop. I set up a GitHub Actions workflow (.github/workflows/playwright.yml) to run headless tests on every push. I ran into a few Git tracking and folder structure issues early on, but once I cleaned up the repository layout, the pipeline ran smoothly and now uploads test reports automatically.
  
 **Handling Dynamic Content & Flaky Tests**
 
The site loads a lot of heavy stream assets and live data, which initially caused a few timing issues. I got rid of the fragile CSS selectors and switched to Playwright's user-facing locators like getByRole, combining them with explicit waits (networkidle, domcontentloaded) so tests wait for the content to fully load before asserting.

---

## Tech Stack

* **Test Framework:** [Playwright](https://playwright.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Design Pattern:** Page Object Model (POM)
* **CI/CD:** GitHub Actions
* **Version Control:** Git & GitHub

---

## My Project's Structure

```text
valorant-esports-playwright-pom/
├── .github/
│   └── workflows/
│       └── playwright.yml    -> CI/CD pipeline configuration
├── pages/                    -> Page Object Model classes
│   ├── HomePage.ts           -> Home page locators and actions
│   └── MatchesPage.ts        -> Matches page locators and validations
├── tests/                    -> Test specification files
│   └── riot-valorant.spec.ts -> Functional & visual test scenarios
├── playwright.config.ts      -> Playwright test runner configuration
└── package.json              -> Project dependencies and scripts
