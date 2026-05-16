"use client";

import Image, { ImageProps } from "next/image";
import { resolveImageUrl, CloudinaryTransformOptions } from "@/lib/cloudinary";

type OptimizedImageProps = Omit<ImageProps, "src"> & {
  src: string;
  cloudinary?: CloudinaryTransformOptions;
};

/** Next/Image wrapper that resolves local paths to Cloudinary CDN URLs. */
export default function OptimizedImage({
  src,
  cloudinary,
  alt,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={resolveImageUrl(src, cloudinary)}
      alt={alt}
      {...props}
    />
  );
}
