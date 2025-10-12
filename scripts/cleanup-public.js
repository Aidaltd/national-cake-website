const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const backupDir = path.join(publicDir, '_backup_migrated');
const mappingPath = path.join(projectRoot, 'lib', 'cloudinary-mapping.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function candidatesFor(originalPath) {
  // originalPath is the base name without extension in most entries
  const base = String(originalPath).replace(/^\/+|\.[^/.]+$/g, '');
  return [
    `${base}.jpg`, `${base}.jpeg`, `${base}.JPG`, `${base}.JPEG`,
  ];
}

function moveIfExists(filename) {
  const src = path.join(publicDir, filename);
  if (fs.existsSync(src)) {
    const dest = path.join(backupDir, filename);
    ensureDir(path.dirname(dest));
    fs.renameSync(src, dest);
    return true;
  }
  return false;
}

function run() {
  ensureDir(backupDir);
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  let moved = 0;
  let checked = 0;

  for (const item of mapping) {
    const orig = item.originalPath;
    const list = candidatesFor(orig);
    for (const candidate of list) {
      checked += 1;
      if (moveIfExists(candidate)) {
        moved += 1;
        break; // stop after first successful move per mapping entry
      }
    }
  }

  console.log(`Checked ${checked} candidates from ${mapping.length} mapping entries.`);
  console.log(`Moved ${moved} files into ${path.relative(projectRoot, backupDir)}.`);
  console.log('Note: Only .jpg/.jpeg were moved to avoid breaking icon/svg usage.');
}

if (require.main === module) {
  try {
    run();
  } catch (err) {
    console.error('Cleanup failed:', err);
    process.exit(1);
  }
}
