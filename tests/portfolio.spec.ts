import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';

async function contentVisible(page: Page) {
  await expect(page.locator('#main-content')).toBeVisible();
  await expect(page.locator('#work')).toBeVisible();
}

test('portfolio images use responsive, cacheable files and decode after scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/social-media-creatives');
  const poster = page.getByRole('img', { name: 'Vivora Event Poster 1', exact: true });
  await expect(poster).toHaveAttribute('loading', 'lazy');
  await poster.scrollIntoViewIfNeeded();
  const source = await poster.evaluate(async (image: HTMLImageElement) => {
    await image.decode();
    return new URL(image.currentSrc).pathname;
  });
  expect(source).toMatch(/^\/portfolio-images\/[a-f0-9]+\/\d+\.webp$/);
  const response = await page.request.head(source);
  expect(response.ok()).toBe(true);
  expect(response.headers()['cache-control']).toContain('immutable');
});

for (const width of [390, 1440]) {
  test(`UI/UX category and position survive both return paths at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: 'UI/UX', exact: true }).click();
    await expect(page).toHaveURL(/category=uiux/);
    const project = page.locator('#work a[href="/nothing"]');
    await project.scrollIntoViewIfNeeded();
    const y = await page.evaluate(() => scrollY);
    await project.click();
    await page.getByRole('link', { name: /Back to portfolio/ }).click();
    await expect(page.getByRole('button', { name: 'UI/UX', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(y, -1);
    await page.locator('#work a[href="/nothing"]').click();
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

test('mobile menu reaches every section and closes after use', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#mobile-menu').getByRole('link', { name: /About/ }).click();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#about')).toBeInViewport();
});

test('every case study ends with a next project and a contact path', async ({ page }) => {
  for (const route of ['/purr-pantry', '/work/fino', '/work/farebird', '/nothing']) {
    await page.goto(route);
    const footer = page.locator('footer').last();
    await expect(footer.getByText('Next project')).toBeVisible();
    await expect(footer.getByRole('button', { name: /Start a project/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to portfolio/ })).toBeVisible();
  }
});

for (const width of [390, 1440]) {
  test(`returning from an Experience project link restores the exact position at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await contentVisible(page);
    const link = page.locator('#about a[href="/nothing"]');
    await link.evaluate(element => element.scrollIntoView({ block: 'center' }));
    const y = await page.evaluate(() => Math.round(scrollY));
    await link.evaluate(element => (element as HTMLElement).click());
    await page.waitForURL('**/nothing');
    await page.getByRole('link', { name: /Back to portfolio/ }).click();
    await expect.poll(() => page.evaluate(() => Math.round(scrollY))).toBe(y);
    await link.evaluate(element => (element as HTMLElement).click());
    await page.waitForURL('**/nothing');
    await page.goBack();
    await expect.poll(() => page.evaluate(() => Math.round(scrollY))).toBe(y);
  });
}

test('theme switch toggles dark mode, remembers it and stays accessible', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  const toggle = page.locator('nav[aria-label="Main"] ul').getByRole('button', { name: 'Switch to dark mode' });
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(19, 20, 19)');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/work/typehaus');
  await expect(page.locator('main')).toHaveCSS('background-color', 'rgb(19, 20, 19)');
  await page.goto('/');
  await page.addScriptTag({ path: path.resolve('node_modules/axe-core/axe.min.js') });
  const violations = await page.evaluate(async () => {
    const axe = (window as unknown as { axe: { run: (options: unknown) => Promise<{ violations: { id: string }[] }> } }).axe;
    return (await axe.run({ runOnly: { type: 'tag', values: ['wcag2aa'] } })).violations.map(v => v.id);
  });
  expect(violations).toEqual([]);
  await page.locator('nav[aria-label="Main"] ul').getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('the homepage opens straight onto the work, with no intro or video', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
  await expect(page.locator('video')).toHaveCount(0);
  expect(requests.some(url => url.includes('.mp4') || url.toLowerCase().includes('gsap'))).toBe(false);
});

