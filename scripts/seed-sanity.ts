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

/** Wrap a string value as a localized object with en/de set to the same value. */
const locale = (value: string | undefined | null) => (value ? { en: value, de: value } : undefined)

/** Wrap an array of strings as a localized string array. */
const localeArr = (arr: string[] | undefined | null) => (arr ? { en: arr, de: arr } : undefined)

async function seedTracks() {
  console.log('Seeding tracks...')
  for (const track of tracksData.tracks) {
    const labelText = homeData.tracks.find(t => t.id === track.id)?.label ?? track.id
    await client.createOrReplace({
      _id: `track-${track.id}`,
      _type: 'track',
      trackId: track.id,
      label: locale(labelText),
      applicationDeadline: track.applicationDeadline,
      spotsAvailable: track.spotsAvailable,
      icon: track.icon,
      imageUrl: track.imageUrl,
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
      title: locale(event.title),
      slug: { _type: 'slug', current: slug },
      blurb: locale(event.blurb),
      date: event.date,
      location: event.location,
      type: event.type,
      imageUrl: event.imageUrl,
      description: localeArr(event.description),
      highlights: localeArr(event.highlights),
      agenda: event.agenda?.map(a => ({
        _key: slugify(a.title),
        time: a.time,
        title: locale(a.title),
      })),
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
    const narrative = story.narrative as Record<string, string> | undefined
    const achievements = story.achievements as string[] | undefined
    await client.createOrReplace({
      _id: `story-${story.id}`,
      _type: 'story',
      name: story.name,
      title: locale(story.title as string),
      slug: { _type: 'slug', current: slug },
      excerpt: locale(story.excerpt as string),
      fullDescription: locale(story.fullDescription as string),
      imageUrl: story.imageUrl,
      coverImageUrl: story.coverImageUrl,
      track: story.track,
      trackLabel: story.trackLabel,
      graduationDate: story.graduationDate,
      location: story.location,
      currentRole: story.currentRole,
      company: story.company,
      beforeRole: locale(story.beforeRole as string | undefined),
      achievements: localeArr(achievements),
      quote: locale(story.quote as string | undefined),
      narrative: narrative
        ? {
            challenge: locale(narrative.challenge),
            discovery: locale(narrative.discovery),
            experience: locale(narrative.experience),
            transformation: locale(narrative.transformation),
            outcome: locale(narrative.outcome),
          }
        : undefined,
      metrics: metrics?.map(m => ({
        _key: slugify(m.label),
        label: locale(m.label),
        value: m.value,
      })),
      photoCredit: story.photoCredit,
    })
  }
  console.log(`  Created ${stories.length} stories`)
}

async function seedPartners() {
  console.log('Seeding partners...')
  for (const partner of partnersData.partners) {
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
      question: locale(faq.q),
      answer: locale(faq.a),
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
    hero: {
      title: locale(homeData.hero.title),
      emphasis: locale(homeData.hero.emphasis),
      subtitle: locale(homeData.hero.subtitle),
    },
    applicationDeadlineISO: homeData.applicationDeadlineISO,
    video: homeData.video,
    features: homeData.features.map(f => ({
      _key: slugify(f.title),
      icon: f.icon,
      title: locale(f.title),
      body: locale(f.body),
    })),
    numbers: homeData.numbers.map(n => ({
      _key: slugify(n.label),
      label: locale(n.label),
      value: n.value,
    })),
    support: {
      title: locale(homeData.support.title),
      body: locale(homeData.support.body),
      imageUrl: homeData.support.imageUrl,
      cta: {
        label: locale(homeData.support.cta.label),
        to: homeData.support.cta.to,
      },
    },
    about: {
      mission: contentData.about.mission,
      program: {
        ...contentData.about.program,
        phases: contentData.about.program.phases.map(p => ({
          _key: slugify(p.title),
          ...p,
        })),
      },
      team: {
        title: contentData.about.team.title,
        description: contentData.about.team.description,
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
