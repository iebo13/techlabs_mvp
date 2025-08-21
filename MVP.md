# TechLabs – Homepage Spec (MVP) · Iteration 1

**Global Design Link:** https://www.figma.com/design/Eowbxcnv6NWMjQpG83ttih/Techlabs-Website?node-id=3051-27060&t=nkaTbwjSXlLRVuqD-1

> **Scope:** Homepage only (public, frontend-only MVP). Based on the screenshots you shared. Written as a single Markdown artifact you can drop into the repo under `/docs/homepage-spec.md`.
>
> **Tech:** React 18 + TS, MUI 7, React Router, RHF + Zod (for newsletter/lead forms later), React Query (reserved for Phase 2 dynamic data). Pure functions & hooks. Dark-friendly theme.

---

## 1) Goals & Non‑Goals

**Goals**

- Communicate value quickly (hero + subhead).
- Nudge users toward **Start Learning** (primary CTA) and **Join our team** (secondary CTA).
- Showcase trust (partner logos, Google.org note), outcomes (graduates’ stories), credibility (numbers), and clarity (FAQs).
- Keep everything responsive, accessible, and easy to wire to an API later.

**Non‑Goals (MVP)**

- No real auth or backend calls (all mocked). No video hosting integration (use poster + local link placeholder). No i18n switcher logic (visual only).

---

## 2) Page Map & Route

- **Route:** `/`
- **Landmarks:** `<header>` → `<main>` → `<footer>`
- **Sections (top → bottom):**
  1. Header / Navigation bar
  2. Hero (H1 + subhead)
  3. Track Chooser + Primary CTA
  4. Trust strip: award line + partner logos
  5. Video banner (play button, duration)
  6. Why TechLabs? (3 feature cards + CTA)
  7. Our Graduates’ Stories (carousel + See all)
  8. Numbers (metrics)
  9. Support Tech Education (CTA block)
  10. FAQs (accordion) + More questions link
  11. Footer (4 columns + socials)

---

## 3) Component Inventory (MUI mapping)

- **HeaderNav.tsx** — `AppBar`, `Toolbar`, `Container`, `Button`, `Menu`, `MenuItem`, `IconButton`, `Drawer`, `List`, `ListItemButton`
  - Left: Logo → `/`
  - Center: Tracks ▾, Stories ▾, Events ▾, Be a Partner, About us
  - Right: LocaleIndicator (Düsseldorf / EN), `OutlinedButton` Join our team → `/careers`, `ContainedButton` Start Learning → `#tracks`/`/tracks`
  - Mobile: Burger → Drawer with same links; CTAs stacked
- **Hero.tsx** — `Container`, `Stack`, `Typography`
  - H1: “Learn **Tech** Skills for Free” (emphasis span)
  - Subhead: “Blended learning · Local Community · Practical Projects”
- **TrackChooser.tsx** — `Paper`, `Stack`, `FormGroup`, `FormControlLabel`, `Checkbox`, `Button`
  - Options: Web Development, Data Science, Product Design, Artificial Intelligence
  - Primary button: Start Learning (spelling fixed)
  - Small helper text: “Application closes in X weeks for next batch” (computed from config date)
- **TrustStrip.tsx** — `Stack`, `Typography`, `Box` (logo row)
  - Award line (Google.org note)
  - Partner logos (grid, lazy-loaded, with `alt`)
- **HeroVideo.tsx** — `Card`, `CardMedia` (poster), central Play `IconButton`, duration chip (00:45). MVP: click opens modal with HTML5 video.
- **WhyTechlabs.tsx** — 3 `Card`s with icon, title, copy (Totally free, Networking, Job Ready) + CTA
- **StoriesCarousel.tsx** — `Card`, `CardMedia`, `CardContent`, `Button` (See all). Accessible prev/next buttons (not just arrows).
- **NumbersBand.tsx** — `Grid` of metrics (15 Cities, +600 Graduates, 35 Mentors)
- **SupportCta.tsx** — Highlight card with image + copy + button (Support Tech Education)
- **Faqs.tsx** — `Accordion` list with Q/A; final “More questions” link
- **SiteFooter.tsx** — 4 columns of links + social icons; copyright line
- **LocaleIndicator.tsx** — Button with current city/lang (static for MVP). Tooltip “More locales coming soon”.

---

## 4) Data Contracts (TypeScript) + Mock JSON

> Store mocks in `/client/src/mocks/home.json` and type-validate with Zod. Swap to API later without changing components.

```ts
// types.ts
export type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai';

export interface HomeData {
  hero: { title: string; emphasis: string; subtitle: string };
  tracks: { id: TrackKey; label: string }[];
  applicationDeadlineISO: string; // e.g., '2025-10-01T00:00:00Z'
  partners: { name: string; logoUrl: string; href?: string }[];
  video: { posterUrl: string; srcUrl: string; duration: number /* seconds */ };
  features: { icon: string; title: string; body: string }[];
  stories: { id: string; title: string; excerpt: string; imageUrl: string; href: string }[];
  numbers: { label: string; value: string }[];
  support: { title: string; body: string; imageUrl: string; cta: { label: string; to: string } };
  faqs: { q: string; a: string }[];
}
```

