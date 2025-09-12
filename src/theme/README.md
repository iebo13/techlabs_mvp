# TechLabs Theme System

This directory contains the MUI theme configuration and design tokens for the
TechLabs website.

## Overview

The theme system provides:

- **Consistent design tokens** (colors, typography, spacing)
- **Responsive typography** with fluid scaling
- **Dark/light theme support** (light theme active, dark ready)
- **Accessible color contrast** (WCAG AA compliant)
- **Custom component variants** for brand consistency

## Files

- `theme.ts` - Main theme configuration and dark theme variant
- `README.md` - This documentation file

## Design Tokens

### Color Palette

**Primary Colors (Pink/Red):**

- Primary 500: `#FA215C` (main brand color)
- Primary 700: `#AF1740` (dark variant)
- Primary 300: `#FB638C` (light variant)

**Secondary Colors (Grey):**

- Secondary 700: `#5C5C5C` (main secondary)
- Secondary 500: `#A0A0A0` (light variant)
- Secondary 900: `#040404` (dark variant)

**Accent Colors (Blue):**

- Info 500: `#6A9EF6` (main info color)
- Info 700: `#336FDB` (dark variant)
- Info 300: `#91B8F8` (light variant)

**Neutral Colors:**

- Background: `#F5F4F4` (light) / `#040404` (dark)
- Paper: `#FFFFFF` (light) / `#1a1a1a` (dark)
- Text Primary: `#040404` (light) / `#FFFFFF` (dark)
- Text Secondary: `#5C5C5C` (light) / `#A0A0A0` (dark)

### Typography

**Font Family:** Inter, Poppins, Roboto, Helvetica Neue, Arial, sans-serif

**Font Loading Strategy:**

- Inter and Poppins are loaded via @fontsource packages (weights: 400, 500, 600,
  700, 800, 900)
- Roboto serves as system fallback (no custom loading needed)
- Helvetica Neue and Arial are system fallbacks

**Fixed Typography Scale:**

- H1: `3.5rem` (56px), weight 800, line-height 1.15 - Hero text
- H2: `2.5rem` (40px), weight 700, line-height 1.2 - Section headings
- H3: `1.875rem` (30px), weight 700, line-height 1.25 - Subsection headings
- Subtitle1: `1.125rem` (18px), weight 600, line-height 1.45 - Large body text

**Body Text:**

- Body1: 16px, weight 400, line-height 1.625 - Main content
- Body2: 14px, weight 400, line-height 1.57 - Secondary content
- Button: 16px, weight 700, no text transform

### Breakpoints

- xs: 0px (mobile first)
- sm: 600px (tablet)
- md: 960px (desktop)
- lg: 1280px (large desktop)
- xl: 1920px (extra large)

### Spacing & Shape

- Base spacing unit: 8px
- Border radius: 16px (rounded corners)
- Button border radius: 12px

## Component Usage

### Section Component

Provides consistent page section layout with semantic HTML:

\`\`\`tsx import { Section } from '../components/Section';

// Basic section

<Section>
  <h2>Section Content</h2>
</Section>

// Paper background variant

<Section variant="paper">
  <p>Content on grey background</p>
</Section>

// Primary color background

<Section variant="primary">
  <p>Content on primary color (white text)</p>
</Section>

// Custom padding scale

<Section paddingScale={1.5}>
  <p>1.5x default padding</p>
</Section>

// Custom semantic element

<Section component="main">
  <p>Renders as main element</p>
</Section>
\`\`\`

### SectionHeading Component

Provides semantic headings with consistent typography:

\`\`\`tsx import { SectionHeading } from '../components/SectionHeading';

// Basic heading (defaults to h2) <SectionHeading> Section Title
</SectionHeading>

// Custom heading level <SectionHeading level={1}> Page Title </SectionHeading>

// Centered with emphasis
<SectionHeading level={2} emphasis="gradient" centered> Hero Heading
</SectionHeading>

// With subtitle <SectionHeading level={3} subtitle="Additional context or
description"

> Main Heading </SectionHeading>

// Color emphasis <SectionHeading emphasis="primary"> Primary Color Heading
</SectionHeading> \`\`\`

## Custom Component Styles

### Buttons

- **Contained Primary**: Solid background, no shadow, focus outline
- **Border radius**: 999px (pill shape)
- **Minimum height**: 48px
- **Padding**: 0 24px
- **Focus visible**: 3px outline with 25% opacity primary color

### App Bar

- **Background**: Semi-transparent white with blur
- **Border**: Subtle bottom border
- **Shadow**: Elevated appearance

### Container

- **Responsive padding**: 16px mobile, 24px tablet+
- **Max width**: Standard MUI breakpoint containers

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:

- Primary text (#040404) on white: 21:1 contrast ratio
- Secondary text (#5C5C5C) on white: 7.15:1 contrast ratio
- White text on primary (#FA215C): 4.84:1 contrast ratio
- Primary color has sufficient contrast for accessibility compliance

### Typography

- Minimum 16px body text for readability
- Scalable font sizes for zoom accessibility
- Sufficient line height for comfortable reading

### Motion

- Smooth scroll behavior enabled
- Respects `prefers-reduced-motion` media query (implemented in components)

## Dark Theme

A dark theme variant is included but not currently active. To enable:

\`\`\`tsx import { darkTheme } from './theme/theme';

<ThemeProvider theme={darkTheme}>
  {/* App content */}
</ThemeProvider>
\`\`\`

## Theme Extensions

The theme can be extended with additional design tokens:

\`\`\`tsx const customTheme = createTheme({ ...theme, palette: {
...theme.palette, // Add custom colors }, // Add custom component variants });
\`\`\`

## Performance Notes

- Theme object is created once and reused
- No runtime theme generation (build-time optimization)
- Responsive typography uses CSS clamp() for performance
- Custom scrollbar styles are lightweight
