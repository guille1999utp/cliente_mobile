import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'movement',
  title: 'Movimiento',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Orden', type: 'number', description: 'Menor = arriba en la lista'}),
    defineField({name: 'day', title: 'Día', type: 'string', description: 'Ej: 29'}),
    defineField({name: 'month', title: 'Mes', type: 'string', description: 'Ej: DIC'}),
    defineField({name: 'year', title: 'Año', type: 'string', description: 'Ej: 2023'}),
    defineField({name: 'category', title: 'Categoría', type: 'string', description: 'Ej: Impuestos'}),
    defineField({name: 'description', title: 'Descripción', type: 'string', description: 'Ej: Retefuente'}),
    defineField({name: 'amount', title: 'Monto', type: 'number', description: 'Valor absoluto, ej: 160'}),
    defineField({name: 'balance', title: 'Saldo resultante', type: 'number', description: 'Segunda línea, ej: 0 o 165000'}),
    defineField({name: 'positive', title: '¿Es positivo (+)?', type: 'boolean', initialValue: false}),
    defineField({
      name: 'icon',
      title: 'Ícono',
      type: 'string',
      description: 'Ícono en círculo a la izquierda del movimiento',
      options: {
        list: [
          {title: 'Transferencia recibida (flecha →)', value: 'received'},
          {title: 'Transferencia emitida (flecha →)', value: 'emitted'},
          {title: 'Intereses (giro)', value: 'interest'},
          {title: 'Impuestos (recibo)', value: 'tax'},
        ],
      },
    }),
  ],
  orderings: [{title: 'Orden', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'category', subtitle: 'description', amount: 'amount'},
    prepare: ({title, subtitle, amount}) => ({title: `${title} (${amount})`, subtitle}),
  },
})
