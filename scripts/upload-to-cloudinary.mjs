/**
 * Upload all images from /public/originals to Cloudinary.
 * Usage: node scripts/upload-to-cloudinary.mjs
 * Requires CLOUDINARY_URL or CLOUDINARY_* env vars (see .env.local).
 */
import { readdir, readFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public", "originals");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

const SKIP_FILES = new Set([
  "file.svg",
  "globe.svg",
  "next.svg",
  "vercel.svg",
  "window.svg",
]);

async function loadDotEnv() {
  try {
    const envPath = join(ROOT, ".env.local");
    const raw = await readFile(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional when vars are set in the shell
  }
}

function loadEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "dlb69oufx";
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (apiKey && apiSecret) {
    return { cloudName, apiKey, apiSecret };
  }

  const url = process.env.CLOUDINARY_URL;
  if (url) {
    const match = url.match(
      /cloudinary:\/\/([^:]+):([^@]+)@([^/]+)/
    );
    if (match) {
      return {
        apiKey: match[1],
        apiSecret: match[2],
        cloudName: match[3],
      };
    }
  }

  throw new Error(
    "Set CLOUDINARY_URL or CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET"
  );
}

function signParams(params, apiSecret) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(sorted + apiSecret).digest("hex");
}

async function uploadFile(filePath, publicId, { cloudName, apiKey, apiSecret }) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    overwrite: "true",
    public_id: publicId,
    timestamp: String(timestamp),
  };
  const signature = signParams(params, apiSecret);

  const buffer = await readFile(filePath);
  const blob = new Blob([buffer]);
  const form = new FormData();
  form.append("file", blob, basename(filePath));
  form.append("api_key", apiKey);
  form.append("timestamp", params.timestamp);
  form.append("signature", signature);
  form.append("public_id", publicId);
  form.append("overwrite", "true");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed for ${publicId}: ${err}`);
  }

  return res.json();
}

async function main() {
  await loadDotEnv();
  const creds = loadEnv();
  const entries = await readdir(PUBLIC_DIR, { withFileTypes: true });
  const files = entries
    .filter(
      (e) =>
        e.isFile() &&
        IMAGE_EXT.has(extname(e.name).toLowerCase()) &&
        !SKIP_FILES.has(e.name)
    )
    .map((e) => e.name)
    .sort();

  console.log(`Uploading ${files.length} images to Cloudinary (${creds.cloudName})…`);

  let ok = 0;
  let fail = 0;

  for (const name of files) {
    const publicId = basename(name, extname(name));
    const filePath = join(PUBLIC_DIR, name);
    try {
      const result = await uploadFile(filePath, publicId, creds);
      console.log(`✓ ${publicId} → ${result.secure_url}`);
      ok++;
    } catch (err) {
      console.error(`✗ ${publicId}:`, err.message);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} uploaded, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
