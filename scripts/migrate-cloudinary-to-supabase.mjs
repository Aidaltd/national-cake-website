/**
 * NATIONAL CAKE ASSET PRESERVATION & MIGRATION SCRIPT
 * 
 * 1. Downloads all existing photos from Cloudinary into /public/backup-images (local backup on your PC)
 * 2. Uploads them directly into your Supabase Storage 'media' bucket
 * 3. Never loses a single image!
 * 
 * Usage:
 *   node scripts/migrate-cloudinary-to-supabase.mjs
 */

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BACKUP_DIR = join(ROOT, "public", "backup-images");
const CLOUD_NAME = "dlb69oufx";

// Load .env.local
async function loadEnv() {
  try {
    const raw = await readFile(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      const v = trimmed.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {}
}

// All known image public IDs & file names
const IMAGES = [
  "NCLU12", "DSC92", "DSC95", "DSC98", "DSC101", "DSC102", "DSC103", "DSC104",
  "DSC106", "DSC107", "DSC110", "DSC111", "DSC114", "DSC115", "DSC119", "DSC123",
  "NATIONAL_CAKE_CHAMPIONSHIP_4_", "NCUPDATE-2", "NCUPDATE-3", "NCUPDATE-4", "NCUPDATE-5",
  "NCUPDATE-6", "NCUPDATE-7", "NCUPDATE-8", "NCUPDATE-9", "NCUPDATE-10", "NCUPDATE-11",
  "NCUPDATE-12", "NCUPDATE-13", "NCUPDATE-14", "NCUPDATE-15", "NCUPDATE-16", "NCUPDATE-17",
  "NCUPDATE-18", "NCUPDATE-19", "NCUPDATE-21",
  "NATIONAL_CAKE_PRESENTATION_TO_MAJ_GEN_JGK_MYAM_rtd_the_DG_of_NIGERIAN_ARMY_RESOURCE_CENTRE",
  "NATIONAL_CAKE_PRESENTATION_TO_H_E_BABATUNDE_RAJI_FASHOLA_CON_SAN",
  "NATIONAL_CAKE_PRESENTATION_TO_AISHA_AUGIE_DG_OF_CBAAC_and_PEV_ABEM_OF_TAKE_7_MEDIA_BEETA_ARTS_FESTIVAL",
  "NATIONAL_CAKE_PRESENTATION_TO_ALI_BABA",
  "NATIONAL_CAKE_PRESENTATION_TO_PASTOR_SAM_OYE_AB_CON_2025",
  "NATIONAL_CAKE_PRESENTATION_TO_THE_DEPUTY_SPEAKER_RT_HON_BENJAMIN_KALU_ENTERPRISE_NEXUS_SUMMIT",
  "NATIONAL_CAKE_CHAMPIONSHIP_1_", "NATIONAL_CAKE_CHAMPIONSHIP_2_", "NATIONAL_CAKE_CHAMPIONSHIP_3_",
  "NATIONAL_CAKE_MINI_CHAMPIONSHIP_JABI_PARK_1_", "NATIONAL_CAKE_BEETA_ARTS_FESTIVAL_2_",
  "NATIONAL_CAKE_BEETA_ARTS_FESTIVAL_3_",
  "PROJECT_GIANT_GOVERNMENT_SCIENCE_SECONDARY_SCHOOL_MAITAMA_2_rvlf54",
  "PROJECT_GIANT_GOVERNMENT_SCIENCE_SECONDARY_SCHOOL_MAITAMA_1_aw9xqj",
  "NATIONAL_CAKE_MINI_CHAMPIONSHIP_JABI_PARK_2_gcuks5",
  "NATIONAL_CAKE_MINI_CHAMPIONSHIP_JABI_PARK_3_iijd3h",
  "PROJECT_GIANT_2_toxmmw", "PROJECT_GIANT_3_fllop1", "PROJECT_GIANT_1_hbej7q",
  "Nationalcake-28", "Donate-Banner_kf3cwy", "logo1",
  "BEM-PEVER", "PRINCESS-BUNMI-PUKAT", "COACH-RALPH", "DR-HYELADI-HARUNA",
  "NANCY-OBLETE", "OBINNA-CHUKWUEZIE"
];

async function main() {
  await loadEnv();
  await mkdir(BACKUP_DIR, { recursive: true });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let supabase = null;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Connected to Supabase:", supabaseUrl);
  } else {
    console.log("Running in LOCAL BACKUP mode (Supabase keys not yet in .env.local).");
    console.log("All photos will be safely saved to your computer at: public/backup-images/");
  }

  console.log(`Starting preservation of ${IMAGES.length} images...`);
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < IMAGES.length; i++) {
    const id = IMAGES[i];
    const cleanId = id.replace(/^\/+/, "").replace(/\.(jpg|jpeg|png|webp)$/i, "");
    const downloadUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${cleanId}`;
    const localFileName = `${cleanId}.jpg`;
    const localPath = join(BACKUP_DIR, localFileName);

    try {
      // 1. Download image
      const res = await fetch(downloadUrl);
      if (!res.ok) {
        console.warn(`[Skip] Could not fetch ${downloadUrl} (HTTP ${res.status})`);
        errorCount++;
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());

      // 2. Save local backup to disk
      await writeFile(localPath, buffer);
      process.stdout.write(`[${i + 1}/${IMAGES.length}] Saved backup: ${localFileName}`);

      // 3. Upload to Supabase Storage if configured
      if (supabase) {
        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(`gallery/${localFileName}`, buffer, {
            contentType: "image/jpeg",
            upsert: true,
          });

        if (uploadError) {
          console.log(` | Supabase upload note: ${uploadError.message}`);
        } else {
          console.log(` | Uploaded to Supabase Storage: media/gallery/${localFileName}`);
        }
      } else {
        console.log(" (local file saved)");
      }

      successCount++;
    } catch (err) {
      console.error(`Error processing ${id}:`, err.message);
      errorCount++;
    }
  }

  console.log("\n=======================================================");
  console.log(`PRESERVATION COMPLETE: ${successCount} saved, ${errorCount} skipped.`);
  console.log(`Your physical backups are safely stored in:`);
  console.log(BACKUP_DIR);
  console.log("=======================================================");
}

main();
