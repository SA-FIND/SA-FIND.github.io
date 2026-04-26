# Design System: Solomon Ahedor Portfolio
**Project ID:** sa-portfolio-m3

## 1. Visual Theme & Atmosphere

The Solomon Ahedor Portfolio embodies **Material Design 3's expressive, dynamic philosophy** — a light-mode experience that feels like a Google Pixel homescreen: clean, spacious, and subtly alive. The design merges M3's tonal surface system with a **refined academic identity**, creating an interface that is simultaneously approachable and authoritative.

The overall mood is **luminous and composed**, with generous whitespace and fluid motion that gives the page a sense of effortless sophistication. Every interaction has gentle momentum — elements ease in, surfaces shift tonality, and buttons respond with soft ripple-like feedback. The atmosphere evokes the clarity of a well-organized research lab: precise, purposeful, and quietly inspiring.

**Key Characteristics:**
- M3 tonal surface system with layered elevation through color, not shadow
- Dynamic color roles (Primary, Secondary, Tertiary) creating visual hierarchy
- Fluid 300-400ms transitions on all interactive elements
- Generous 16px base grid with 8px micro-spacing
- Photography-first hero with M3 shape tokens (rounded corners)
- Clean navigation with M3 motion principles (emphasized easing)

## 2. Color Palette & Roles

