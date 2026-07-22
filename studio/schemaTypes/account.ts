import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'account',
  title: 'Cuenta',
  type: 'document',
  fields: [
    defineField({name: 'holder', title: 'Titular', type: 'string', description: 'Nombre para el saludo (ej: Alison)'}),
    defineField({name: 'type', title: 'Tipo de cuenta', type: 'string', description: 'Ej: Uni, Cuenta Pibank', initialValue: 'Cuenta Pibank'}),
    defineField({
      name: 'totalBalance',
      title: 'Total en Pibank (Inicio, arriba)',
      type: 'number',
      description: 'Monto grande "Tienes en Pibank" (suma de productos). Ej: 653336.59',
    }),
    defineField({
      name: 'balance',
      title: 'Saldo tarjeta Cuenta (Inicio)',
      type: 'number',
      description: 'Saldo dentro de la tarjeta Cuenta en Inicio (ej: 553336.59)',
    }),
    defineField({
      name: 'detailBalance',
      title: 'Disponible (Movimientos)',
      type: 'number',
      description: 'Monto "Disponible" en la pantalla de Movimientos (ej: 2653336.59)',
    }),
    defineField({name: 'limitDaily', title: 'Límite diario (transacciones)', type: 'number', initialValue: 20}),
    defineField({name: 'limitDailyUsed', title: 'Usadas hoy', type: 'number', initialValue: 0}),
    defineField({name: 'limitMonthly', title: 'Límite mensual (transacciones)', type: 'number', initialValue: 20}),
    defineField({name: 'limitMonthlyUsed', title: 'Usadas este mes', type: 'number', initialValue: 0}),
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
