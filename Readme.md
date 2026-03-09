# Playwright Questions

![Playwright](https://img.shields.io/badge/Playwright-Testing-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Examples-3178C6?logo=typescript&logoColor=white)
![Automation](https://img.shields.io/badge/Automation-Engineering%20Experiments-blue)

A curated collection of **real Playwright questions from engineers**, answered with:

• reproducible code experiments  
• short video walkthroughs  
• practical engineering insights  

Each example isolates a **specific Playwright behaviour** so engineers can understand **why something happens**, not just copy code that appears to work.

This repository aims to become a **living knowledge base for Playwright automation engineers**.

---

# How to Ask a New Question

If you have a Playwright behaviour you want investigated, submit it as a GitHub Issue.

The short video below shows the exact process.

[![How to submit a Playwright question](https://img.youtube.com/vi/MfquIS9ROy8/maxresdefault.jpg)](https://www.youtube.com/watch?v=MfquIS9ROy8)

---

# Questions Library

| # | Question | Code Example | Video |
|---|---|---|---|
| 01 | Why does `page.goto()` sometimes appear faster with the default `load`? | [`tests/01-goto-timings.spec.ts`](tests/01-goto-timings.spec.ts) | [YouTube](https://www.youtube.com/watch?v=SDHkhQm1XEA) |

More experiments will be added over time.

---

# Repository Structure

```

playwright-questions
│
├── tests
│   ├── 01-goto-timings.spec.ts
│   └── ...
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md

```

Design principles:

• every question is reproducible  
• each experiment is isolated  
• examples remain small and focused  

---

# Getting Started

Install dependencies

```

npm install

```

Install Playwright browsers

```

npm run install:browsers

```

Run the experiments

```

npm test

```

Run with Playwright UI

```

npm run test:ui

```

Open the HTML report

```

npm run report

```

---

# Who This Repository Is For

This repository is particularly useful for:

• automation engineers learning Playwright  
• SDETs debugging flaky tests  
• engineering teams modernising automation frameworks  
• technical leads defining testing standards  
• architects evaluating automation strategies  

---

# Learn Playwright Faster

If you want to go deeper into Playwright architecture, performance, and scalable automation, explore these courses.

### Advanced Playwright Techniques
Optimising test speed, stability, and cloud execution.

https://www.linkedin.com/learning/advanced-playwright-techniques-optimizing-speed-stability-and-cloud-testing/advanced-playwright-techniques

### Playwright Design Patterns
Engineering patterns for building scalable and maintainable Playwright frameworks.

https://www.linkedin.com/learning/playwright-design-patterns/welcome

### Learning Selenium
A complete course on structuring, scaling, and optimising automated tests.

https://www.linkedin.com/learning/learning-selenium-structure-scale-run-and-optimize-automated-tests/learn-selenium-for-testing

---

# Work With Uncle Aaroh

If your organisation wants help improving automation architecture, stability, or testing strategy:

Consulting / Coaching  
https://docs.google.com/forms/d/e/1FAIpQLScDw7YwgUvbFWhsRUeH5FjJ0QJJJwkKUxb29WwhMBLLV9bOfg/viewform

---

# More Content

Playwright insights, automation discussions, and training resources:

https://linktr.ee/uncleaaroh

---

# Author

Qambar Raza  
Microsoft MVP — Developer Technologies    

LinkedIn  
https://www.linkedin.com/in/qambar/