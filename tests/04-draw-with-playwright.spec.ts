import { test } from '@playwright/test';

test('Draw Eid Mubarak on canvas', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 1000 });
  await page.goto('https://excalidraw.com');
  await page.waitForTimeout(1500);

  // --- TEXT FIRST (so we can resize it) ---
  await page.keyboard.press('t');
  await page.waitForTimeout(300);
  await page.mouse.click(300, 700);
  await page.waitForTimeout(300);
  await page.keyboard.type('Eid Mubarak!', { delay: 120 });
  await page.waitForTimeout(300);
  
  // Exit text editing but keep it selected
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  
  // Click the text to select it
  await page.mouse.click(300, 700);
  await page.waitForTimeout(300);
  
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // --- CRESCENT MOON ---
  await page.keyboard.press('p');
  await page.waitForTimeout(300);

  const cx = 500, cy = 400;
  const R = 220, r = 168, shift = 60;

  const crescentPoints: [number, number][] = [];
  for (let a = 1.2; a <= 2 * Math.PI - 1.2; a += 0.04) {
    crescentPoints.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]);
  }
  for (let a = 2 * Math.PI - 1.0; a >= 1.0; a -= 0.04) {
    crescentPoints.push([cx + shift + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  crescentPoints.push(crescentPoints[0]);

  await page.mouse.move(crescentPoints[0][0], crescentPoints[0][1]);
  await page.mouse.down();
  for (const [x, y] of crescentPoints) {
    await page.mouse.move(x, y);
  }
  await page.mouse.up();
  await page.waitForTimeout(300);

  // --- STAR ---
  const sx = 820, sy = 380, outer = 80, inner = 32;
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * 36 - 90) * Math.PI / 180;
    const rad = i % 2 === 0 ? outer : inner;
    pts.push([sx + Math.cos(angle) * rad, sy + Math.sin(angle) * rad]);
  }
  pts.push(pts[0]);

  await page.mouse.move(pts[0][0], pts[0][1]);
  await page.mouse.down();
  for (const [x, y] of pts) {
    await page.mouse.move(x, y);
  }
  await page.mouse.up();
  await page.waitForTimeout(300);

  // Deselect everything
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'eid-mubarak.png', fullPage: true });
});
