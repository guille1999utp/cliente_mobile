import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Área personal',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Ítems',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Título', type: 'string'}),
            defineField({name: 'description', title: 'Descripción', type: 'string'}),
            defineField({
              name: 'icon',
              title: 'Ícono',
              type: 'string',
              options: {list: ['user', 'wallet', 'bell', 'smartphone', 'lock']},
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'description'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Área personal'})},
})