```json
// home.json (mock)
{
  "hero": {
    "title": "Learn Tech Skills for Free",
    "emphasis": "Tech",
    "subtitle": "Blended learning · Local Community · Practical Projects"
  },
  "tracks": [
    { "id": "web-dev", "label": "Web Development" },
    { "id": "data-science", "label": "Data Science" },
    { "id": "product-design", "label": "Product Design" },
    { "id": "ai", "label": "Artificial Intelligence" }
  ],
  "applicationDeadlineISO": "2025-11-15T00:00:00Z",
  "partners": [
    { "name": "arc", "logoUrl": "/img/partners/arc.svg" },
    { "name": "HUAWEI", "logoUrl": "/img/partners/huawei.svg" },
    { "name": "Beiersdorf", "logoUrl": "/img/partners/beiersdorf.svg" },
    { "name": "zeb", "logoUrl": "/img/partners/zeb.svg" }
  ],
  "video": {
    "posterUrl": "/img/video-poster.jpg",
    "srcUrl": "/video/intro.mp4",
    "duration": 45
  },
  "features": [
    {
      "icon": "VolunteerActivism",
      "title": "Totally free",
      "body": "We cover tuition so you can focus on learning and outcomes."
    },
    {
      "icon": "Groups",
      "title": "Networking",
      "body": "Grow your network through mentors, peers, and partners."
    },
    {
      "icon": "WorkspacePremium",
      "title": "Job Ready",
      "body": "Build projects and a portfolio that accelerate your job search."
    }
  ],
  "stories": [
    {
      "id": "1",
      "title": "Max Startup is Rocketing",
      "excerpt": "From concept to seed funding in 6 months.",
      "imageUrl": "/img/stories/max.jpg",
      "href": "/stories/max-startup"
    },
    {
      "id": "2",
      "title": "Lia just landed her first client",
      "excerpt": "Freelance success after the DS track.",
      "imageUrl": "/img/stories/lia.jpg",
      "href": "/stories/lia-first-client"
    },
    {
      "id": "3",
      "title": "Anna is now in the head of Tech",
      "excerpt": "Rapid growth into leadership.",
      "imageUrl": "/img/stories/anna.jpg",
      "href": "/stories/anna-lead"
    }
  ],
  "numbers": [
    { "label": "Cities", "value": "15" },
    { "label": "Graduates", "value": "+600" },
    { "label": "Mentors", "value": "35" }
  ],
  "support": {
    "title": "Support Tech Education",
    "body": "Help us empower the next generation by funding cohorts and resources.",
    "imageUrl": "/img/support.jpg",
    "cta": { "label": "Support Tech Education", "to": "/support" }
  },
  "faqs": [
    {
      "q": "Where does the TechLabs take place?",
      "a": "We run in multiple cities and online. Check the application page for your city."
    },
    {
      "q": "Is it a full time program?",
      "a": "No. It is designed to fit alongside work or studies (part-time)."
    }
  ]
}
```

> **Compute deadline text**: `differenceInWeeks(new Date(applicationDeadlineISO), new Date())` → if < 1, show “Applications close in **days**”.

---

## 5) Copy & Microcopy (fixes and consistency)

- **“Sartrt Learning” → “Start Learning.”**
- Replace spaced dots (`.`) with middle dots `·` consistently.
- Keep capitalisation consistent: “About us” → “About Us”. “Be a Partner” can remain as-is or “Become a Partner” (house style).
- Add duration badge to video: `00:45` (aria-label: "Video duration 45 seconds").
- Award line: “Winner of the Google.org Impact Challenge Germany 2018”.

---

## 6) Accessibility Checklist (WCAG AA)

- Skip link before header.
- All nav items reachable via keyboard; Drawer traps focus; ESC closes.
- Hero H1 is the **single** page H1; subhead is `<p>` or `<h2>`.
- Checkbox labels clickable; group has `aria-labelledby` to the “Choose your Journey Now” heading.
- Buttons have discernible names (e.g., `aria-label="Play introduction video"`).
- Carousel has visible prev/next buttons and announces slide position ("Slide 2 of 3").
- Images have meaningful `alt`; partner logos: organization names.
- Color contrast ≥ 4.5:1; focus outlines visible; prefers-reduced-motion respected (turn off autoplaying animations).

---

## 7) Responsive & Layout Rules

- Breakpoints: xs (≤600), sm, md, lg, xl.
- Header sticky; adds elevation after 8px scroll.
- Hero font clamps: H1 `clamp(34px, 7vw, 88px)`.
- Grid gutters: 24px desktop, 16px mobile.
- Carousel shows 1 card on xs, 2 on sm, 3 on md+.
- Numbers band uses equal-height tiles; wraps at sm.

---

