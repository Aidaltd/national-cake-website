import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let uploadBuffer: Buffer = buffer;
    let contentType = file.type || "image/jpeg";
    let finalExtension = "jpg";

    // Automatic optimization via Sharp for raster images
    try {
      const isSvg = file.type?.includes("svg") || file.name.toLowerCase().endsWith(".svg");
      const isGif = file.type?.includes("gif") || file.name.toLowerCase().endsWith(".gif");

      if (!isSvg && !isGif) {
        // Optimize to WebP with responsive dimensions and quality preservation
        const sharpInstance = sharp(buffer)
          .rotate() // Automatically orient based on EXIF camera orientation
          .resize({
            width: 1920,
            height: 1920,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({
            quality: 82,
            effort: 4,
          });

        uploadBuffer = await sharpInstance.toBuffer();
        contentType = "image/webp";
        finalExtension = "webp";
      }
    } catch (sharpErr) {
      console.warn("Sharp optimization fallback to raw buffer:", sharpErr);
      uploadBuffer = buffer;
    }

    // Sanitize filename and apply .webp extension
    const baseName = file.name
      .toLowerCase()
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const uniqueFileName = `${Date.now()}-${baseName}.${finalExtension}`;

    // If Supabase is configured, upload directly to Supabase Storage 'media' bucket
    if (isSupabaseConfigured()) {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase.storage
        .from("media")
        .upload(uniqueFileName, uploadBuffer, {
          contentType: contentType,
          upsert: true,
        });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      const { data: publicUrlData } = supabase.storage
        .from("media")
        .getPublicUrl(uniqueFileName);

      return NextResponse.json({
        success: true,
        url: publicUrlData.publicUrl,
        fileName: uniqueFileName,
      });
    }

    // Local fallback: save to public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, uniqueFileName), uploadBuffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueFileName}`,
      fileName: uniqueFileName,
      message: "Uploaded locally (Connect Supabase to store in cloud)",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
