import { CldImage, CldImageProps } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';

interface OptimizedCloudinaryImageProps extends Partial<CldImageProps> {
  /** Filename to lookup in cloudinary mapping */
  filename: string;
  /** Alt text for the image */
  alt: string;
  /** Width of the image */
  width?: number;
  /** Height of the image */
  height?: number;
  /** Quality preset: low (default), good, or best */
  qualityPreset?: 'low' | 'good' | 'best';
  /** Whether this is a priority image (above the fold) */
  priority?: boolean;
  /** Custom sizes attribute for responsive images */
  sizes?: string;
  /** Crop mode */
  crop?: 'fill' | 'fit' | 'limit' | 'scale';
  /** Gravity for cropping */
  gravity?: 'auto' | 'face' | 'center' | string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Optimized Cloudinary Image Component
 * 
 * Pre-configured with best practices for low network performance:
 * - Automatic format conversion (WebP/AVIF)
 * - Progressive loading
 * - Blur placeholders
 * - Responsive sizing
 * - DPR optimization
 * 
 * @example
 * ```tsx
 * <OptimizedCloudinaryImage
 *   filename="hero-image"
 *   alt="Hero"
 *   width={1920}
 *   height={1080}
 *   priority
 *   qualityPreset="good"
 * />
 * ```
 */
export default function OptimizedCloudinaryImage({
  filename,
  alt,
  width,
  height,
  qualityPreset = 'low',
  priority = false,
  sizes,
  crop = 'limit',
  gravity = 'auto',
  className = '',
  ...restProps
}: OptimizedCloudinaryImageProps) {
  const imageData = getCloudinaryImage(filename);

  if (!imageData) {
    console.warn(`Cloudinary image not found: ${filename}`);
    return null;
  }

  // Use provided dimensions or fallback to image data
  const imageWidth = width || imageData.width || 800;
  const imageHeight = height || imageData.height || 600;

  // Map quality preset to Cloudinary quality value
  const qualityMap = {
    low: 'auto:low',
    good: 'auto:good',
    best: 'auto:best',
  };
  const quality = qualityMap[qualityPreset];

  // Generate sizes attribute if not provided
  const responsiveSizes = sizes || (() => {
    if (imageWidth >= 1920) return '100vw';
    if (imageWidth >= 1200) return '(max-width: 768px) 100vw, 80vw';
    if (imageWidth >= 800) return '(max-width: 768px) 100vw, 60vw';
    if (imageWidth >= 400) return '(max-width: 768px) 100vw, 40vw';
    return '(max-width: 768px) 50vw, 25vw';
  })();

  return (
    <CldImage
      src={imageData.publicId}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      quality={quality}
      format="auto"
      crop={crop}
      gravity={gravity}
      dpr="auto"
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      fetchPriority={priority ? 'high' : undefined}
      sizes={responsiveSizes}
      placeholder="blur"
      blurDataURL={getBlurDataURL(imageData.publicId)}
      className={className}
      {...restProps}
    />
  );
}

/**
 * Preset for hero/banner images
 */
export function HeroImage(props: Omit<OptimizedCloudinaryImageProps, 'qualityPreset' | 'priority' | 'crop' | 'sizes'>) {
  return (
    <OptimizedCloudinaryImage
      {...props}
      qualityPreset="good"
      priority
      crop="fill"
      sizes="100vw"
    />
  );
}

/**
 * Preset for gallery thumbnail images
 */
export function GalleryImage(props: Omit<OptimizedCloudinaryImageProps, 'qualityPreset' | 'crop' | 'sizes'>) {
  return (
    <OptimizedCloudinaryImage
      {...props}
      qualityPreset="low"
      crop="fill"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
    />
  );
}

/**
 * Preset for avatar/profile images
 */
export function AvatarImage(props: Omit<OptimizedCloudinaryImageProps, 'qualityPreset' | 'crop' | 'gravity'>) {
  return (
    <OptimizedCloudinaryImage
      {...props}
      qualityPreset="low"
      crop="fill"
      gravity="face"
    />
  );
}

/**
 * Preset for content images in articles/posts
 */
export function ContentImage(props: Omit<OptimizedCloudinaryImageProps, 'qualityPreset' | 'sizes'>) {
  return (
    <OptimizedCloudinaryImage
      {...props}
      qualityPreset="good"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
    />
  );
}

