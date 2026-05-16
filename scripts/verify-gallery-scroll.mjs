import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("http://localhost:3000/gallery", { waitUntil: "load" });
await page.locator("#gallery").scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2000);

const found = await page.getByText("National Cake at AB CON").isVisible();
const count = await page.locator("#gallery img").count();
await page.screenshot({ path: "scripts/verify-gallery-bottom.png", fullPage: false });

console.log(`Gallery images in grid: ${count}`);
console.log(`NCUPDATE card visible after scroll: ${found}`);
await browser.close();
