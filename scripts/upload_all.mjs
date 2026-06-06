import { readdir, readFile, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const GDRIVE_DIR = join(ROOT, "public", "originals", "gdrive_images");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

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
  } catch {}
}

function loadEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (apiKey && apiSecret) return { cloudName, apiKey, apiSecret };

  const url = process.env.CLOUDINARY_URL;
  if (url) {
    const match = url.match(/cloudinary:\/\/([^:]+):([^@]+)@([^/]+)/);
    if (match) {
      return { apiKey: match[1], apiSecret: match[2], cloudName: match[3] };
    }
  }
  throw new Error("Set CLOUDINARY_URL or CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET");
}

function signParams(params, apiSecret) {
  const sorted = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&");
  return createHash("sha1").update(sorted + apiSecret).digest("hex");
}

async function uploadFile(filePath, publicId, { cloudName, apiKey, apiSecret }) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { overwrite: "true", public_id: publicId, timestamp: String(timestamp) };
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

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Upload failed for ${publicId}: ${await res.text()}`);
  return res.json();
}

async function walk(dir) {
  let results = [];
  try {
    const list = await readdir(dir);
    for (let file of list) {
      file = join(dir, file);
      const statInfo = await stat(file);
      if (statInfo && statInfo.isDirectory()) {
        results = results.concat(await walk(file));
      } else {
        if (IMAGE_EXT.has(extname(file).toLowerCase())) {
          results.push(file);
        }
      }
    }
  } catch(e) {}
  return results;
}

async function main() {
  await loadDotEnv();
  const creds = loadEnv();
  const files = await walk(GDRIVE_DIR);

  console.log(`Found ${files.length} images.`);
  for (const filePath of files) {
    // To keep it simple, just use the basename without extension, but sanitize it.
    let publicId = basename(filePath, extname(filePath)).replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
    try {
      const result = await uploadFile(filePath, publicId, creds);
      console.log(`Uploaded: ${publicId} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`Failed ${publicId}:`, err.message);
    }
  }
}

main().catch(console.error);
