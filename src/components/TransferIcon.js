import Svg, { Line, Polyline } from 'react-native-svg';
import { colors } from '../theme';

// Ícono de transferencias: flecha → arriba, flecha ← abajo
export default function TransferIcon({ size = 26, color = colors.navy }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* flecha superior hacia la derecha */}
      <Line x1="3" y1="8" x2="20" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Polyline points="16,4 20,8 16,12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* flecha inferior hacia la izquierda */}
      <Line x1="4" y1="16" x2="21" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Polyline points="8,12 4,16 8,20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
