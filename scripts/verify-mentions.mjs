import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "load" });
await page.getByText("As Seen and Mentioned On").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: "scripts/verify-mentions.png" });

const nga = await page.getByText("National Gallery of Art").isVisible();
const ngaImg = await page.locator('img[alt="National Gallery of Art"]').first();
const src = await ngaImg.getAttribute("src");
console.log(`NGA mention visible: ${nga}`);
console.log(`NGA logo src: ${src?.slice(0, 80)}...`);
await browser.close();
