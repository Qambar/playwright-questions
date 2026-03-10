# Playwright Questions

![Playwright](https://img.shields.io/badge/Playwright-Testing-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Examples-3178C6?logo=typescript&logoColor=white)
![Automation](https://img.shields.io/badge/Automation-Engineering%20Experiments-blue)

A curated collection of **real Playwright questions from engineers**, answered through:

• reproducible code experiments  
• short video walkthroughs  
• practical engineering explanations  

Each example isolates a **specific Playwright behaviour** so engineers can understand **why it happens**, not just copy code that appears to work.

The goal is to build a **living knowledge base for Playwright automation engineers**.

---

# Investigation Workflow

Each entry in this repository follows the same investigation process.

1. **A real question is asked** in [GitHub Issues](https://github.com/Qambar/playwright-questions/issues)  
2. **The behaviour is reproduced** using a minimal Playwright test  
3. **An experiment is created** to isolate the behaviour  
4. **The findings are documented** with code and a short video explanation  

This approach turns individual questions into **reusable knowledge for the community**.

---

# Questions Library

| # | Behaviour | Code | Video |
|---|---|---|---|
| 01 | Why does `page.goto()` sometimes appear faster with the default `load`? ([Issue #2](https://github.com/Qambar/playwright-questions/issues/2)) | [`tests/01-goto-timings.spec.ts`](tests/01-goto-timings.spec.ts) | [Watch](https://www.youtube.com/watch?v=SDHkhQm1XEA) |
| 02 | Playwright browser not navigating to a URL (blocked by client detection)? ([Issue #3](https://github.com/Qambar/playwright-questions/issues/3)) | TBD | TBD |

More experiments will be added over time.

---

# Playwright Geniuses

Community members helping investigate Playwright behaviours in this repository.

| Name | Profile | Contact |
|---|---|---|
| Qambar Raza (Uncle Aaroh) | [LinkedIn](https://www.linkedin.com/in/qambar/) | [Work with Uncle Aaroh](https://docs.google.com/forms/d/e/1FAIpQLScDw7YwgUvbFWhsRUeH5FjJ0QJJJwkKUxb29WwhMBLLV9bOfg/viewform) |

---

## Apply to Become a Playwright Genius

If you enjoy investigating Playwright behaviour and helping engineers understand how automation works, you are welcome to apply.

Playwright Geniuses help by:

• reviewing new issues submitted by testers and engineers  
• suggesting or running experiments to reproduce behaviours  
• contributing pull requests with minimal reproducible examples  
• explaining findings so the community can learn from them  

### Benefits

Becoming a Playwright Genius can help you:

• build a visible **open-source contribution record**  
• strengthen your **automation engineering reputation**  
• connect with other Playwright practitioners  
• gain recognition for technical investigations  
• increase professional visibility that may lead to **career opportunities**

Apply here:

https://forms.gle/yJMHzxjjdqpfrJ5H6

---

# Ask a Question

Have a Playwright behaviour you want investigated?

Open a GitHub Issue and describe what you observed.

A short walkthrough of the process:

https://github.com/user-attachments/assets/67483550-8d6a-405e-aa1f-e76ea50f57b4

---

# Repository Design

This repository follows a simple principle:

**every question becomes a reproducible experiment.**

Design principles:

• experiments are minimal and focused  
• behaviour is isolated and explained  
• examples remain easy to reproduce  

Repository structure:

```text
playwright-questions
│
├── tests
│   ├── 01-goto-timings.spec.ts
│   └── ...
│
├── playwright.config.ts
├── package.json
└── README.md
````

---

# Getting Started

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npm run install:browsers
```

Run the experiments:

```bash
npm test
```

Run with Playwright UI:

```bash
npm run test:ui
```

Open the HTML report:

```bash
npm run report
```

---

# Who This Repository Is For

This repository is useful for:

• automation engineers learning Playwright
• SDETs debugging flaky tests
• engineering teams modernising automation frameworks
• technical leads defining testing standards
• architects evaluating automation strategies

---

# Learning Resources

Courses and training that explore Playwright, automation architecture, and modern testing practices.

| Resource                                                                                                                                                                       | Description                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [Advanced Playwright Techniques](https://www.linkedin.com/learning/advanced-playwright-techniques-optimizing-speed-stability-and-cloud-testing/advanced-playwright-techniques) | Optimising Playwright tests for speed, stability, and cloud execution.    |
| [Playwright Design Patterns](https://www.linkedin.com/learning/playwright-design-patterns/welcome)                                                                             | Engineering patterns for scalable and maintainable Playwright frameworks. |
| [Learning Selenium](https://www.linkedin.com/learning/learning-selenium-structure-scale-run-and-optimize-automated-tests/learn-selenium-for-testing)                           | Structuring and maintaining automated tests.                              |
