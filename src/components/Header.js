import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Mail } from 'lucide-react-native';
import { colors, fonts } from '../theme';
import Logo from './Logo';

// Header reutilizable.
// variant="home"  -> Logo + sobre + hamburguesa
// variant="title" -> flecha atrás + título centrado + hamburguesa
export default function Header({ variant = 'title', title, onBack, onMenu, onMail, mailBadge }) {
  return (
    <View style={styles.container}>
      {variant === 'home' ? (
        <>
          <Logo size={26} circle={17} />
          <View style={styles.rightRow}>
            <Pressable hitSlop={10} onPress={onMail} style={styles.iconBtn}>
              <Mail size={26} color={colors.navy} strokeWidth={1.8} />
              {mailBadge != null && (
                <View style={styles.mailBadge}>
                  <Text style={styles.mailBadgeText}>{mailBadge}</Text>
                </View>
              )}
            </Pressable>
            <Pressable hitSlop={10} onPress={onMenu} style={styles.iconBtn}>
              <Feather name="menu" size={28} color={colors.navy} />
            </Pressable>
          </View>
        </>
      ) : (
        <>
          {onBack ? (
            <Pressable hitSlop={12} onPress={onBack} style={styles.side}>
              <Feather name="arrow-left" size={26} color={colors.navy} />
            </Pressable>
          ) : (
            <View style={styles.side} />
          )}
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
  mailBadge: {
    position: 'absolute', top: -6, right: -8, minWidth: 18, height: 18, borderRadius: 9,
    backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  mailBadgeText: { fontFamily: fonts.bold, fontSize: 11, color: colors.white },
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
