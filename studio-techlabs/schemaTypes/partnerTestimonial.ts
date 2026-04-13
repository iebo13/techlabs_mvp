import { defineType, defineField } from 'sanity'

export const partnerTestimonial = defineType({
  name: 'partnerTestimonial',
  title: 'Partner Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localeText',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Person Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company' },
  },
})
