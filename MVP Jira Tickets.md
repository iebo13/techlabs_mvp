# TechLabs — MVP Jira Tickets (Epics → Stories/Tasks)

> **Scope:** Public website MVP, frontend only, mocked data. Tech: React 18 + TypeScript, MUI 7, React Router 7, React Hook Form + Zod, React Query 5 (installed, reserved for V2), vitest + RTL. Dark-friendly theme, Context Provider, pure functions & hooks.

---

## 1) Epic List (overview)

- **EPIC-MVP-SETUP — Project Setup & Tooling**
  - Scaffold, tooling, theme tokens, folder structure, CI/test bed.

- **EPIC-MVP-SHELL — App Shell**
  - Header (nav + CTAs + locale indicator), Footer, global layout.

- **EPIC-MVP-HOMEPAGE — Homepage**
  - Hero, Track Chooser (with deadline & session persistence), Trust strip, Video banner, Why TechLabs, Stories carousel, Numbers band, Support CTA, FAQs.

- **EPIC-MVP-PAGES — Core Pages**
  - Tracks, Events, Stories (gallery), Partners, About Us (+ full FAQ), Privacy, Imprint.

- **EPIC-MVP-COMPONENTS — Shared Components Library**
  - Reusable primitives: CTAButton, SectionHeading, KPIStat, ValuePropCard, TrackCard, EventCard, PartnerLogo, FAQAccordion, Carousel, VideoEmbed.

- **EPIC-MVP-QA — A11y, SEO, Testing & Mocks**
  - A11y pass (WCAG AA), SEO metadata, mocks + Zod validation, unit/integration tests, (optional) CI.

---

## 2) Stories & Tasks by Epic (Jira-ready)

### EPIC-MVP-SETUP — Project Setup & Tooling

#### **MVP-01 — Scaffold & Tooling**

- **What should be done**: Initialize Vite React TS app; configure Router 7, ESLint + Prettier; set up vitest + RTL; install MUI 7, RHF + Zod, React Query 5; add base folders & scripts.
- **Why it’s important for users**: Solid foundations reduce defects and speed up delivery, resulting in a smoother, reliable site for users.
- **Acceptance Criteria (AC)**
  - App boots locally; sample route renders; 404 route exists.
  - Scripts `start`, `build`, `test`, `lint`, `format` work.
  - ESLint/Prettier run clean; one sample vitest+RTL test passes.
  - Libraries installed and importable (MUI, Router, RHF, Zod, RQ5).

- **Technical Information**
  - Tooling: Vite, TypeScript, vitest + React Testing Library.
  - Structure: `src/app`, `src/pages`, `src/components`, `src/theme`, `src/mocks`, `src/types`.

- **Tech Notes**
  - Add `.nvmrc`, `.editorconfig`.
  - Prefer Context Provider & hooks over Redux.

- **Tasks**
  1. Create Vite React TS app and repository scaffolding.
  2. Install libs (MUI, Router, RHF, Zod, React Query, vitest, RTL).
  3. Configure ESLint (Airbnb+TS+react+hooks+unicorn) + Prettier; add npm scripts.
  4. Add sample component + test; verify CI locally.
  5. Add `.nvmrc`, `.editorconfig`, `CONTRIBUTING.md`.

- **Dependencies**: —

#### **MVP-02 — Theme & Design Tokens**

- **What should be done**: Implement global theme aligned to Figma; create Section/Heading wrappers; document tokens.
- **Why it’s important for users**: Consistent, accessible visuals improve readability, trust, and navigation.
- **AC**
  - Global `ThemeProvider` with palette/typography/breakpoints.
  - `Section` & `SectionHeading` components exist and used in pages.
  - Contrast AA verified for text & interactive elements.

- **Technical Information**
  - MUI `createTheme`, `CssBaseline`; starter primary `#ff3366` (refine later).

- **Tech Notes**
  - Export `shape.borderRadius=16`, custom `zIndex` as needed; dark-friendly.

