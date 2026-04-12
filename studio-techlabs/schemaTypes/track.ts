import { defineType, defineField } from 'sanity'

export const trackPersona = defineType({
  name: 'trackPersona',
  title: 'Track Persona',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString', validation: r => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'localeText', validation: r => r.required() }),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'icon' } },
})

export const trackTechStackItem = defineType({
  name: 'trackTechStackItem',
  title: 'Tech Stack Item',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'icon', title: 'Icon (emoji fallback)', type: 'string' }),
  ],
  preview: { select: { title: 'name', subtitle: 'icon' } },
})

export const trackCurriculumPhase = defineType({
  name: 'trackCurriculumPhase',
  title: 'Curriculum Phase',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString', validation: r => r.required() }),
    defineField({ name: 'duration', title: 'Duration', type: 'localeString' }),
    defineField({ name: 'outcomes', title: 'Outcomes', type: 'localeStringArray' }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'duration.en' } },
})

export const trackProject = defineType({
  name: 'trackProject',
  title: 'Project Showcase',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { select: { title: 'title.en' } },
})

export const trackFaq = defineType({
  name: 'trackFaq',
  title: 'Track FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'q', title: 'Question', type: 'localeString', validation: r => r.required() }),
    defineField({ name: 'a', title: 'Answer', type: 'localeText', validation: r => r.required() }),
  ],
  preview: { select: { title: 'q.en' } },
})

export const track = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'curriculum', title: 'Curriculum & Tech' },
    { name: 'meta', title: 'Application & Meta' },
  ],
  fields: [
    defineField({
      name: 'trackId',
      title: 'Track ID',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Web Development', value: 'web-dev' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Product Design', value: 'product-design' },
          { title: 'Artificial Intelligence', value: 'ai' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({ name: 'label', title: 'Label', type: 'localeString', group: 'basic', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Short description', type: 'localeText', group: 'basic' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'localeString', group: 'basic' }),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string', group: 'basic' }),
    defineField({
      name: 'imageUrl',
      title: 'Cover image URL',
      type: 'url',
      group: 'basic',
      description: 'Hero and card image (e.g. Unsplash)',
    }),

    // Content
    defineField({ name: 'intro', title: 'Intro paragraphs', type: 'localeStringArray', group: 'content' }),
    defineField({
      name: 'personas',
      title: 'Who this track is for',
      type: 'array',
      group: 'content',
      of: [{ type: 'trackPersona' }],
    }),
    defineField({
      name: 'projects',
      title: 'Project showcase',
      type: 'array',
      group: 'content',
      of: [{ type: 'trackProject' }],
    }),
    defineField({ name: 'careerPaths', title: 'Career paths', type: 'localeStringArray', group: 'content' }),
    defineField({
      name: 'faq',
      title: 'Track FAQ',
      type: 'array',
      group: 'content',
      of: [{ type: 'trackFaq' }],
    }),

    // Curriculum & tech
    defineField({
      name: 'curriculum',
      title: 'Curriculum phases',
      type: 'array',
      group: 'curriculum',
      of: [{ type: 'trackCurriculumPhase' }],
    }),
    defineField({
      name: 'techStack',
      title: 'Tech stack',
      type: 'array',
      group: 'curriculum',
      of: [{ type: 'trackTechStackItem' }],
    }),
    defineField({ name: 'skills', title: 'Skill tags', type: 'localeStringArray', group: 'curriculum' }),

    // Meta
    defineField({ name: 'duration', title: 'Duration', type: 'localeString', group: 'meta' }),
    defineField({ name: 'format', title: 'Format', type: 'localeString', group: 'meta' }),
    defineField({ name: 'nextCohort', title: 'Next cohort', type: 'localeString', group: 'meta' }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'string',
      group: 'meta',
      description: 'Human-readable deadline (e.g. "February 15, 2025")',
    }),
    defineField({
      name: 'spotsAvailable',
      title: 'Spots Available',
      type: 'number',
      group: 'meta',
      validation: rule => rule.min(0),
    }),
  ],
  preview: {
    select: { title: 'label.en', subtitle: 'trackId' },
  },
})
