import { expect, test } from '@playwright/test';

// The headless shell keeps mailto links from opening the host's email app.
test.use({ channel: 'chromium-headless-shell', reducedMotion: 'reduce' });

test('denied clipboard access leaves a persistent selectable address', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: async () => { throw new Error('Denied'); },
    });
  });
  await page.getByRole('button', { name: 'Hire Me →', exact: true }).click();
  await page.getByRole('button', { name: 'Copy email address', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Copy failed' })).toHaveCount(1);
  await expect(page.locator('p.select-text').filter({ hasText: 'hritikjasnani.design@gmail.com' })).toBeVisible();
});
