require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit (Cloudinary free plan)

// Function to check if an image already exists on Cloudinary
async function imageExists(publicId) {
  try {
    await cloudinary.api.resource(publicId);
    return true;
  } catch (error) {
    if (error.http_code === 404) return false;
    console.error(`⚠️ Error checking ${publicId}:`, error.message);
    return false;
  }
}

// Function to upload a single image
async function uploadImage(filePath, folder = 'national-cake') {
  try {
    const fileStats = fs.statSync(filePath);
    if (fileStats.size > MAX_FILE_SIZE) {
      console.warn(`⚠️ Skipped ${path.basename(filePath)} (too large: ${Math.round(fileStats.size / 1024 / 1024)} MB)`);
      return null;
    }

    const publicId = `${folder}/${path.basename(filePath, path.extname(filePath))}`;
    const exists = await imageExists(publicId);

    if (exists) {
      console.log(`⏭️ Skipping existing image: ${publicId}`);
      return null;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: path.basename(filePath, path.extname(filePath)),
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
    });

    console.log(`✅ Uploaded: ${path.basename(filePath)} → ${result.public_id}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

// Function to get all image files from a directory
function getImageFiles(dir) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) traverse(fullPath);
      else if (stat.isFile() && imageExtensions.includes(path.extname(item).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

// Main upload function
async function uploadAllImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imageFiles = getImageFiles(publicDir);

  console.log(`\n🔍 Found ${imageFiles.length} image files to check/upload...\n`);

  const results = [];
  const batchSize = 5;

  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(uploadImage));
    results.push(...batchResults.filter(Boolean));

    if (i + batchSize < imageFiles.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n🎉 Upload complete! ${results.length} new images uploaded.`);

  if (results.length > 0) {
    const mapping = results.map((r) => ({
      originalPath: r.original_filename,
      publicId: r.public_id,
      url: r.secure_url,
      width: r.width,
      height: r.height,
      format: r.format,
    }));

    fs.writeFileSync(
      path.join(__dirname, '..', 'lib', 'cloudinary-mapping.json'),
      JSON.stringify(mapping, null, 2)
    );

    console.log('📄 Created/updated cloudinary-mapping.json with uploaded image references.');
  } else {
    console.log('ℹ️ No new images were uploaded.');
  }
}

// Run the upload
if (require.main === module) {
  uploadAllImages().catch(console.error);
}

module.exports = { uploadImage, uploadAllImages };