- **Tasks**
  1. Implement `src/theme/theme.ts` and `ThemeProvider` wiring.
  2. Create `Section` and `SectionHeading` wrappers.
  3. Add `/src/theme/README.md` documenting tokens and usage.

- **Dependencies**: MVP-01

---

### EPIC-MVP-SHELL — App Shell

#### **MVP-03 — Header & Navigation**

- **What should be done**: Build sticky, accessible header with desktop menus and mobile drawer; include CTAs and mocked locale indicator.
- **Why it’s important for users**: Clear, consistent navigation helps users find content quickly on any device.
- **AC (BDD)**
  - Header visible and sticky; logo → "/"; client-side routing for nav items.
  - <960px burger opens Drawer with same links; ESC closes; focus trap.
  - CTAs: **Start Learning** → `#tracks` on home or `/tracks`; **Join our team** → `/careers` (placeholder).

- **Technical Information**
  - Components: MUI `AppBar`, `Menu`, `Drawer`, `IconButton`, `ListItemButton`.
  - Router: React Router 7 `<Link>`.

- **Tech Notes**
  - Add elevation after 8px scroll; use middle dots `·` in copy; "About Us" capitalization.

- **Tasks**
  1. Implement `HeaderNav.tsx` desktop & mobile.
  2. Create `NavLink` with active state.
  3. A11y tests (keyboard nav, aria, drawer focus trap).

- **Dependencies**: MVP-02

#### **MVP-04 — Footer**

- **What should be done**: Implement footer with 4 link columns + socials; add Privacy & Imprint pages.
- **Why it’s important for users**: Builds trust, provides legal info and deep links.
- **AC**
  - Columns: Programs, Tracks, Get Involved, About Us; socials have accessible names.
  - Links to `/privacy` & `/imprint`; socials open in new tab with `rel="noopener"`.

- **Technical Information**
  - MUI `Grid`/`Stack`, MUI Icons.

- **Tech Notes**
  - Generate links from shared route map for consistency.

- **Tasks**
  1. Create `SiteFooter.tsx` with columns + socials.
  2. Add `/privacy` and `/imprint` placeholders.
  3. Unit tests for links and a11y names.

- **Dependencies**: MVP-01, MVP-02

---

### EPIC-MVP-HOMEPAGE — Homepage

#### **MVP-05 — Home: Hero**

- **What should be done**: Implement hero with H1 and subhead per copy.
- **Why it’s important for users**: Communicates value immediately and sets page structure.
- **AC (BDD)**
  - H1 "Learn **Tech** Skills for Free" with emphasis span "Tech".
  - Subhead: "Blended learning · Local Community · Practical Projects".

- **Technical Information**
  - `Hero.tsx`; use theme typography clamps (`clamp(34px, 7vw, 88px)`).

- **Tech Notes**
  - Ensure there is a single page H1.

- **Tasks**
  1. Build `Hero.tsx` layout & copy.
  2. Snapshot test for copy & structure.

- **Dependencies**: MVP-03

#### **MVP-06 — Home: Track Chooser + Deadline + Persistence**

- **What should be done**: Track checkboxes, deadline helper; Start Learning CTA routes with selected tracks; persist selection in `sessionStorage`.
- **Why it’s important for users**: Guides exploration and reduces friction when comparing tracks.
- **AC (BDD)**
  - Options: Web Development, Data Science, Product Design, AI.
  - Clicking **Start Learning** → `/tracks?pref=comma-separated-ids`.
  - Selections persist in `sessionStorage` and prefill on revisit.
  - Deadline helper shows weeks; if <1 week, show **days**.

- **Technical Information**
  - Component `TrackChooser.tsx`; mocks from `home.json`.
  - Date calc: `differenceInWeeks(...)` else days.

- **Tech Notes**
  - Keep pure; small utility for (de)serializing `sessionStorage`.

- **Tasks**
  1. Implement `TrackChooser.tsx` + helper text + CTA.
  2. Add persistence util (read/write selected track ids).
  3. Tests: URL param, persistence restore, <7 days edge.

