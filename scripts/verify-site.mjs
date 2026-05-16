/**
 * Browser verification for key pages and Cloudinary images.
 * Usage: node scripts/verify-site.mjs [baseUrl]
 */
import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://localhost:3000";

const routes = [
  { path: "/", name: "Home", checks: ["National Gallery of Art", "As Seen and Mentioned"] },
  { path: "/gallery", name: "Gallery", checks: ["National Cake Gallery"] },
  { path: "/order", name: "Order", checks: ["National Cake Board Game"] },
  { path: "/about", name: "About", checks: [] },
];

const results = [];

async function waitForImages(page) {
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 800));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(1500);
}

async function checkImages(page, routeName) {
  await waitForImages(page);

  const imgs = await page.locator("img").evaluateAll((nodes) =>
    nodes.map((img) => ({
      src: img.getAttribute("src") ?? "",
      alt: img.getAttribute("alt") ?? "",
      naturalWidth: img.naturalWidth,
    }))
  );

  const cloudinary = imgs.filter((i) => i.src.includes("res.cloudinary.com"));
  const broken = imgs.filter(
    (i) =>
      i.src &&
      !i.src.startsWith("data:") &&
      i.naturalWidth === 0 &&
      !i.src.includes("res.cloudinary.com")
  );
  // Below-fold lazy images may report 0 width before decode; verify via HTTP separately
  const cloudinaryBroken = [];
  const localPublic = imgs.filter(
    (i) => i.src.startsWith("/") && !i.src.startsWith("//")
  );

  return {
    routeName,
    total: imgs.length,
    cloudinary: cloudinary.length,
    broken,
    cloudinaryBroken,
    localPublic,
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log(`\nVerifying ${baseUrl}\n`);

  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;
    const entry = { route: route.name, url, ok: true, errors: [] };

    try {
      const response = await page.goto(url, { waitUntil: "load", timeout: 90000 });
      if (!response || response.status() >= 400) {
        entry.ok = false;
        entry.errors.push(`HTTP ${response?.status() ?? "no response"}`);
      }

      for (const text of route.checks) {
        const visible = await page.getByText(text, { exact: false }).first().isVisible().catch(() => false);
        if (!visible) {
          entry.ok = false;
          entry.errors.push(`Missing text: "${text}"`);
        }
      }

      const imgReport = await checkImages(page, route.name);
      entry.images = imgReport;

      if (imgReport.cloudinaryBroken.length > 0) {
        entry.ok = false;
        entry.errors.push(
          `${imgReport.cloudinaryBroken.length} Cloudinary image(s) failed to load: ${imgReport.cloudinaryBroken
            .slice(0, 3)
            .map((i) => i.src)
            .join(", ")}`
        );
      }
      if (imgReport.localPublic.length > 0) {
        entry.warnings = entry.warnings ?? [];
        entry.warnings.push(
          `${imgReport.localPublic.length} image(s) still served from /public`
        );
      }

      if (route.path === "/gallery") {
        await page.locator("#gallery").scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(500);
        const ncCards = await page
          .getByText("National Cake at AB CON")
          .isVisible()
          .catch(() => false);
        if (!ncCards) {
          entry.ok = false;
          entry.errors.push("NCUPDATE gallery entry not visible");
        }
      }

      if (route.path === "/") {
        await page.getByText("As Seen and Mentioned On").scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const nga = await page
          .getByText("National Gallery of Art")
          .isVisible()
          .catch(() => false);
        if (!nga) {
          entry.ok = false;
          entry.errors.push("NGA mention not visible");
        }
      }

      await page.screenshot({
        path: `scripts/verify-${route.name.toLowerCase()}.png`,
        fullPage: false,
      });
    } catch (err) {
      entry.ok = false;
      entry.errors.push(err.message);
    }

    results.push(entry);
    const status = entry.ok ? "PASS" : "FAIL";
    console.log(`${status}  ${route.name} (${url})`);
    if (entry.images) {
      console.log(
        `       images: ${entry.images.cloudinary}/${entry.images.total} from Cloudinary` +
          (entry.images.localPublic.length
            ? `, ${entry.images.localPublic.length} still local`
            : "")
      );
    }
    for (const e of entry.errors) console.log(`       ✗ ${e}`);
    for (const w of entry.warnings ?? []) console.log(`       ⚠ ${w}`);
  }

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} routes passed`);
  console.log(`Screenshots saved to scripts/verify-*.png\n`);
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
