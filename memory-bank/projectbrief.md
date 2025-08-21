# TechLabs Website - Project Brief

## Scope

**Public site MVP**: App shell, Homepage, Tracks, Events, Stories, Partners, About Us, Privacy, Imprint.

**Constraints:**

- **Frontend-only MVP** with mocked data
- **No** authentication, admin, forms submission, or backend calls (mock only)
- All content loaded from local **mocks** and validated with **Zod**

## Goals

- Communicate value quickly (hero + subhead)
- Drive **Start Learning** and **Join our team** CTAs
- Showcase trust (partner logos, Google.org note), outcomes (stories), credibility (numbers), clarity (FAQs)
- Responsive, accessible (WCAG AA), performance-minded, API‑ready

## Non‑Goals (MVP)

- Real data fetching, auth, CMS, i18n switching, analytics consent logic, or video hosting integration

## Success Metrics

- Lighthouse: A11y ≥ 95, Best Practices ≥ 90, Performance ≥ 85 (mid-tier mobile)
- WCAG AA compliance
- All key user journeys functional on mobile/desktop

## Key Routes

- `/` → Homepage (main focus)
- `/tracks`, `/events`, `/stories`, `/partners`, `/about`, `/privacy`, `/imprint`
