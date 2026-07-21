import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cdt',
  title: 'CDT',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string', initialValue: 'CDT'}),
    defineField({
      name: 'promo',
      title: 'Texto promocional',
      type: 'text',
      rows: 3,
      description: 'Usa **texto** para poner una parte en negrita. Ej: ¿Te gustaría obtener **más rentabilidad** por tus ahorros? **Abre el CDT Pibank**',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'promo'}},
})
