/**
 * Question 07 — Flaky Tests in CI.
 *
 * `waitUntil: 'commit'` resolves as soon as response headers arrive —
 * before the HTML is parsed and before any element exists in the DOM.
 * Interacting with the page immediately races the renderer, producing
 * a realistic source of flakiness rather than a contrived one.
 */

import { test, expect } from '@playwright/test';

test.describe('playwright.dev navigation', () => {

  test('homepage has expected title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('docs link is reachable right after navigation', { tags: ['quarantine'] }, async ({ page }) => {
    // Resolves the moment headers are received — DOM is not ready.
    // See tests/01-goto-timings.spec.ts:23 for the same primitive
    // used to study navigation timings.
    await page.goto('https://playwright.dev/', { waitUntil: 'commit' });

    await page.getByRole('link', { name: 'Get started' }).first().click();

    await expect(page.getByRole('heading', { name: /Installation/i }))
      .toBeVisible();
  });

});