- **Dependencies**: MVP-05

#### **MVP-07 — Home: Trust Strip (Award + Logos)**

- **What should be done**: Add award line and partner logo grid (lazy-loaded, with alts).
- **Why it’s important for users**: Establishes credibility and trust quickly.
- **AC (BDD)**
  - Award line: "Winner of the Google.org Impact Challenge Germany 2018".
  - ≥ 4 partner logos visible; images lazy-loaded; `alt` equals org name.

- **Technical Information**
  - `TrustStrip.tsx`; data from `partners.json`.

- **Tech Notes**
  - Ensure responsive wrapping; defer offscreen logos.

- **Tasks**
  1. Implement logos grid + award copy.
  2. Unit tests: count & alt text present.

- **Dependencies**: MVP-06

#### **MVP-08 — Home: Video Banner (Modal + Captions)**

- **What should be done**: Video card with poster, play overlay, 00:45 badge; modal with HTML5 video + captions; a11y focus trap.
- **Why it’s important for users**: Quick overview without leaving the page; accessible playback.
- **AC (BDD)**
  - Poster shows play button and `00:45` badge (aria-label duration).
  - Modal opens on play; ESC or overlay click closes; keyboard trap in modal.
  - Captions track available.

- **Technical Information**
  - `HeroVideo.tsx` + `VideoEmbed` component; `.vtt` captions.

- **Tech Notes**
  - Respect `prefers-reduced-motion`; no autoplay.

- **Tasks**
  1. Implement video card & modal w/ focus trap.
  2. Add captions & aria labels.
  3. Tests: open/close via keyboard.

- **Dependencies**: MVP-07

#### **MVP-09 — Home: Why TechLabs (3 features) + CTA**

- **What should be done**: Render 3 value cards and CTA to `/tracks`.
- **Why it’s important for users**: Explains benefits succinctly to drive conversion.
- **AC (BDD)**
  - Cards: "Totally free", "Networking", "Job Ready"; CTA below.

- **Technical Information**
  - `WhyTechlabs.tsx`; `ValuePropCard` component.

- **Tech Notes**
  - Copy from `home.json` features array.

- **Tasks**
  1. Build section and cards.
  2. Tests: card titles render.

- **Dependencies**: MVP-08

#### **MVP-10 — Home: Stories Carousel (A11y)**

- **What should be done**: Carousel of ≥3 stories with keyboardable prev/next and "See all" link.
- **Why it’s important for users**: Social proof improves trust and engagement.
- **AC (BDD)**
  - Prev/Next accessible via keyboard; announced slide position (e.g., "Slide 2 of 3").
  - "See all" → `/stories`.
  - No autoplay; respects reduced motion.

- **Technical Information**
  - `StoriesCarousel.tsx`; `keen-slider` or custom; data from `stories.json`.

- **Tech Notes**
  - Lazy-load images; provide meaningful `alt`.

- **Tasks**
  1. Implement carousel + a11y controls.
  2. Tests: keyboard nav, link target.

- **Dependencies**: MVP-09

#### **MVP-11 — Home: Numbers Band**

- **What should be done**: Display metrics tiles.
- **Why it’s important for users**: Conveys scale at a glance.
- **AC (BDD)**
  - Shows: 15 Cities, +600 Graduates, 35 Mentors.

- **Technical Information**
  - `NumbersBand.tsx`; `KPIStat`.

- **Tech Notes**
  - Equal tile heights; responsive wrap at `sm`.

- **Tasks**
  1. Implement grid tiles.
  2. Test: labels/values render.

- **Dependencies**: MVP-10

#### **MVP-12 — Home: Support CTA**

- **What should be done**: Render highlight CTA linking to `/support` (placeholder).
- **Why it’s important for users**: Provides a clear path to contribute.
- **AC**
  - Button text "Support Tech Education" routes correctly.

- **Technical Information**
  - `SupportCta.tsx` with image + copy.

- **Tech Notes**
  - Ensure contrast and accessible button label.

