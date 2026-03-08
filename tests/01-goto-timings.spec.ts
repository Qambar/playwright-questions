/**
 * A tester observed that the default page.goto() (`load`)
 * sometimes appears faster than other waitUntil options.
 * Why does this happen?
 *
 * This example demonstrates how running multiple navigations
 * in the same browser session can affect timings due to
 * cached resources and already-established connections.
 */

import { test, expect } from '@playwright/test';

test.describe("benchmark goto timings", () => {

  // Test 1: Multiple navigations in the same page session
  // The first navigation loads resources from the network.
  // Subsequent navigations may reuse cached resources,
  // making later navigations appear faster.
  test('has title with cached resources for goto()', async ({ page }) => {

    // Resolves as soon as the navigation is committed
    // (response headers received, document starts loading)
    await page.goto('https://playwright.dev/', { waitUntil: 'commit' });

    // Waits until there are no ongoing network requests
    // for a short period of time
    await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

    // Waits until the initial HTML document is parsed
    await page.goto('https://playwright.dev/', { waitUntil: 'domcontentloaded' });

    // Default behaviour: waitUntil = 'load'
    // Waits until the load event fires (all resources loaded)
    await page.goto('https://playwright.dev/');

    // Verify navigation succeeded
    await expect(page).toHaveTitle(/Playwright/);
  });


  // Test 2: Single navigation in a fresh page
  // This removes the influence of cached resources
  // within the same session and better reflects
  // the cost of a real navigation.
  test('has title without cached resources for goto()', async ({ page }) => {

    // Only one navigation happens here
    await page.goto('https://playwright.dev/');

    // Verify the page loaded correctly
    await expect(page).toHaveTitle(/Playwright/);
  });

});