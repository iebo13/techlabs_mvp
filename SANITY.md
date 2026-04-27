# Sanity CMS Integration

This project uses [Sanity](https://www.sanity.io/) as its headless CMS. Content
can be served from either local JSON mock files or Sanity, controlled by a
single environment variable.

---

## Quick Start

### 1. Install studio dependencies

```bash
cd studio-techlabs
npm install
```

### 2. Authenticate with Sanity

```bash
npx sanity login
```

This opens a browser to authenticate your Sanity account.

### 3. Start the studio

```bash
cd studio-techlabs
npm run dev
```

The studio runs at **http://localhost:3333** by default.

The hosted studio is deployed at **https://techlabs.sanity.studio**.

### 4. Seed content from mock data

Before the frontend can fetch from Sanity, populate the dataset with the
existing mock data.

1. Get a **write token** from
   [sanity.io/manage](https://www.sanity.io/manage/project/5cujjqgw/api#tokens)
   (create a token with Editor or higher permissions)
2. Run the seed script from the project root:

```bash
SANITY_TOKEN=<your-token> npx tsx scripts/seed-sanity.ts
```

This creates all documents (tracks, events, stories, partners, FAQs, team
members, and the site settings singleton).

### 5. Switch the frontend to Sanity

In your `.env` file, change:

```env
VITE_DATA_SOURCE=sanity
```

Then restart the dev server:

```bash
npm run dev
```

To switch back to mock data at any time, set `VITE_DATA_SOURCE=mock`.

---

## Environment Variables

| Variable                  | Required  | Default      | Description                                    |
| ------------------------- | --------- | ------------ | ---------------------------------------------- |
| `VITE_SANITY_PROJECT_ID`  | Yes       | —            | Sanity project ID (`5cujjqgw`)                 |
| `VITE_SANITY_DATASET`     | Yes       | `production` | Sanity dataset name                            |
| `VITE_SANITY_API_VERSION` | No        | `2026-04-11` | Sanity API version date                        |
| `VITE_DATA_SOURCE`        | No        | `mock`       | `mock` for local JSON, `sanity` for Sanity CMS |
| `SANITY_TOKEN`            | Seed only | —            | Write token, only needed for `seed-sanity.ts`  |

Copy `.env.example` to `.env` and fill in the values.

---

## Architecture

### Data source toggle

The toggle lives in `src/config/dataSource.ts`:

```typescript
export const useSanityData = (): boolean =>
  import.meta.env.VITE_DATA_SOURCE === 'sanity'
```

Every TanStack Query hook checks this at runtime. When `mock`, it dynamically
imports from `src/mocks/*.json`. When `sanity`, it fetches via the Sanity
client.

### Key files

| Path                             | Purpose                                            |
| -------------------------------- | -------------------------------------------------- |
| `src/config/sanity.ts`           | Sanity client instance and `urlFor()` image helper |
| `src/config/dataSource.ts`       | Data source toggle                                 |
| `src/utils/sanityFetch.ts`       | Generic fetch wrapper with optional Zod validation |
| `src/features/*/api/*Queries.ts` | GROQ query strings per feature                     |
| `src/features/*/hooks/use*.ts`   | TanStack Query hooks (mock/sanity dual path)       |
| `scripts/seed-sanity.ts`         | One-time seed script                               |
| `studio-techlabs/`               | Sanity Studio project                              |

### Data flow

```
Page component
  └─ useQuery hook (e.g. useEvents)
       ├─ mock path: dynamic import → Zod parse → data
       └─ sanity path: sanityFetch(GROQ) → optional Zod parse → data
```

---

## Sanity Studio

The studio lives in `studio-techlabs/` as a separate project (not embedded in
the Vite app).

### Studio commands

```bash
cd studio-techlabs
npm run dev       # Local development (http://localhost:3333)
npm run build     # Build for deployment
npm run deploy    # Deploy to techlabs.sanity.studio
npm run typegen   # Generate TypeScript types from schemas
```

### Content types

| Document type  | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `track`        | Learning tracks (Web Dev, Data Science, Product Design, AI)                     |
| `event`        | Events with slug, agenda, highlights                                            |
| `story`        | Success stories with narrative sections, metrics, photo credits                 |
| `partner`      | Partner organizations                                                           |
| `faq`          | Frequently asked questions                                                      |
| `teamMember`   | Team member profiles                                                            |
| `siteSettings` | Singleton — homepage hero, features, numbers, video, support CTA, about section |

Schema files are in `studio-techlabs/schemaTypes/`.

---

## GROQ Queries

Each feature has its own query file:

| File                                          | Queries                                                       |
| --------------------------------------------- | ------------------------------------------------------------- |
| `src/features/events/api/eventQueries.ts`     | `ALL_EVENTS_QUERY`, `EVENT_BY_SLUG_QUERY`                     |
| `src/features/stories/api/storyQueries.ts`    | `ALL_STORIES_QUERY`, `STORY_BY_SLUG_QUERY`                    |
| `src/features/tracks/api/trackQueries.ts`     | `ALL_TRACKS_QUERY`                                            |
| `src/features/partners/api/partnerQueries.ts` | `ALL_PARTNERS_QUERY`                                          |
| `src/features/about/api/aboutQueries.ts`      | `ABOUT_CONTENT_QUERY`, `TEAM_MEMBERS_QUERY`, `ALL_FAQS_QUERY` |
| `src/features/home/api/homeQueries.ts`        | `HOME_PAGE_QUERY` (compound query)                            |

You can test queries interactively in the studio's **Vision** plugin
(http://localhost:3333/vision).

---

## Common Tasks

### Add a new content type

1. Create a schema file in `studio-techlabs/schemaTypes/`
2. Export it from `studio-techlabs/schemaTypes/index.ts`
3. Create a GROQ query in `src/features/<feature>/api/`
4. Create a TanStack Query hook in `src/features/<feature>/hooks/`
5. Add a Zod schema in `src/mocks/schemas.ts` for validation
6. Update the seed script if needed

### Edit content

Open the studio at http://localhost:3333, find the document, edit, and publish.
Changes appear on the frontend after the TanStack Query cache expires (5 minutes
by default) or on page refresh.

### Re-seed data

Running the seed script again is safe — it uses `createOrReplace` with
deterministic IDs, so existing documents are overwritten, not duplicated.

```bash
SANITY_TOKEN=<your-token> npx tsx scripts/seed-sanity.ts
```

### Test with Vision

The Sanity Vision plugin lets you run GROQ queries against your dataset
directly. Access it at http://localhost:3333/vision when the studio is running.

---

## Troubleshooting

| Problem                                      | Solution                                                                                                                                  |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `CORS origin error` in browser console       | Add your dev URL (e.g. `http://localhost:5173`) in [Sanity CORS settings](https://www.sanity.io/manage/project/5cujjqgw/api#cors-origins) |
| `Must be logged in` when running seed script | Set `SANITY_TOKEN` env var with a valid write token                                                                                       |
| Data not updating after studio edits         | TanStack Query caches for 5 min — refresh the page or wait for `staleTime` to expire                                                      |
| Studio shows no document types               | Run `npm install` in `studio-techlabs/` and restart with `npm run dev`                                                                    |
| Types mismatch after schema changes          | Run `npm run typegen` in `studio-techlabs/` to regenerate types                                                                           |
