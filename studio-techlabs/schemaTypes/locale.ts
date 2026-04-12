import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'de', title: 'German', type: 'string' }),
  ],
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text' }),
    defineField({ name: 'de', title: 'German', type: 'text' }),
  ],
})

export const localeStringArray = defineType({
  name: 'localeStringArray',
  title: 'Localized String Array',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'de',
      title: 'German',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
