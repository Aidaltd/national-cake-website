import { getCloudinaryImage } from './cloudinary';

/**
 * Build optimized Cloudinary URL with transformations for static deployment
 * This version works purely client-side without any server dependencies
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | 'auto' | 'auto:low' | 'auto:good' | 'auto:best' | string;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'limit' | 'scale';
    gravity?: string;
    blur?: boolean;
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto:low', // auto:low for better compression on low networks
    format = 'auto',
    crop = 'limit',
    gravity = 'auto',
    blur = false,
  } = options;

  const transformations: string[] = [];

  // Quality and format optimization - critical for low networks
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  // Dimensions
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  
  // Crop mode
  transformations.push(`c_${crop}`);
  
  // Gravity for smart cropping
  if (crop === 'fill' || crop === 'fit') {
    transformations.push(`g_${gravity}`);
  }

  // Blur for placeholder (LQIP)
  if (blur) {
    transformations.push('e_blur:1000');
    transformations.push('q_auto:low');
    transformations.push('w_50');
  }

  // Enable progressive JPEG for better perceived loading
  transformations.push('fl_progressive');

  // Enable lossy compression for PNG
  transformations.push('fl_lossy');

  // Use the cloud name from environment or fallback
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlb69oufx';
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  const transformString = transformations.join(',');
  
  return `${baseUrl}/${transformString}/${publicId}`;
}

/**
 * Generate a low-quality blur placeholder for better perceived performance
 */
export function getBlurDataURL(publicId: string): string {
  return buildCloudinaryUrl(publicId, {
    width: 20,
    quality: 'auto:low',
    blur: true,
  });
}

/**
 * Get optimized Cloudinary props for CldImage component
 */
export function getOptimizedCloudinaryProps(
  filename: string,
  options: {
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number | 'auto' | 'auto:low' | 'auto:good' | 'auto:best' | string;
  } = {}
) {
  const imageData = getCloudinaryImage(filename);
  
  if (!imageData) {
    return null;
  }

  const { width = imageData.width, height = imageData.height, priority = false, quality = 'auto:low' } = options;

  return {
    src: imageData.publicId,
    width,
    height,
    alt: filename,
    priority,
    loading: priority ? 'eager' : 'lazy' as 'eager' | 'lazy',
    quality: quality,
    format: 'auto' as const,
    crop: 'limit' as const,
    gravity: 'auto' as const,
    flags: ['progressive', 'lossy'],
    // Additional optimization flags for low network
    dpr: 'auto',
    fetchFormat: 'auto',
  };
}

/**
 * Build responsive srcSet for Cloudinary images
 */
export function getResponsiveSizes(baseWidth: number): string {
  // Generate sizes for responsive images
  const breakpoints = [320, 640, 768, 1024, 1280, 1536];
  return breakpoints
    .filter(bp => bp <= baseWidth * 2) // Don't generate sizes larger than 2x the base width
    .map(bp => `${bp}px`)
    .join(', ');
}

/**
 * Preload critical images for above-the-fold content
 */
export function preloadCloudinaryImage(publicId: string, width: number, height: number) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = buildCloudinaryUrl(publicId, {
    width,
    height,
    quality: 'auto:low',
    format: 'auto',
  });
  link.imageSrcset = [640, 828, 1200].map(w => 
    `${buildCloudinaryUrl(publicId, { width: w, quality: 'auto:low' })} ${w}w`
  ).join(', ');
  
  document.head.appendChild(link);
}

