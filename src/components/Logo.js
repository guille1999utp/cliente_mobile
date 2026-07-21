import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

// Logotipo "pibank ●" — texto navy + círculo amarillo, como en el diseño
export default function Logo({ size = 34, circle = 22 }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.word, { fontSize: size }]}>pibank</Text>
      <View
        style={{
          width: circle,
          height: circle,
          borderRadius: circle / 2,
          backgroundColor: colors.yellowLogo,
          marginLeft: size * 0.28,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  word: {
    fontFamily: fonts.bold,
    color: colors.navy,
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
});
