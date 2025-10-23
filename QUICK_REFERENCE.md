# 🚀 Cloudinary Optimization - Quick Reference

## ⚡ Quick Setup (2 lines)

```tsx
import { getBlurDataURL } from '@/lib/cloudinary-utils';
// Add props to your existing CldImage ↓
```

## 📋 Copy-Paste Props

### For Gallery Images (Thumbnails)
```tsx
quality="auto:low"
format="auto"
crop="fill"
gravity="auto"
dpr="auto"
loading="lazy"
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
placeholder="blur"
blurDataURL={getBlurDataURL(imageData.publicId)}
```

### For Hero/Banner Images
```tsx
priority
quality="auto:good"
format="auto"
crop="fill"
gravity="auto"
dpr="auto"
loading="eager"
fetchPriority="high"
sizes="100vw"
placeholder="blur"
blurDataURL={getBlurDataURL(imageData.publicId)}
```

### For Avatar/Profile Images
```tsx
quality="auto:low"
format="auto"
crop="fill"
gravity="face"
dpr="auto"
loading="lazy"
placeholder="blur"
blurDataURL={getBlurDataURL(imageData.publicId)}
```

## 🎯 When to Use Each Quality

| Quality | Use For | File Size |
|---------|---------|-----------|
| `auto:low` | Backgrounds, thumbnails, galleries | Smallest (60-80% smaller) |
| `auto:good` | Hero images, featured content | Medium (40-60% smaller) |
| `auto:best` | Product photos, professional shots | Larger (20-40% smaller) |

## 🔥 Common Sizes Strings

```tsx
// Full width
sizes="100vw"

// Half width on desktop, full on mobile
sizes="(max-width: 768px) 100vw, 50vw"

// Gallery grid (4 columns → 2 → 1)
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"

// Sidebar/Fixed width
sizes="300px"
```

## ⚡ Or Use Pre-built Components

```tsx
import { HeroImage, GalleryImage, AvatarImage } from '@/components/OptimizedCloudinaryImage';

// Just use them!
<HeroImage filename="hero" alt="Hero" width={1920} height={1080} />
<GalleryImage filename="photo" alt="Photo" width={400} height={300} />
<AvatarImage filename="avatar" alt="User" width={150} height={150} />
```

## ✅ Checklist for Each Image

- [ ] Added `quality="auto:low"` (or higher)
- [ ] Added `format="auto"`
- [ ] Added `crop="fill"` or `crop="limit"`
- [ ] Added `gravity="auto"` or `gravity="face"`
- [ ] Added `dpr="auto"`
- [ ] Added `loading="lazy"` (or `"eager"` for priority)
- [ ] Added `sizes="..."`
- [ ] Added `placeholder="blur"`
- [ ] Added `blurDataURL={getBlurDataURL(publicId)}`
- [ ] For above-fold: added `priority` and `fetchPriority="high"`

## 🐛 Troubleshooting

**Images not loading?**
- Check `next.config.ts` has `unoptimized: false`
- Verify Cloudinary hostname in `remotePatterns`

**Blur not showing?**
- Import: `import { getBlurDataURL } from '@/lib/cloudinary-utils'`
- Add both: `placeholder="blur"` AND `blurDataURL={...}`

**Images too blurry?**
- Increase quality: `auto:low` → `auto:good` → `auto:best`

**Wrong image size on mobile?**
- Fix `sizes` attribute - it tells browser which size to load

## 📊 Expected Performance

### Before
- 800KB - 2MB per image
- 10-20s page load on 3G
- Blank space during loading

### After
- 100KB - 500KB per image (60-85% smaller)
- 3-5s page load on 3G
- Instant blur placeholders

## 🎬 Test It!

1. Open DevTools → Network
2. Throttle to "Slow 3G"
3. Reload page
4. See blur placeholders instantly!
5. Watch images load progressively
6. Check file sizes (should be tiny!)

---

**Done!** 🎉 Your images now load 60-80% faster on low networks.

