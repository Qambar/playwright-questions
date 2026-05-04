/**
 * Can Playwright narrate its own test runs?
 *
 * Playwright 1.59 introduced the Screencast API — a way for
 * tests to record video of themselves with real-time action
 * annotations and chapter titles overlaid on the page.
 *
 * Instead of reading logs to understand what happened,
 * the test produces a self-explanatory video walkthrough.
 *
 * Key APIs demonstrated:
 *   - page.screencast.start()    → begin recording
 *   - screencast.showActions()   → highlight clicks/fills/navigations live
 *   - screencast.showChapter()   → add titled sections to the video
 *   - screencast.showOverlay()   → custom HTML overlays
 *   - screencast.stop()          → save the .webm file
 *
 * The output video is the demo — a narrated receipt of everything
 * Playwright did, with no post-production needed.
 *
 * Use case: agentic video receipts — an AI agent completes a task
 * and ships a video proving it did the work.
 *
 * @see https://playwright.dev/docs/api/class-screencast
 * @see https://github.com/Qambar/playwright-questions/issues/5
 */

import { test, expect } from '@playwright/test';

test('Playwright narrates its own test run with Screencast API', async ({ page }) => {
  test.skip(!!process.env.CI, 'Screencast API requires headed mode');
  await page.setViewportSize({ width: 1280, height: 720 });

  // ─── Start recording ───
  await page.screencast.start({ path: 'test-results/narrated-receipt.webm' });

  // Turn on action annotations — every click, fill, and navigation
  // gets a visual highlight overlay in real time
  await page.screencast.showActions({ position: 'top-right' });

  // ─── Chapter 1: Navigate to the app ───
  await page.screencast.showChapter('Opening TodoMVC', {
    description: 'Navigate to the demo app',
    duration: 2000,
  });

  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await expect(page.locator('.header h1')).toBeVisible();

  // ─── Chapter 2: Add some TODOs ───
  await page.screencast.showChapter('Adding TODOs', {
    description: 'Type each item and press Enter',
    duration: 2000,
  });

  const todos = ['Record a screencast', 'Add chapter titles', 'Ship the receipt'];

  for (const item of todos) {
    await page.locator('.new-todo').fill(item);
    await page.locator('.new-todo').press('Enter');
    await page.waitForTimeout(500); // pacing for the video
  }

  // ─── Chapter 3: Verify the list ───
  await page.screencast.showChapter('Verifying TODOs', {
    description: 'Confirm all 3 items appear in the list',
    duration: 2000,
  });

  const todoItems = page.locator('.todo-list li');
  await expect(todoItems).toHaveCount(3);
  await expect(todoItems.nth(0)).toContainText('Record a screencast');
  await expect(todoItems.nth(1)).toContainText('Add chapter titles');
  await expect(todoItems.nth(2)).toContainText('Ship the receipt');

  // ─── Chapter 4: Complete a task ───
  await page.screencast.showChapter('Completing a task', {
    description: 'Mark the first TODO as done',
    duration: 2000,
  });

  await todoItems.nth(0).locator('.toggle').check();
  await expect(todoItems.nth(0)).toHaveClass(/completed/);

  // ─── Chapter 5: Filter to active only ───
  await page.screencast.showChapter('Filtering active TODOs', {
    description: 'Click Active filter to hide completed items',
    duration: 2000,
  });

  await page.locator('a', { hasText: 'Active' }).click();
  await expect(todoItems).toHaveCount(2);

  // ─── Done ───
  await page.screencast.showChapter('Done ✅', {
    description: 'All checks passed — video receipt complete',
    duration: 3000,
  });

  // Stop recording — saves the .webm file
  await page.screencast.stop();
});
