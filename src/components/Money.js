import { Text } from 'react-native';
import { formatMoney } from '../sanity';

// Muestra un monto con la parte entera grande y los centavos más pequeños.
// Ej: 653.336,59  ->  "653.336" grande + ",59" chico
export default function Money({ value, style, centsStyle, prefix }) {
  const [intPart, dec = '00'] = formatMoney(value).split(',');
  return (
    <Text style={style} numberOfLines={1}>
      {prefix}
      {intPart}
      <Text style={centsStyle}>,{dec}</Text>
    </Text>
  );
}
