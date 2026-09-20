// Captures the README screenshots into docs/screenshots/.
//
//   1. npm i -D playwright && npx playwright install chromium   (one time)
//   2. npm start                                                (leave it running)
//   3. node scripts/screenshots.mjs                             (in a second terminal)
//
// To shoot the deployed site instead:
//   node scripts/screenshots.mjs https://davidsan13.github.io/shopping_cart/

import { mkdir } from "node:fs/promises";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright isn't installed. Run:\n  npm i -D playwright\n  npx playwright install chromium");
  process.exit(1);
}

const BASE = (process.argv[2] || "http://localhost:3000/").replace(/\/?$/, "/");
const OUT = "docs/screenshots";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

// Each shot gets a fresh browser context, so the cart always starts empty.
async function newPage(viewport, deviceScaleFactor = 1) {
  const context = await browser.newContext({ viewport, deviceScaleFactor });
  return context.newPage();
}

// Covers are lazy-loaded; force them to load and wait so no shot has blank images.
async function settle(page) {
  await page.evaluate(() =>
    document.querySelectorAll("img[loading=lazy]").forEach((img) => (img.loading = "eager"))
  );
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((done) => (img.onload = img.onerror = done))
      )
    )
  );
  await page.waitForTimeout(300);
}

async function addGames(page, titles) {
  await page.goto(`${BASE}#/products`);
  for (const title of titles) {
    await page.getByRole("button", { name: new RegExp(`add to cart ${title}`, "i") }).click();
  }
  await page.getByRole("link", { name: /^cart/i }).click();
  await page.getByRole("heading", { name: /your cart/i }).waitFor();
}

const cartGames = ["Halo Infinite", "Elden Ring", "Elden Ring", "Mario Kart 8"];

async function shoot(name, page, options = {}) {
  await settle(page);
  await page.screenshot({ path: `${OUT}/${name}.png`, ...options });
  console.log(`saved ${OUT}/${name}.png`);
  await page.context().close();
}

// Desktop
let page = await newPage({ width: 1280, height: 800 });
await page.goto(BASE);
await shoot("home-desktop", page, { fullPage: true });

page = await newPage({ width: 1280, height: 900 });
await page.goto(`${BASE}#/products`);
await shoot("products-desktop", page);

page = await newPage({ width: 1280, height: 620 });
await addGames(page, cartGames);
await shoot("cart-desktop", page);

// Mobile
page = await newPage({ width: 390, height: 844 }, 2);
await page.goto(`${BASE}#/products`);
await shoot("products-mobile", page);

page = await newPage({ width: 390, height: 844 }, 2);
await addGames(page, cartGames);
await shoot("cart-mobile", page, { fullPage: true });

await browser.close();