for (const width of [390, 1440]) {
  test(`hero work ribbon drifts, pauses and links to projects at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const ribbon = page.getByRole('region', { name: 'A glimpse of selected work' });
    await expect(ribbon).toBeInViewport();
    // One focusable link per piece; the looping copy stays out of the tab order.
    await expect(ribbon.locator('a:not([tabindex="-1"])')).toHaveCount(16);
    await expect(ribbon.getByRole('link', { name: 'Fino, macOS app' })).toHaveAttribute('href', '/work/fino');

    const track = ribbon.locator('ul').first();
    const offset = () => track.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m41);
    const start = await offset();
    await expect.poll(offset).not.toBe(start);

    await page.getByRole('button', { name: 'Pause' }).click();
    await expect(page.getByRole('button', { name: 'Play' })).toHaveAttribute('aria-pressed', 'true');
    // The ribbon eases to a stop rather than halting mid-frame.
    await page.waitForTimeout(1600);
    const held = await offset();
    await page.waitForTimeout(400);
    expect(await offset()).toBe(held);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  });
}

test('hero work ribbon stays still and swipeable for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const track = page.locator('.ribbon-track').first();
  await page.waitForTimeout(600);
  expect(await track.evaluate(element => getComputedStyle(element).transform)).toBe('none');
  await expect(page.locator('.ribbon-toggle')).toBeHidden();
  expect(await page.locator('.ribbon-row').first().evaluate(row => row.scrollWidth > row.clientWidth)).toBe(true);
});

test('no two letters touch in any large heading', async ({ page }) => {
  // Switzer sets pairs like rt, ry and ty very close, so negative letter-spacing
  // makes them collide. Draw each neighbouring pair exactly as laid out and
  // require at least one clear pixel between them. (f-pairs join by design.)
  for (const route of ['/', '/work/farebird', '/purr-pantry', '/dove', '/nothing']) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const touching = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      const found: string[] = [];
      const elements = [...document.querySelectorAll<HTMLElement>('h1, h2, h3, p, span, a, dd')].filter(el =>
        parseFloat(getComputedStyle(el).fontSize) >= 34 && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent!.trim()));
      for (const el of elements) {
        const cs = getComputedStyle(el);
        const size = parseFloat(cs.fontSize);
        const spacing = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing);
        const font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
        const text = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('');
        for (const word of text.split(/\s+/)) {
          for (let i = 0; i < word.length - 1; i++) {
            const a = word[i], b = word[i + 1];
            if (a === 'f' || /\s/.test(a + b)) continue;
            ctx.font = font; (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${spacing}px`;
            const xB = ctx.measureText(a + b).width - ctx.measureText(b).width;
            const w = Math.ceil(size * 3), h = Math.ceil(size * 1.6);
            canvas.width = w; canvas.height = h;
            const ink = (ch: string, x: number) => { ctx.clearRect(0, 0, w, h); ctx.font = font; (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px'; ctx.fillText(ch, x, size * 1.2); return ctx.getImageData(0, 0, w, h).data; };
            const first = ink(a, size / 2), second = ink(b, size / 2 + xB);
            let gap = Infinity;
            for (let y = 0; y < h; y++) {
              let right = -1, left = -1;
              for (let x = w - 1; x >= 0; x--) if (first[(y * w + x) * 4 + 3] > 64) { right = x; break; }
              for (let x = 0; x < w; x++) if (second[(y * w + x) * 4 + 3] > 64) { left = x; break; }
              if (right >= 0 && left >= 0) gap = Math.min(gap, left - right - 1);
            }
            if (gap < 1) found.push(`"${a}${b}" in "${word}" (${Math.round(size)}px)`);
          }
        }
      }
      return found;
    });
    expect(touching, route).toEqual([]);
  }
});

test('portfolio and work remain visible without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await contentVisible(page);
  await expect(page.locator('#work a[href="/purr-pantry"]')).toBeVisible();
  await context.close();
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
  await expect(page).toHaveTitle('Nothing Community Edition, UI/UX | Hritik Jasnani');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://hritikjasnani.vercel.app/nothing');
  const response = await page.goto('/missing-regression-test');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  const card = await request.get('/opengraph-image');
  expect(card.status()).toBe(200);
  expect(card.headers()['content-type']).toContain('image/png');
  // Old tabs and shared asset links continue to work after media optimization.
  const legacyImage = await request.get('/_next/image?url=%2Fsocial%2Fapple_1.png&w=640&q=75');
  expect(legacyImage.status()).toBe(200);
});
