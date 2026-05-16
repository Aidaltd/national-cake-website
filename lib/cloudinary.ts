const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dlb69oufx";

export type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  quality?: "auto" | number;
  crop?: "fill" | "scale" | "fit" | "limit";
};

/** Build a Cloudinary delivery URL for a public_id or local path like `/DSC129.jpg`. */
export function cloudinaryUrl(
  source: string,
  options: CloudinaryTransformOptions = {}
): string {
  const publicId = toPublicId(source);
  const transforms: string[] = ["f_auto", `q_${options.quality ?? "auto"}`];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) {
    transforms.push(`h_${options.height}`);
    transforms.push(`c_${options.crop ?? "fill"}`);
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${publicId}`;
}

/** Convert `/foo.jpg`, `foo.jpg`, or `foo` to a Cloudinary public_id. */
export function toPublicId(source: string): string {
  return source
    .replace(/^\/+/, "")
    .replace(/\.(jpe?g|png|webp|gif|svg|avif)$/i, "");
}

/** True when the value is already a remote URL. */
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

/** Resolve any image source (local path or public_id) to a Cloudinary URL. */
export function resolveImageUrl(
  source: string,
  options?: CloudinaryTransformOptions
): string {
  if (isRemoteImage(source)) return source;
  return cloudinaryUrl(source, options);
}
