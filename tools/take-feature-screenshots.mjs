/**
 * Capture the 6 feature screenshots from the FEFO dev instance.
 *
 * REQUIREMENTS:
 *   - Close Chrome completely before running (Puppeteer needs exclusive profile access)
 *   - Or set FEFO_SUPABASE_SESSION env var with your session token (advanced)
 *
 * Usage:
 *   node tools/take-feature-screenshots.mjs
 *
 * Output: public/screenshots/f1-push.jpg … f6-visualization.jpg
 *
 * HOW AUTH WORKS:
 *   This script borrows your Chrome profile (which has a live Supabase session
 *   for dev.fefo.pages.dev). Chrome MUST be closed so Puppeteer can get exclusive
 *   access to the profile directory.
 */

import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import os from "os";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "public", "screenshots");
mkdirSync(OUT, { recursive: true });

const BASE = "https://dev.fefo.pages.dev";
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

const CHROME_USER_DATA = join(
  os.homedir(),
  "AppData", "Local", "Google", "Chrome", "User Data"
);

const CHROME_EXE = join(
  os.homedir(),
  "AppData", "Local", "Google", "Chrome", "Application", "chrome.exe"
);

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Screens to capture — url, scroll offset, and crop coordinates (CSS px at 390w viewport)
const SHOTS = [
  {
    file: "f1-push.jpg",
    url: `${BASE}/manager/schedule`,
    scrollY: 0,
    cropTop: 55,
    cropBottom: 435,
    desc: "Push notification schedule settings",
  },
  {
    file: "f2-today.jpg",
    url: `${BASE}/today`,
    scrollY: 0,
    cropTop: 0,
    cropBottom: 640,
    desc: "Today screen with prioritized batch sections",
  },
  {
    file: "f3-writeoff.jpg",
    url: `${BASE}/today`,
    scrollY: 530,
    cropTop: 0,
    cropBottom: 410,
    desc: "Overdue item write-off card (Шу, 3шт, pre-filled)",
  },
  {
    file: "f4-new-batch.jpg",
    url: `${BASE}/today`,
    scrollY: 0,
    cropTop: 140,
    cropBottom: 440,
    desc: "New batch confirmation card (Круасан, Підтвердити)",
  },
  {
    file: "f5-analytics.jpg",
    url: `${BASE}/manager/analytics`,
    scrollY: 0,
    cropTop: 55,
    cropBottom: 780,
    desc: "Analytics: 8 write-offs, reason breakdown, top products",
  },
  {
    file: "f6-visualization.jpg",
    url: `${BASE}/sort`,
    scrollY: 1020,
    cropTop: 0,
    cropBottom: 570,
    desc: "Stock visualization: orange + brown fill squares",
  },
];

async function checkAuth(page) {
  await page.goto(`${BASE}/today`, { waitUntil: "networkidle2", timeout: 30000 });
  await delay(2000);

  // Check for authenticated elements — "Сьогодні" heading only appears when logged in
  const title = await page.title();
  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 200));
  const isAuth = bodyText.includes("Сьогодні") || bodyText.includes("Today") || bodyText.includes("Нові");
  console.log(`  Page title: "${title}"`);
  console.log(`  Body preview: "${bodyText.slice(0, 80).replace(/\n/g, " ")}"`);
  return isAuth;
}

async function run() {
  if (!existsSync(CHROME_EXE)) {
    console.error(`Chrome not found at ${CHROME_EXE}`);
    console.error("Install Chrome or update CHROME_EXE path in this script.");
    process.exit(1);
  }

  if (!existsSync(CHROME_USER_DATA)) {
    console.error(`Chrome profile not found at ${CHROME_USER_DATA}`);
    process.exit(1);
  }

  console.log("Launching Chrome with your profile…");
  console.log("(If this fails, make sure Chrome is fully closed first)\n");

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: CHROME_EXE,
      userDataDir: CHROME_USER_DATA,
      args: [
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
        "--profile-directory=Default",
        "--window-size=450,900",
      ],
      defaultViewport: null,
    });
  } catch (err) {
    console.error("Failed to launch Chrome:", err.message);
    console.error("\nThis usually means Chrome is still running.");
    console.error("Close Chrome completely (check the system tray too) and try again.");
    process.exit(1);
  }

  const pages = await browser.pages();
  const page = pages[0] ?? await browser.newPage();
  await page.setViewport(VIEWPORT);

  console.log("Checking authentication…");
  const authed = await checkAuth(page);

  if (!authed) {
    console.error("\nNot authenticated. The Chrome profile doesn't have an active session for dev.fefo.pages.dev.");
    console.error("Open Chrome normally, log in to dev.fefo.pages.dev, then close Chrome and try again.");
    await browser.close();
    process.exit(1);
  }

  console.log("✓ Authenticated\n");

  let todayLoaded = false;

  for (const shot of SHOTS) {
    process.stdout.write(`  → ${shot.file}  (${shot.desc})\n`);

    const isToday = shot.url.includes("/today");

    if (isToday && todayLoaded) {
      await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
      await delay(500);
    } else {
      await page.goto(shot.url, { waitUntil: "networkidle2", timeout: 30000 });
      await delay(2500);
      if (isToday) todayLoaded = true;

      if (shot.scrollY) {
        await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
        await delay(500);
      }
    }

    const vp = page.viewport() ?? VIEWPORT;
    const clip = {
      x: 0,
      y: shot.cropTop,
      width: vp.width,
      height: shot.cropBottom - shot.cropTop,
    };

    const buf = await page.screenshot({ type: "jpeg", quality: 88, clip });
    const outPath = join(OUT, shot.file);
    writeFileSync(outPath, buf);
    console.log(`     saved ${outPath} (${Math.round(buf.length / 1024)} KB)\n`);
  }

  await browser.close();
  console.log("All 6 screenshots saved to public/screenshots/");
  console.log("Run: pnpm build  — to verify the landing page renders them correctly.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
