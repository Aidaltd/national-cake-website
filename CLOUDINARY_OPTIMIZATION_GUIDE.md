# Cloudinary Image Optimization Guide

This project uses several strategies to optimize Cloudinary images for faster loading, especially on low network connections.

## Key Optimizations Implemented

### 1. **Automatic Format & Quality Optimization**
- **`quality="auto:low"`**: Cloudinary automatically selects the best compression level for low bandwidth
- **`format="auto"`**: Automatically serves WebP, AVIF, or JPEG based on browser support
- **Progressive JPEG**: Images load progressively from low to high quality

### 2. **Blur Placeholders (LQIP)**
- Small, blurred versions of images (20px wide) load instantly
- Provides visual feedback while the full image loads
- Reduces perceived loading time significantly

### 3. **Responsive Image Sizes**
- **`sizes`** attribute tells the browser which image size to load based on viewport
- Smaller screens get smaller images, saving bandwidth
- Examples:
  - Gallery: `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
  - Hero: `"100vw"` (full width)

### 4. **Smart Cropping & Gravity**
- **`crop="fill"`**: Fills the container while maintaining aspect ratio
- **`gravity="auto"`**: AI-powered focal point detection
- **`gravity="face"`**: Centers on faces (for avatars/portraits)

### 5. **DPR (Device Pixel Ratio) Optimization**
- **`dpr="auto"`**: Serves appropriate resolution for device (1x, 2x, 3x)
- Retina displays get higher quality without manual configuration

### 6. **Priority Loading**
- **`priority`**: Above-the-fold images load first
- **`fetchPriority="high"`**: Browser priority hint for critical images
- **`loading="lazy"`**: Below-the-fold images load only when needed

### 7. **Progressive & Lossy Loading**
- **`fl_progressive`**: JPEG images load progressively
- **`fl_lossy`**: Applies lossy compression to PNG files for smaller sizes

## File Structure

```
lib/
├── cloudinary.ts              # Core mapping function
├── cloudinary-utils.ts        # Optimization utilities (NEW)
└── cloudinary-mapping.json    # Image mapping data
```

## Usage Examples

### Basic Optimized Image

```tsx
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';

const imageData = getCloudinaryImage('my-image');

<CldImage
  src={imageData.publicId}
  alt="Description"
  width={800}
  height={600}
  quality="auto:low"
  format="auto"
  crop="fill"
  gravity="auto"
  dpr="auto"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="blur"
  blurDataURL={getBlurDataURL(imageData.publicId)}
/>
```

### Hero/Above-the-Fold Image

```tsx
<CldImage
  src={heroImage.publicId}
  alt="Hero"
  width={1920}
  height={1080}
  priority
  quality="auto:low"
  format="auto"
  crop="fill"
  gravity="auto"
  dpr="auto"
  loading="eager"
  fetchPriority="high"
  sizes="100vw"
  placeholder="blur"
  blurDataURL={getBlurDataURL(heroImage.publicId)}
/>
```

### Avatar/Profile Image

```tsx
<CldImage
  src={avatar.publicId}
  alt="User"
  width={150}
  height={150}
  quality="auto:low"
  format="auto"
  crop="fill"
  gravity="face"  // Centers on face
  dpr="auto"
  loading="lazy"
  placeholder="blur"
  blurDataURL={getBlurDataURL(avatar.publicId)}
/>
```

### Gallery Grid Image

```tsx
<CldImage
  src={image.publicId}
  alt="Gallery item"
  width={400}
  height={300}
  quality="auto:low"
  format="auto"
  crop="fill"
  gravity="auto"
  dpr="auto"
  loading="lazy"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={getBlurDataURL(image.publicId)}
/>
```

## Performance Benefits

### Before Optimization
- Large JPEG files (500KB - 2MB per image)
- No progressive loading
- Full-resolution images on all devices
- No placeholders (blank space during load)

### After Optimization
- Automatic format conversion (WebP/AVIF: 50-70% smaller)
- Progressive rendering (perceived speed ↑)
- Device-appropriate resolutions (mobile: 200KB, desktop: 500KB)
- Blur placeholders (instant visual feedback)
- **Total bandwidth savings: 60-80% on low networks**

## Quality Settings

Choose based on use case:

| Quality | Best For | File Size | Use Case |
|---------|----------|-----------|----------|
| `auto:low` | General content | Smallest | Galleries, thumbnails, backgrounds |
| `auto:good` | Important images | Medium | Hero images, featured content |
| `auto:best` | Critical quality | Largest | Product images, professional photos |
| `80-90` | Custom control | Custom | Fine-tuned optimization |

## Responsive Sizes Reference

```tsx
// Full width
sizes="100vw"

// Two columns on desktop, full on mobile
sizes="(max-width: 768px) 100vw, 50vw"

// Gallery (4 cols desktop, 2 cols tablet, 1 col mobile)
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"

// Sidebar (fixed width)
sizes="300px"
```

## Next.js Configuration

Ensure your `next.config.ts` is configured:

```typescript
images: {
  unoptimized: false,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    },
  ],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ['image/webp'],
},
```

## Utility Functions

### `buildCloudinaryUrl(publicId, options)`
Builds optimized URLs with custom transformations.

### `getBlurDataURL(publicId)`
Generates blur placeholder data URL (20px wide, heavily blurred).

### `getOptimizedCloudinaryProps(filename, options)`
Returns complete optimized props object for CldImage.

### `getResponsiveSizes(baseWidth)`
Generates responsive sizes string based on base width.

### `preloadCloudinaryImage(publicId, width, height)`
Preloads critical images for faster initial render.

## Testing Performance

### Chrome DevTools
1. Open DevTools → Network tab
2. Throttle to "Slow 3G" or "Fast 3G"
3. Reload page and observe:
   - Blur placeholders appear immediately
   - Progressive JPEG loading
   - Smaller file sizes
   - WebP/AVIF format delivery

### Lighthouse
Run Lighthouse audit to see improvements in:
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)

## Common Pitfalls

❌ **Don't**: Use `unoptimized: true` in next.config
✅ **Do**: Enable Next.js image optimization

❌ **Don't**: Set fixed quality (e.g., `quality={100}`)
✅ **Do**: Use `quality="auto:low"` or `quality="auto:good"`

❌ **Don't**: Skip the `sizes` attribute
✅ **Do**: Define responsive sizes for each image

❌ **Don't**: Use `priority` on all images
✅ **Do**: Use `priority` only for above-the-fold content

❌ **Don't**: Load full-res images for thumbnails
✅ **Do**: Specify appropriate width/height props

## Migration Checklist

When updating existing images:

- [ ] Add `import { getBlurDataURL } from '@/lib/cloudinary-utils'`
- [ ] Add `quality="auto:low"` (or `auto:good`)
- [ ] Add `format="auto"`
- [ ] Add `crop="fill"` or `crop="limit"`
- [ ] Add `gravity="auto"` or `gravity="face"`
- [ ] Add `dpr="auto"`
- [ ] Add appropriate `loading` value
- [ ] Add `sizes` attribute
- [ ] Add `placeholder="blur"`
- [ ] Add `blurDataURL={getBlurDataURL(publicId)}`
- [ ] Set priority for above-fold images

## Support

For questions or issues, refer to:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/api-reference/next/image)
- [next-cloudinary](https://next-cloudinary.spacejelly.dev/)