### M3 Primary Tonal Group
- **Deep Indigo Primary** (#1B6B52) — Primary key color. Used for filled buttons, active navigation indicators, and primary interactive elements. A rich green-teal that conveys growth, research, and natural materials.
- **On-Primary White** (#FFFFFF) — Text and icons placed on primary-colored surfaces.
- **Primary Container** (#A4F3D6) — Tonal container for emphasis areas. Used for highlighted tags, hero accent elements, and selected states.
- **On-Primary-Container Deep** (#00210F) — Text placed on primary container surfaces.

### M3 Surface System
- **Surface Bright** (#F7FBF3) — The primary canvas. A barely-perceptible warm mint tint that feels alive compared to pure white.
- **Surface Container Lowest** (#FFFFFF) — Card backgrounds and elevated content areas.
- **Surface Container Low** (#F1F5ED) — Secondary surface for alternating sections (About, Experience).
- **Surface Container** (#EBF0E6) — Tertiary surface for skill group cards and meta items.
- **Surface Dim** (#D7DCD3) — Subtle borders and dividers.

### M3 Text & Outline
- **On-Surface** (#191D17) — Primary text color. Near-black with a warm undertone for comfortable reading.
- **On-Surface-Variant** (#414941) — Secondary text for descriptions, metadata, and supporting copy.
- **Outline** (#717971) — Borders on cards, input fields, and structural lines.
- **Outline-Variant** (#C1C9BE) — Subtle structural dividers and hairline separators.

### M3 Secondary & Tertiary
- **Secondary Container** (#D5E8CB) — Tags, badges, and supplementary containers.
- **On-Secondary-Container** (#111F0C) — Text on secondary containers.
- **Tertiary Container** (#BBE9EE) — Data/tech-related highlights and accent badges.
- **On-Tertiary-Container** (#001F23) — Text on tertiary containers.

### Functional States
- **Error** (#BA1A1A) — Form validation errors, critical alerts.
- **Success** (#1B6B52) — Mirrors primary for positive confirmation states.

## 3. Typography Rules

**Primary Font Family:** Manrope
**Character:** A modern, geometric sans-serif with gentle humanist warmth — closely aligned with Google Sans in spirit while remaining freely available.

### Hierarchy & Weights (M3 Type Scale)
- **Display Large (H1):** Semi-bold (600), -0.01em letter-spacing, clamp(3rem, 7vw, 5.5rem). Hero name only — the single most dominant element on any page.
- **Headline Large (H2):** Semi-bold (600), 0.01em letter-spacing, clamp(1.75rem, 3.5vw, 2.25rem). Section titles — establishes content zones with clarity.
- **Title Large (H3):** Medium (500), normal letter-spacing, 1.375rem. Project names, role titles — the workhorse heading level.
- **Body Large:** Regular (400), 1.7 line-height, 1rem. Descriptions and body text — optimized for comfortable reading.
- **Label Large:** Medium (500), 0.06em letter-spacing, 0.8rem, uppercase. Section labels, navigation items, meta labels — subtle authority.
- **Label Medium:** Regular (400), 0.04em letter-spacing, 0.75rem. Tags, badges, and tertiary metadata.

### M3 Motion in Typography
- All text opacity transitions use 300ms with M3 emphasized easing (cubic-bezier(0.2, 0, 0, 1))
- Color transitions on interactive text use 200ms standard easing

## 4. Component Stylings

### Buttons (M3 Filled & Outlined)
- **Shape:** M3 Full rounded (100px radius) — pill-shaped for prominent CTAs
- **Filled Button:** Deep Indigo Primary (#1B6B52) background, On-Primary White text, 0.875rem vertical / 1.75rem horizontal padding
- **Hover State:** Lighten with 8% white overlay, 250ms ease-in-out
- **Press State:** Darken with 12% black overlay, ripple effect
- **Focus State:** 3px outline ring in Primary Container (#A4F3D6) with 2px offset
- **Outlined Button:** Transparent background, Outline (#717971) border, On-Surface text. Hover fills with Surface Container Low.

### Cards & Containers (M3 Elevated Surface)
- **Shape:** M3 Medium rounded (16px/1rem radius) — friendly and modern
- **Background:** Surface Container Lowest (#FFFFFF) for content cards
- **Elevation:** No drop-shadow by default. On hover, tonal shift to Surface Container Low (#F1F5ED) + subtle translateY(-2px)
- **Border:** 1px Outline-Variant (#C1C9BE) for structural definition
- **Internal Padding:** 1.75rem (28px) creating comfortable breathing room
- **Transition:** All hover effects 300ms with M3 emphasized easing

### Navigation (M3 Top App Bar inspired)
- **Style:** Fixed horizontal bar with Surface Bright background + blur backdrop
- **Typography:** Label Large — Medium (500), uppercase, 0.06em letter-spacing
- **Default State:** On-Surface-Variant (#414941) text
- **Active/Hover:** On-Surface (#191D17) with 2px underline in Primary
- **Scroll State:** Adds Outline-Variant bottom border + increased opacity
- **Mobile:** Elegant hamburger with sliding drawer overlay

### Tags & Badges (M3 Assist Chip inspired)
- **Shape:** M3 Small rounded (8px radius)
- **Default:** Surface Container (#EBF0E6) background, On-Surface-Variant text, 1px Outline-Variant border
- **Primary Accent:** Primary Container (#A4F3D6) background, On-Primary-Container text
- **Tertiary Accent:** Tertiary Container (#BBE9EE) background, On-Tertiary-Container text

### Timeline (Experience)
- **Line:** 2px gradient from Primary to Outline-Variant
- **Dot:** 14px circle, Surface Bright fill, 2px Primary border. Fills with Primary on hover.
- **Motion:** Items slide in from left with 600ms staggered delay

## 5. Layout Principles

### Grid & Structure
- **Max Content Width:** 1200px centered — optimal for readability
- **Grid System:** CSS Grid with fluid gutters (24px mobile, 32px desktop)
- **Breakpoints:** Mobile <768px, Tablet 768-1024px, Desktop >1024px

### M3 Spacing Scale
- **Base Unit:** 8px micro, 16px component, 24px section inner
- **Section Padding:** 5rem (80px) vertical between major sections
- **Hero Padding:** 10rem top, 8rem bottom for dramatic impact
- **Edge Padding:** 1.5rem mobile, 3rem desktop

### M3 Motion Principles
- **Easing:** All transitions use M3 emphasized easing: cubic-bezier(0.2, 0, 0, 1)
- **Duration:** Micro-interactions 200ms, component transitions 300ms, page reveals 500-700ms
- **Scroll Reveals:** Elements fade up 24px with 0.7s duration, staggered 100ms per sibling

## 6. Design System Notes

### M3 Pixel Identity
- The color scheme draws from M3's dynamic color system, seeded with a green-teal primary that represents growth, sustainability, and materials science
- Tonal surfaces create hierarchy through color temperature shifts rather than heavy shadows
- The overall feel should be indistinguishable from a premium Google Pixel experience
- Every interactive element should feel responsive and alive with subtle motion feedback
