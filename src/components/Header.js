import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import Logo from './Logo';

// Header reutilizable.
// variant="home"  -> Logo + sobre + hamburguesa
// variant="title" -> flecha atrás + título centrado + hamburguesa
export default function Header({ variant = 'title', title, onBack, onMenu, onMail }) {
  return (
    <View style={styles.container}>
      {variant === 'home' ? (
        <>
          <Logo size={26} circle={17} />
          <View style={styles.rightRow}>
            <Pressable hitSlop={10} onPress={onMail} style={styles.iconBtn}>
              <MaterialCommunityIcons name="email-outline" size={27} color={colors.navy} />
            </Pressable>
            <Pressable hitSlop={10} onPress={onMenu} style={styles.iconBtn}>
              <Feather name="menu" size={28} color={colors.navy} />
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Pressable hitSlop={12} onPress={onBack} style={styles.side}>
            <Feather name="arrow-left" size={26} color={colors.navy} />
          </Pressable>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Pressable hitSlop={12} onPress={onMenu} style={[styles.side, styles.sideRight]}>
            <Feather name="menu" size={28} color={colors.navy} />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  rightRow: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 22 },
  side: { width: 40, alignItems: 'flex-start', justifyContent: 'center' },
  sideRight: { alignItems: 'flex-end' },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.semibold,
    fontSize: 22,
    color: colors.navy,
  },
});