## 8) Analytics (MVP placeholders)

- `homepage_view` (on mount)
- `cta_click` with `{ id: 'start-learning' | 'join-our-team' | 'support-education' }`
- `video_open` `{ seconds: 0 }`; `video_play`/`video_pause` (Phase 2)
- `story_open` `{ id }`

---

## 9) BDD Stories & Acceptance Criteria

### 9.1 Header & Nav

**Why:** Keep primary actions visible and predictable.

```
Given I open any page
Then the header is visible, sticky and keyboard reachable
And the logo links to "/"
And nav items route without full reload
And on screens < 960px a burger opens a Drawer with the same items
```

### 9.2 Hero

**Why:** Communicate value immediately.

```
Given I open "/"
Then I see the H1 “Learn Tech Skills for Free” with “Tech” emphasized
And a subheading reading “Blended learning · Local Community · Practical Projects”
```

### 9.3 Track Chooser

**Why:** Encourage self-selection before exploring.

```
Given the track chooser renders
When I pick one or more checkboxes
And I click Start Learning
Then I navigate to /tracks?pref=comma-separated-ids
And my selections are persisted in session storage
```

### 9.4 Trust Strip

**Why:** Build credibility.

```
Given the trust strip is visible
Then I see the award line and at least 4 partner logos with alt text
And images are lazy-loaded
```

### 9.5 Video Banner

**Why:** Provide a quick intro without leaving the page.

```
Given the video banner loads
Then I see a poster with a central play button and a 00:45 badge
When I press Play
Then a modal opens with native controls and captions track
```

### 9.6 Why TechLabs

**Why:** Explain benefits succinctly and visually.

```
Given I scroll to the Why section
Then I see 3 cards each with icon, title and body
And a Start Learning CTA below
```

### 9.7 Stories Carousel

**Why:** Social proof.

```
Given the stories carousel renders
Then it shows at least 3 stories
And provides previous/next buttons operable by keyboard
And clicking See all routes to /stories
```

### 9.8 Numbers Band

**Why:** Show scale at a glance.

```
Given I view the numbers band
Then I see metrics: 15 Cities, +600 Graduates, 35 Mentors
```

### 9.9 Support CTA

**Why:** Invite contribution.

```
Given I see the support block
Then a button labeled “Support Tech Education” routes to /support
```

### 9.10 FAQs

**Why:** Reduce friction.

```
Given I open the FAQs
Then I can expand/collapse with keyboard and screen reader
And the first two questions match the mock data
```

### 9.11 Footer

**Why:** Provide orientation and legal links.

```
Given I reach the footer
Then I see 4 link columns (Programs, Tracks, Get Involved, About Us)
And social icons have accessible names and open in new tabs with noopener
```

---

## 10) QA & Testing Plan

- **Unit (RTL):** header rendering, Drawer toggle, hero copy, track chooser → query param, deadline text computation (<7 days shows days), carousel keyboard nav.
- **Integration:** clicking Start Learning preserves `pref` in URL and session storage; See all → `/stories`.
- **Lighthouse:** A11y ≥ 95, Best Practices ≥ 90, Performance ≥ 85 on mid-tier mobile.
- **Visual:** snapshots for hero, cards, footer at xs & md.

---

## 11) Tickets (Jira‑ready)

- **HOME‑101** Header & Drawer (sticky + elevation) — 3 pts
- **HOME‑102** Hero (H1 + subhead) — 2 pts
- **HOME‑103** Track Chooser + deadline text — 3 pts
- **HOME‑104** Trust Strip (award + logos) — 2 pts
- **HOME‑105** Video Banner modal + captions — 3 pts
- **HOME‑106** Why TechLabs (3 cards) — 3 pts
- **HOME‑107** Stories Carousel (a11y) — 5 pts
- **HOME‑108** Numbers Band — 1 pt
- **HOME‑109** Support CTA block — 2 pts
- **HOME‑110** FAQs (accordion) — 2 pts
- **HOME‑111** Footer (columns + socials) — 2 pts
- **HOME‑120** Lighthouse pass & unit tests — 3 pts

---

## 12) Theme & Tokens (starter)

```ts
// theme.ts (excerpt)
const primary = { main: '#ff3366' }; // refine to your brand pink
export const theme = createTheme({
  palette: { mode: 'light', primary },
  shape: { borderRadius: 16 },
  typography: {
    h1: { fontWeight: 800, letterSpacing: -0.5 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: { MuiButton: { defaultProps: { disableElevation: true } } },
});
```

---

## 13) Open Items & Next Iteration

- Finalize copy for features and FAQs with stakeholders.
- Confirm whether Stories carousel pulls from `/stories` API in Phase 2 or stays static.
- Decide if “Be a Partner” becomes “Partners” page vs. application form.
- Add consent banner for analytics (Phase 2).

---

**Deliverable:** This Markdown file is your single source of truth for the homepage MVP. It is implementation-ready with components, types, mocks, BDD criteria, tests, and tickets.
