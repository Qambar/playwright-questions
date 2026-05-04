/**
 * Question: Playwright browser not navigating to specific URL
 * (blocked by client-side bot detection)
 * @see https://github.com/Qambar/playwright-questions/issues/3
 *
 * Many websites detect automation tools and block access.
 * The most common check is `navigator.webdriver`, which
 * Chromium sets to `true` when controlled via DevTools Protocol.
 *
 * This example serves a local page that mimics real-world
 * bot detection, then shows how to bypass it using
 * Playwright's built-in capabilities — no third-party
 * stealth plugins required.
 */

import { test, expect, chromium } from '@playwright/test';
import path from 'path';

const SITE = `file://${path.join(__dirname, 'fixtures', 'bot-detection-site.html')}`;

test.describe('bot detection bypass', () => {

  // ─── THE PROBLEM ────────────────────────────────────────
  // A default Playwright browser is detected as a bot.
  // navigator.webdriver === true, and the site blocks access.

  test('default Playwright browser gets blocked', async ({ page }) => {
    await page.goto(SITE);

    // The site detects automation and shows the blocked overlay
    const overlay = page.locator('#blocked-overlay');
    await expect(overlay).toHaveClass(/active/);

    // The real content is hidden
    const products = page.locator('#products');
    await expect(products).not.toBeVisible();

    // Check the detection reason includes webdriver
    const reason = page.locator('#detection-reason');
    await expect(reason).toContainText('navigator.webdriver');
  });


  // ─── THE FIX ────────────────────────────────────────────
  // Use `addInitScript` to override navigator.webdriver
  // BEFORE the page's own scripts run. This is Playwright's
  // built-in mechanism — no external plugins needed.
  //
  // addInitScript runs in the page context before any page
  // script executes, making it the cleanest way to modify
  // browser properties that detection scripts check.

  test('bypass detection with addInitScript', async ({ browser }) => {
    const context = await browser.newContext();

    // This script runs before ANY page JavaScript executes.
    // It redefines navigator.webdriver as a non-configurable
    // property set to `undefined`, which is what a real
    // browser reports.
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });
    });

    const page = await context.newPage();
    await page.goto(SITE);

    // The overlay should NOT be active — we passed detection
    const overlay = page.locator('#blocked-overlay');
    await expect(overlay).not.toHaveClass(/active/);

    // The real content is visible and interactive
    const products = page.locator('#products');
    await expect(products).toBeVisible();

    // We can interact with the page normally
    const heading = page.locator('.hero h2');
    await expect(heading).toHaveText('Welcome to SecureShop');

    const addToCart = page.locator('[data-testid="add-to-cart"]').first();
    await expect(addToCart).toBeVisible();

    await context.close();
  });


  // ─── ALTERNATIVE: Launch with custom args ───────────────
  // For more aggressive detection, you may also need to
  // modify the browser launch arguments. This test shows
  // how to combine multiple evasion techniques.

  test('bypass with launch args and init script combined', async () => {
    const browser = await chromium.launch({
      headless: !!process.env.CI,
      args: [
        // Disable the "Chrome is being controlled by automated
        // test software" infobar that some detection scripts
        // look for via window dimensions or DOM changes.
        '--disable-blink-features=AutomationControlled',
      ],
    });

    const context = await browser.newContext({
      // Set a realistic user agent — some sites check for
      // the word "Headless" in the UA string.
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',

      // Match a common screen size so viewport fingerprinting
      // doesn't flag us.
      viewport: { width: 1920, height: 1080 },

      // Set locale and timezone so navigator.languages
      // returns realistic values.
      locale: 'en-GB',
      timezoneId: 'Europe/London',
    });

    await context.addInitScript(() => {
      // Override webdriver flag
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });

      // Add a fake plugin array (real Chrome has at least
      // the PDF viewer). PluginArray is read-only in real
      // browsers, but we can override it in the page context.
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5] as unknown as PluginArray,
      });

      // Fake chrome.runtime (present in real headed Chrome)
      if (!window.chrome) {
        (window as any).chrome = {};
      }
      if (!(window as any).chrome.runtime) {
        (window as any).chrome.runtime = {};
      }
    });

    const page = await context.newPage();
    await page.goto(SITE);

    // Should pass ALL detection checks
    const overlay = page.locator('#blocked-overlay');
    await expect(overlay).not.toHaveClass(/active/);

    // Status should show human verified
    const status = page.locator('#detection-status');
    await expect(status).toContainText('Human verified');

    // Full page interaction works
    const cards = page.locator('.product-card');
    await expect(cards).toHaveCount(3);

    await browser.close();
  });
});