- **Tasks**
  1. Implement section + CTA.
  2. Test: link target.

- **Dependencies**: MVP-11

#### **MVP-13 — Home: FAQs (Accordion)**

- **What should be done**: FAQ accordion with at least 2 items + "More questions" link to About `#faq`.
- **Why it’s important for users**: Reduces friction by answering common questions.
- **AC (BDD)**
  - Keyboard and SR friendly; only one panel open at a time.
  - First two questions match mocks.

- **Technical Information**
  - `Faqs.tsx`; shared `FAQAccordion` component; data from `home.json` / `faq.json`.

- **Tech Notes**
  - Manage expanded state for single-open behavior.

- **Tasks**
  1. Implement accordion with links.
  2. Tests: toggle behavior, first two questions.

- **Dependencies**: MVP-12

---

### EPIC-MVP-PAGES — Core Pages

#### **MVP-14 — Tracks Page**

- **What should be done**: Grid of 4 track cards; inline expanders for details; page-level CTA.
- **Why it’s important for users**: Helps users compare tracks and proceed confidently.
- **AC**
  - 4 cards with icon/title/summary; expand/toggle details; CTA present.

- **Technical Information**
  - `TracksPage.tsx`; data `tracks.json`; `TrackCard` component.

- **Tech Notes**
  - Preselect based on `pref` query from `sessionStorage` selection where available.

- **Tasks**
  1. Implement page + expanders + CTA.
  2. Tests: render, expand toggle, `pref` query handling.

- **Dependencies**: MVP-06, MVP-09

#### **MVP-15 — Events Page**

- **What should be done**: List events with Upcoming/Past filters and pagination.
- **Why it’s important for users**: Enables participation in the community.
- **AC**
  - Tabs/filters for Upcoming/Past; card displays date/title/blurb/location.
  - "Load more" when >6 items.

- **Technical Information**
  - `EventsPage.tsx`; `events.json`; date utilities for sorting.

- **Tech Notes**
  - Accessible date labels; order by date descending.

- **Tasks**
  1. Implement filters + list + load more.
  2. Tests: filter logic, ordering.

- **Dependencies**: MVP-02

#### **MVP-16 — Stories Page**

- **What should be done**: Stories gallery with filter by track; modal details.
- **Why it’s important for users**: Offers deeper social proof and inspiration.
- **AC**
  - Grid of cards; filter dropdown; clicking opens modal with details (mock).

- **Technical Information**
  - `StoriesPage.tsx`; data from `stories.json`; MUI `Dialog`.

- **Tech Notes**
  - Lazy-load images; ensure dialog a11y.

- **Tasks**
  1. Implement grid + filter + modal.
  2. Tests: filter, modal open/close.

- **Dependencies**: MVP-10

#### **MVP-17 — Partners Page**

- **What should be done**: Show partners by tier; CTA to inquire about partnership.
- **Why it’s important for users**: Reinforces trust and invites collaboration.
- **AC**
  - Sections per tier; logo grid; "Be a Partner" → `/about#contact` (placeholder).

- **Technical Information**
  - `PartnersPage.tsx`; `partners.json`.

- **Tech Notes**
  - Consider monochrome logos if per brand style.

- **Tasks**
  1. Implement grouping + grids + CTA.
  2. Tests: grouping and link targets.

- **Dependencies**: MVP-07

#### **MVP-18 — About Us Page (+ full FAQ)**

- **What should be done**: Mission, program approach, simple timeline, ≥10 FAQs with `#faq` anchor.
- **Why it’s important for users**: Provides clarity on who we are and how the program works.
- **AC**
  - Mission block + tagline; timeline/stepper; at least 10 FAQs; `#faq` anchor works.

- **Technical Information**
  - `AboutPage.tsx`; reuse `FAQAccordion`; content from `content.json` & `faq.json`.

- **Tech Notes**
  - Ensure deep-link focus management when navigating to `#faq`.

- **Tasks**
  1. Build page sections & anchor behavior.
  2. Tests: anchor scroll & focus, accordion.

