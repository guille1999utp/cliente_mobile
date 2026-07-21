import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'account',
  title: 'Cuenta',
  type: 'document',
  fields: [
    defineField({name: 'holder', title: 'Titular', type: 'string'}),
    defineField({
      name: 'balance',
      title: 'Saldo (Inicio)',
      type: 'number',
      description: 'Saldo mostrado en la tarjeta de Inicio (ej: 40000)',
    }),
    defineField({
      name: 'detailBalance',
      title: 'Saldo (Detalle)',
      type: 'number',
      description: 'Saldo mostrado en la pantalla de Movimientos (ej: 39360)',
    }),
    defineField({name: 'number', title: 'N° corto de cuenta', type: 'string', description: 'Ej: 6250'}),
    defineField({name: 'masked', title: 'Últimos dígitos (enmascarado)', type: 'string', description: 'Ej: 6250'}),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {list: ['Activa', 'Inactiva', 'Bloqueada']},
      initialValue: 'Activa',
    }),
    defineField({name: 'fullNumber', title: 'N° completo de cuenta', type: 'string', description: 'Ej: 1085560568365'}),
  ],
  preview: {
    select: {title: 'holder', subtitle: 'fullNumber'},
    prepare: ({title, subtitle}) => ({title: title || 'Cuenta', subtitle}),
  },
})
