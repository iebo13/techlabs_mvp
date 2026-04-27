import { defineType, defineField } from 'sanity'

export const partnerImpactMetric = defineType({
  name: 'partnerImpactMetric',
  title: 'Partner Impact Metric',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The metric value (e.g. "4,000+", "16", "4.6/5")',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
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
    select: { title: 'value', subtitle: 'label.en' },
  },
})
