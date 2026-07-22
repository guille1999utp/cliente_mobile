import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mailbox',
  title: 'Buzón virtual',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Opciones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Título', type: 'string'}),
            defineField({
              name: 'icon',
              title: 'Ícono',
              type: 'string',
              options: {
                list: [
                  {title: 'Mis solicitudes (burbujas)', value: 'solicitudes'},
                  {title: 'Correspondencia (sobre)', value: 'correspondencia'},
                  {title: 'Notificaciones (mensaje)', value: 'notificaciones'},
                  {title: 'Contrato (documento)', value: 'contrato'},
                  {title: 'Certificados (documento con líneas)', value: 'certificados'},
                  {title: 'Extractos (documento)', value: 'extractos'},
                ],
              },
            }),
            defineField({
              name: 'badge',
              title: 'Contador (badge)',
              type: 'number',
              description: 'Número gris a la derecha (ej: 1). Dejar vacío para no mostrarlo.',
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'icon'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Buzón virtual'})},
})
