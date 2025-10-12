import mapping from '@/lib/cloudinary-mapping.json';

function stripLeadingSlashAndExt(input: string) {
  return input.replace(/^\/+|\.[^/.]+$/g, '');
}

function normalizeKey(input: string) {
  const base = stripLeadingSlashAndExt(input)
    .replace(/[\s_]+/g, '-')
    .replace(/\./g, '-')
    .replace(/-+/g, '-')
    .trim();
  return base;
}

function toLower(s: string) {
  return s.toLowerCase();
}

function variants(key: string) {
  const v = new Set<string>();
  const k0 = stripLeadingSlashAndExt(key);
  const k1 = normalizeKey(k0);
  v.add(k0);
  v.add(k1);
  v.add(toLower(k0));
  v.add(toLower(k1));
  // handle DR- vs DR.-
  v.add(k1.replace(/^DR-/, 'DR.-'));
  v.add(k1.replace(/^Dr-/, 'Dr.-'));
  v.add(k1.replace(/^dr-/, 'dr.-'));
  v.add(toLower(k1).replace(/^dr-/, 'dr.-'));
  // also add variant removing any trailing hyphens
  v.add(k1.replace(/-+/g, '-'));
  return Array.from(v);
}

// Build a lookup index for common variants of originalPath
const index = new Map<string, any>();
for (const item of mapping as any[]) {
  const orig = String(item.originalPath || '');
  const all = variants(orig);
  for (const k of all) {
    if (!index.has(k)) index.set(k, item);
  }
}

export function getCloudinaryImage(filename: string) {
  const keys = variants(filename);
  for (const k of keys) {
    const found = index.get(k) || index.get(toLower(k));
    if (found) return found;
  }
  return undefined;
}