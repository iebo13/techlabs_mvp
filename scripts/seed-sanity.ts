/**
 * Seed script to populate Sanity with mock data.
 * Run: npx tsx scripts/seed-sanity.ts
 *
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_TOKEN env vars.
 * Get a write token from: https://www.sanity.io/manage/project/5cujjqgw/api#tokens
 */

import { createClient } from '@sanity/client'
import eventsData from '../src/mocks/events.json'
import faqData from '../src/mocks/faq.json'
import homeData from '../src/mocks/home.json'
import contentData from '../src/mocks/content.json'
import partnersData from '../src/mocks/partners.json'
import storiesData from '../src/mocks/stories.json'
import tracksData from '../src/mocks/tracks.json'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '5cujjqgw',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2026-04-11',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

async function seedTracks() {
  console.log('Seeding tracks...')
  for (const track of tracksData.tracks) {
    const label = homeData.tracks.find(t => t.id === track.id)?.label ?? track.id
    await client.createOrReplace({
      _id: `track-${track.id}`,
      _type: 'track',
      trackId: track.id,
      label,
      applicationDeadline: track.applicationDeadline,
      spotsAvailable: track.spotsAvailable,
      icon: track.icon,
    })
  }
  console.log(`  Created ${tracksData.tracks.length} tracks`)
}

async function seedEvents() {
  console.log('Seeding events...')
  for (const event of eventsData.events) {
    const slug = slugify(event.title)
    await client.createOrReplace({
      _id: `event-${event.id}`,
      _type: 'event',
      title: event.title,
      slug: { _type: 'slug', current: slug },
      blurb: event.blurb,
      date: event.date,
      location: event.location,
      type: event.type,
      imageUrl: event.imageUrl,
      description: event.description,
      highlights: event.highlights,
      agenda: event.agenda?.map(a => ({ _key: slugify(a.title), ...a })),
      externalUrl: event.externalUrl,
    })
  }
  console.log(`  Created ${eventsData.events.length} events`)
}

async function seedStories() {
  console.log('Seeding stories...')
  const stories = storiesData as Array<Record<string, unknown>>
  for (const story of stories) {
    const slug = slugify(story.title as string)
    const metrics = story.metrics as Array<Record<string, string>> | undefined
    await client.createOrReplace({
      _id: `story-${story.id}`,
      _type: 'story',
      name: story.name,
      title: story.title,
      slug: { _type: 'slug', current: slug },
      excerpt: story.excerpt,
      fullDescription: story.fullDescription,
      imageUrl: story.imageUrl,
      coverImageUrl: story.coverImageUrl,
      track: story.track,
      trackLabel: story.trackLabel,
      graduationDate: story.graduationDate,
      location: story.location,
      currentRole: story.currentRole,
      company: story.company,
      beforeRole: story.beforeRole,
      achievements: story.achievements,
      quote: story.quote,
      narrative: story.narrative,
      metrics: metrics?.map(m => ({ _key: slugify(m.label), ...m })),
      photoCredit: story.photoCredit,
    })
  }
  console.log(`  Created ${stories.length} stories`)
}

async function seedPartners() {
  console.log('Seeding partners...')
  for (const [i, partner] of partnersData.partners.entries()) {
    await client.createOrReplace({
      _id: `partner-${slugify(partner.name)}`,
      _type: 'partner',
      name: partner.name,
      logoUrl: partner.logoUrl,
      description: partner.description,
      website: partner.website,
      category: partner.category,
    })
  }
  console.log(`  Created ${partnersData.partners.length} partners`)
}

async function seedFaqs() {
  console.log('Seeding FAQs...')
  for (const [i, faq] of faqData.faqs.entries()) {
    await client.createOrReplace({
      _id: `faq-${i}`,
      _type: 'faq',
      question: faq.q,
      answer: faq.a,
      order: i,
    })
  }
  console.log(`  Created ${faqData.faqs.length} FAQs`)
}

async function seedTeamMembers() {
  console.log('Seeding team members...')
  const members = contentData.about.team.members
  for (const [i, member] of members.entries()) {
    await client.createOrReplace({
      _id: `team-${slugify(member.name)}`,
      _type: 'teamMember',
      name: member.name,
      role: member.role,
      bio: member.bio,
      imageUrl: member.imageUrl,
      order: i,
    })
  }
  console.log(`  Created ${members.length} team members`)
}

async function seedSiteSettings() {
  console.log('Seeding site settings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    hero: homeData.hero,
    applicationDeadlineISO: homeData.applicationDeadlineISO,
    video: homeData.video,
    features: homeData.features.map(f => ({ _key: slugify(f.title), ...f })),
    numbers: homeData.numbers.map(n => ({ _key: slugify(n.label), ...n })),
    support: homeData.support,
    about: {
      mission: contentData.about.mission,
      program: {
        ...contentData.about.program,
        phases: contentData.about.program.phases.map(p => ({
          _key: slugify(p.title),
          ...p,
        })),
      },
      contact: contentData.about.contact,
    },
  })
  console.log('  Created site settings singleton')
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN env var is required.')
    console.error('Get a write token from: https://www.sanity.io/manage/project/5cujjqgw/api#tokens')
    process.exit(1)
  }

  console.log('Starting Sanity seed...\n')

  await seedTracks()
  await seedEvents()
  await seedStories()
  await seedPartners()
  await seedFaqs()
  await seedTeamMembers()
  await seedSiteSettings()

  console.log('\nSeed complete!')
}

main().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
