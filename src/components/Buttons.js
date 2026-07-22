import { Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../theme';

// Botón amarillo relleno (Continuar)
export function PrimaryButton({ title, onPress, style }) {
  return (
    <Pressable style={({ pressed }) => [styles.primary, pressed && styles.pressed, style]} onPress={onPress}>
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

// Botón con borde navy (¿No eres cliente Pibank? / Mis transferencias)
export function OutlineButton({ title, onPress, style }) {
  return (
    <Pressable style={({ pressed }) => [styles.outline, pressed && styles.pressed, style]} onPress={onPress}>
      <Text style={styles.outlineText}>{title}</Text>
    </Pressable>
  );
}

// Botón outline dentro de las tarjetas amarillas (borde navy, fondo transparente)
export function CardPillButton({ title, onPress, style }) {
  return (
    <Pressable style={({ pressed }) => [styles.cardPill, pressed && styles.pressed, style]} onPress={onPress}>
      <Text style={styles.cardPillText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.yellow,
    borderRadius: radius.pill,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { fontFamily: fonts.bold, fontSize: 17, color: colors.navy },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.navy,
    borderRadius: radius.pill,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  outlineText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.navy },
  cardPill: {
    borderWidth: 1.5,
    borderColor: colors.navy,
    borderRadius: radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPillText: { fontFamily: fonts.bold, fontSize: 13, color: colors.navy },
  pressed: { opacity: 0.75 },
});
