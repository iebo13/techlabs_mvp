# Asset Organization Strategy

## Directory Structure Rules

### `public/` - Static Assets (Served Directly)

**Use for:** Assets referenced by URL in JSON, HTML, or CSS **Examples:**

- Partner logos: `/img/partners/*.svg`
- Story images: `/img/stories/*.png`
- Background images: `/img/background.png`
- Videos: `/video/intro.mp4`
- Main logo: `/Logo.svg`

**Characteristics:**

- ✅ Accessed via public URLs (`/img/...`)
- ✅ Referenced in JSON mock data
- ✅ Served directly by Vite/server
- ✅ Cached separately by browser
- ✅ Can be referenced in HTML/CSS

### `src/assets/` - Imported Assets (Bundled)

**Use for:** Assets imported directly into components **Examples:**

- Component-specific icons: `src/assets/icons/*.svg`
- Imported images: `src/assets/img/*.png`
- TypeScript/module imports

**Characteristics:**

- ✅ Imported via `import` statements
- ✅ Processed by Vite build system
- ✅ Hash-based filenames in production
- ✅ Tree-shaking eligible
- ✅ TypeScript support

## Current State Analysis

### ✅ Correctly Organized

- `public/img/partners/` - Used in JSON as public URLs
- `public/img/stories/` - Used in JSON as public URLs
- `public/video/` - Used in JSON as public URLs
- `public/Logo.svg` - Used as public URL in components

### 🔄 Duplicated (Need Cleanup)

- `src/assets/partners/` - Only google.svg used (import)
- `src/assets/img/` - Unused duplicates
- `src/assets/videos/` - Unused duplicates

### ❓ Special Cases

- Google logo: Currently imported in AwardLine.tsx
- Should be moved to public/ for consistency with other partners

## Cleanup Actions

1. **Remove unused duplicates** from `src/assets/`
2. **Move Google logo** to public/ pattern for consistency
3. **Update import** in AwardLine.tsx to use public URL
4. **Verify no broken references**

## Future Guidelines

### When to use `public/`:

- Partner logos (JSON references)
- Story/event images (JSON references)
- Background images (CSS/style references)
- Videos and media files
- Favicon and meta images

### When to use `src/assets/`:

- Component-specific icons (imported)
- Assets that need processing/optimization
- Assets referenced only in TypeScript/components
- Development/build-time assets
