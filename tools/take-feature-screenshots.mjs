/**
 * Capture the 6 feature screenshots from the FEFO dev instance.
 *
 * Prerequisites:
 *   pnpm add -D puppeteer  (or: npm i -D puppeteer)
 *
 * Usage:
 *   node tools/take-feature-screenshots.mjs
 *
 * Output: public/screenshots/f1-push.jpg … f6-visualization.jpg
 *
 * The dev instance uses an AI auth bypass — no email login needed.
 * The marketing seed must already be in place (batch data seeded via Supabase).
 */

import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "public", "screenshots");
mkdirSync(OUT, { recursive: true });

const BASE = "https://dev.fefo.pages.dev";
const MOBILE_VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

// Each entry: { file, url, scrollY, clipY, clipH }
// clipY / clipH crop the screenshot to just the interesting area (in CSS px).
const SHOTS = [
  {
    file: "f1-push.jpg",
    url: `${BASE}/manager/schedule?ai-check=1`,
    waitFor: ".page-content, h1, main",
    scrollY: 0,
    // Show heading + shift-start times + end-of-shift
    clipSelector: null,
    cropTop: 55,
    cropBottom: 420,
  },
  {
    file: "f2-today.jpg",
    url: `${BASE}/today?ai-check=1`,
    waitFor: "[data-testid='today-page'], .today-page, h1",
    scrollY: 0,
    cropTop: 0,
    cropBottom: 620,
  },
  {
    file: "f3-writeoff.jpg",
    url: `${BASE}/today?ai-check=1`,
    waitFor: "h1",
    scrollY: 600,
    cropTop: 0,
    cropBottom: 400,
  },
  {
    file: "f4-new-batch.jpg",
    url: `${BASE}/today?ai-check=1`,
    waitFor: "h1",
    scrollY: 0,
    cropTop: 130,
    cropBottom: 440,
  },
  {
    file: "f5-analytics.jpg",
    url: `${BASE}/manager/analytics?ai-check=1`,
    waitFor: "h1",
    scrollY: 0,
    cropTop: 55,
    cropBottom: 760,
  },
  {
    file: "f6-visualization.jpg",
    url: `${BASE}/sort?ai-check=1`,
    waitFor: "h1",
    scrollY: 1100,
    cropTop: 0,
    cropBottom: 570,
  },
];

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport(MOBILE_VIEWPORT);

  // Trigger AI auth bypass on first load
  console.log("  Authenticating via AI bypass…");
  await page.goto(`${BASE}/today?ai-check=1`, { waitUntil: "networkidle2", timeout: 30000 });
  await delay(2000);

  for (const shot of SHOTS) {
    console.log(`  → ${shot.file}`);

    await page.goto(shot.url, { waitUntil: "networkidle2", timeout: 30000 });
    await delay(2500);

    if (shot.scrollY) {
      await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
      await delay(500);
    }

    const vp = page.viewport();
    const clip = {
      x: 0,
      y: shot.cropTop,
      width: vp.width,
      height: shot.cropBottom - shot.cropTop,
    };

    const buf = await page.screenshot({
      type: "jpeg",
      quality: 88,
      clip,
    });

    const outPath = join(OUT, shot.file);
    writeFileSync(outPath, buf);
    console.log(`     saved ${outPath} (${Math.round(buf.length / 1024)} KB)`);
  }

  await browser.close();
  console.log("\nAll screenshots captured.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