- **Dependencies**: MVP-13

---

### EPIC-MVP-COMPONENTS — Shared Components Library

#### **MVP-19 — Shared Primitives**

- **What should be done**: Create shared UI components with strict TS props and docs.
- **Why it’s important for users**: Consistency and speed reduce UI bugs and improve UX.
- **AC**
  - Components available: CTAButton, SectionHeading, KPIStat, ValuePropCard, TrackCard, EventCard, PartnerLogo, FAQAccordion, Carousel, VideoEmbed.
  - Docs (mdx or Storybook-lite) and snapshot tests exist.

- **Technical Information**
  - Strict TS props; a11y checks; MUI building blocks.

- **Tech Notes**
  - Keep components pure/functional; avoid heavy context except where shared.

- **Tasks**
  1. Implement components.
  2. Author docs/stories.
  3. Add snapshot tests & prop-type tests.

- **Dependencies**: MVP-01, MVP-02

---

### EPIC-MVP-QA — A11y, SEO, Testing & Mocks

#### **MVP-20 — Accessibility & SEO Pass**

- **What should be done**: Perform A11y pass and add baseline SEO metadata.
- **Why it’s important for users**: Inclusivity and discoverability.
- **AC**
  - Alt text, keyboard nav, focus visible; `skip to content`.
  - Contrast AA; unique titles & meta; OG tags on Home.
  - Lighthouse: A11y ≥ 95, Best Practices ≥ 90, Performance ≥ 85 on mid-tier mobile.

- **Technical Information**
  - Tools: axe, Lighthouse; Head mgmt via React Helmet (or equivalent).

- **Tech Notes**
  - Respect `prefers-reduced-motion`; no autoplay carousels/videos in MVP.

- **Tasks**
  1. Add meta & OG tags for key pages.
  2. Run audits; fix issues; commit report.

- **Dependencies**: MVP-05 … MVP-18

#### **MVP-21 — Testing & Mocks Stabilization**

- **What should be done**: Finalize mock data and Zod schemas; add unit/integration tests; optional CI pipeline.
- **Why it’s important for users**: Reliability and confidence in behavior.
- **AC**
  - Mocks for tracks/events/stories/partners/faq created and Zod-validated.
  - ≥ 8 unit/integration tests cover: Nav, Hero, Track Chooser URL+storage, Deadline text, Carousel a11y, FAQ toggle, Tracks expanders, Events filters.
  - (Optional) CI runs lint + tests on PRs.

- **Technical Information**
  - vitest + RTL; optional MSW for future API simulation.

- **Tech Notes**
  - Align mock shapes to future API contracts; keep deterministic ids.

- **Tasks**
  1. Author fixtures & Zod schemas.
  2. Write tests; configure GitHub Actions (optional).

- **Dependencies**: MVP-01

---

## 3) Cross-cutting Notes

- **Copy & microcopy**: Use middle dots `·`; fix "Start Learning" spelling; capitalization "About Us". Video duration badge `00:45` with `aria-label`.
- **Responsiveness**: Breakpoints xs/sm/md/lg/xl; carousel cards 1/2/3 on xs/sm/md+; sticky header elevates after 8px.
- **A11y**: Single H1, image `alt`s (logos use org names), focus management for modals/anchors, drawer focus trap, keyboardable carousels.
- **Performance**: Lazy-load images/logos; avoid heavy libs; defer offscreen assets.

---

## 4) Dependencies Summary (graph-friendly)

- MVP-01 → MVP-02 → (MVP-03, MVP-04)
- MVP-03 → MVP-05 → MVP-06 → MVP-07 → MVP-08 → MVP-09 → MVP-10 → MVP-11 → MVP-12 → MVP-13
- MVP-06 → MVP-14
- MVP-02 → MVP-15
- MVP-10 → MVP-16
- MVP-07 → MVP-17
- MVP-13 → MVP-18
- (MVP-05 … MVP-18) → MVP-20
- MVP-01 → MVP-21
