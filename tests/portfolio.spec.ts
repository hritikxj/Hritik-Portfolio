import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';

async function contentVisible(page: Page) {
  await expect(page.locator('.intro-landing')).toHaveCSS('visibility', 'visible');
  await expect(page.locator('.intro-landing')).toHaveCSS('opacity', '1');
}

test('mobile never loads the video or animation chunks, including after resize', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await contentVisible(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await contentVisible(page);
  await expect(page.locator('.intro-overlay')).toBeHidden();
  expect(requests.some(url => url.includes('.mp4'))).toBe(false);
  expect(await page.locator('video').getAttribute('src')).toBeNull();
});

test('desktop intro reverses after a project return', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
  await contentVisible(page);
  await page.locator('a[href="/purr-pantry"]').click();
  await page.getByRole('link', { name: /Back to Portfolio/ }).click();
  await contentVisible(page);
  await page.waitForFunction(() => document.querySelector('.intro-shell')?.getAttribute('data-intro') === 'active' && (document.querySelector('video')?.readyState ?? 0) >= 2);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.evaluate(() => window.scrollTo(0, innerHeight));
  await page.waitForFunction(() => {
    const video = document.querySelector('video')!;
    return video.duration > 0 && Math.abs(video.currentTime - video.duration / 2) < 0.12;
  });
  await expect(page.locator('.intro-overlay')).toHaveCSS('opacity', '1');
});

test('resizing during an auto-scroll and toggling reduced motion leave readable content', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await contentVisible(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await contentVisible(page);
  await expect(page.locator('video')).not.toHaveAttribute('src');
  await page.reload();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await contentVisible(page);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await contentVisible(page);
});

for (const width of [390, 1440]) {
  test(`UI/UX category and position survive both return paths at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: 'UI/UX', exact: true }).click();
    await expect(page).toHaveURL(/category=uiux/);
    const project = page.locator('a[href="/nothing"]');
    await project.scrollIntoViewIfNeeded();
    const y = await page.evaluate(() => scrollY);
    await project.click();
    await page.getByRole('link', { name: /Back to Portfolio/ }).click();
    await expect(page.getByRole('button', { name: 'UI/UX', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(y, -1);
    await page.locator('a[href="/nothing"]').click();
    await page.waitForURL('**/nothing');
    await page.goBack();
    await expect(page.getByRole('button', { name: 'UI/UX', exact: true })).toHaveAttribute('aria-pressed', 'true');
  });
}

test('Dove dialog contains keyboard focus and restores it on Escape', async ({ page }) => {
  await page.goto('/dove');
  const opener = page.getByRole('button', { name: /Expand .* slide/ });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 6; index++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await page.getByRole('button', { name: 'Close Lightbox' }).focus();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('portfolio and work remain visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/');
  await contentVisible(page);
  await expect(page.locator('a[href="/purr-pantry"]')).toBeVisible();
  await context.close();
});

test('failed video loading automatically reveals the portfolio', async ({ page }) => {
  await page.route('**/*.mp4', route => route.abort());
  await page.goto('/');
  await contentVisible(page);
  await expect(page.locator('.intro-overlay')).toBeHidden();
});

test('denied clipboard access leaves a persistent selectable address', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new Error('Denied'); } }));
  await page.getByRole('button', { name: 'Hire Me →', exact: true }).click();
  await page.getByRole('button', { name: 'Copy email address', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Copy failed');
  await expect(page.locator('.select-text').filter({ hasText: 'hritikjasnani.design@gmail.com' })).toBeVisible();
});

for (const route of ['/', '/purr-pantry', '/dove', '/dash', '/nothing', '/social-media-creatives']) {
  for (const width of [320, 1440]) {
    test(`accessible text and no document overflow: ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.addScriptTag({ path: path.resolve('node_modules/axe-core/axe.min.js') });
      const violations = await page.evaluate(async () => {
        const axe = (window as unknown as { axe: { run: (options: unknown) => Promise<{ violations: { id: string; nodes: { html: string; failureSummary: string }[] }[] }> } }).axe;
        const results = await axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
        return results.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => ({ html: node.html, failureSummary: node.failureSummary })) }));
      });
      expect(violations).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}

test('SEO metadata, social card and 404 directives are consistent', async ({ page, request }) => {
  await page.goto('/nothing');
  await expect(page).toHaveTitle('Nothing Community Edition — UI/UX | Hritik Jasnani');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://hritikjasnani.vercel.app/nothing');
  const response = await page.goto('/missing-regression-test');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  const card = await request.get('/opengraph-image');
  expect(card.status()).toBe(200);
  expect(card.headers()['content-type']).toContain('image/png');
  // Old tabs and shared asset links continue to work after media optimization.
  expect((await request.get('/intro2-scrub.mp4')).status()).toBe(200);
  const legacyImage = await request.get('/_next/image?url=%2Fsocial%2Fapple_1.png&w=640&q=75');
  expect(legacyImage.status()).toBe(200);
});
