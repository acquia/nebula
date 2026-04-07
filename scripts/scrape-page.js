/**
 * Scrapes a webpage for AI-assisted UI component work.
 *
 * Captures responsive screenshots and HTML that can be shared with an AI agent
 * to help recreate the design as UI components.
 *
 * Usage:
 *   node scripts/scrape-page.js <url>
 *   node scripts/scrape-page.js <url> --headless
 *   node scripts/scrape-page.js <url> --no-screenshots
 *
 * Examples:
 *   node scripts/scrape-page.js https://example.com
 *   node scripts/scrape-page.js https://example.com --headless
 *   node scripts/scrape-page.js https://example.com --no-screenshots
 *
 * Output (in scraped/<timestamp>/):
 *   - screenshot-mobile.png    (375px width, unless --no-screenshots)
 *   - screenshot-tablet.png    (768px width, unless --no-screenshots)
 *   - screenshot-desktop.png   (1280px width, unless --no-screenshots)
 *   - page.html                (complete HTML)
 *   - metadata.json            (page info)
 *
 * Note: Runs in visible browser mode by default to bypass CloudFlare.
 * Use --headless flag if the site doesn't have bot protection.
 */

import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const url = args.find((arg) => !arg.startsWith('--'));
const headless = args.includes('--headless');
const noScreenshots = args.includes('--no-screenshots');

if (!url) {
  console.error(
    'Usage: node scripts/scrape-page.js <url> [--headless] [--no-screenshots]',
  );
  console.error('Example: node scripts/scrape-page.js https://example.com');
  process.exit(1);
}

// Viewport configurations
const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
];

async function scrapePage() {
  // Create output directory with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outputDir = join(projectRoot, 'scraped', timestamp);
  await mkdir(outputDir, { recursive: true });

  console.log(`\nScraping: ${url}`);
  console.log(`Output directory: scraped/${timestamp}`);
  console.log(`Mode: ${headless ? 'headless' : 'visible browser'}\n`);

  const browser = await chromium.launch({
    headless,
    // Slow down actions slightly in visible mode for stability
    slowMo: headless ? 0 : 100,
  });

  const context = await browser.newContext({
    // Use a realistic user agent
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    // Set realistic viewport
    viewport: { width: 1280, height: 900 },
  });

  const page = await context.newPage();

  try {
    // Navigate to the page
    console.log('Loading page...');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

    // Wait a bit more for any JavaScript to settle (helps with CloudFlare)
    await page.waitForTimeout(2000);

    // Check if we hit a CloudFlare challenge
    const title = await page.title();
    if (title.includes('Cloudflare') || title.includes('Attention Required')) {
      console.log('CloudFlare challenge detected. Waiting for it to pass...');
      console.log('   (If using --headless, try without it)');
      // Wait up to 30 seconds for the challenge to resolve
      await page.waitForFunction(
        () =>
          !document.title.includes('Cloudflare') &&
          !document.title.includes('Attention'),
        { timeout: 30000 },
      );
      await page.waitForTimeout(2000);
    }

    console.log('Page loaded\n');

    // Save HTML
    console.log('Saving HTML...');
    const html = await page.content();
    await writeFile(join(outputDir, 'page.html'), html);

    // Take screenshots at different viewports (unless skipped)
    if (!noScreenshots) {
      console.log('📸 Taking screenshots...');
      for (const viewport of viewports) {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        // Wait for layout to settle
        await page.waitForTimeout(500);

        const filename = `screenshot-${viewport.name}.png`;
        await page.screenshot({
          path: join(outputDir, filename),
          fullPage: true,
        });
        console.log(`   ${filename} (${viewport.width}px)`);
      }
    }

    // Save metadata
    await writeFile(
      join(outputDir, 'metadata.json'),
      JSON.stringify(
        {
          url: page.url(),
          title: await page.title(),
          scrapedAt: new Date().toISOString(),
          screenshots: !noScreenshots,
          viewports: noScreenshots
            ? undefined
            : viewports.map((v) => `${v.name}: ${v.width}x${v.height}`),
        },
        null,
        2,
      ),
    );

    console.log('\nDone. Files saved to:');
    console.log(`   scraped/${timestamp}/`);
    if (!noScreenshots) {
      console.log(`   ├── screenshot-mobile.png`);
      console.log(`   ├── screenshot-tablet.png`);
      console.log(`   ├── screenshot-desktop.png`);
    }
    console.log(`   ├── page.html`);
    console.log(`   └── metadata.json`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

scrapePage();
