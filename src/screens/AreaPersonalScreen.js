import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import Header from '../components/Header';
import { useSanity, queries } from '../sanity';

// Mapea el nombre de icono guardado en Sanity a un icono Feather
const ICONS = {
  user: 'user',
  wallet: 'credit-card',
  bell: 'bell',
  smartphone: 'smartphone',
  lock: 'lock',
};

// Fallback por si el perfil aún no tiene datos en Sanity
const DEFAULT_ITEMS = [
  { label: 'Datos personales', description: 'Revisa y modifica tu información personal', icon: 'user' },
  { label: 'Datos financieros', description: 'Actualiza tu información financiera', icon: 'wallet' },
  { label: 'Gestión de alertas', description: 'Configira las alertas que deseas recibir', icon: 'bell' },
  { label: 'Dsipositivos vinculados', description: 'Gestiona tus dispositivos', icon: 'smartphone' },
  { label: 'Contraseña', description: 'Modifica tu contraseña', icon: 'lock' },
];

export default function AreaPersonalScreen({ navigation }) {
  const { data: profile, loading } = useSanity(queries.profile);
  const items = profile?.items?.length ? profile.items : DEFAULT_ITEMS;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header
        variant="title"
        title="Área personal"
        onBack={() => navigation.goBack()}
        onMenu={() => navigation.navigate('Menu')}
      />

      {loading ? (
        <ActivityIndicator color={colors.navy} style={{ marginTop: 30 }} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingTop: 8 }}>
          {items.map((it, i) => (
            <Pressable key={i} style={styles.row} onPress={() => {}}>
              <View style={styles.iconWrap}>
                <Feather name={ICONS[it.icon] || 'chevron-right'} size={26} color={colors.navy} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.title}>{it.label}</Text>
                <Text style={styles.desc}>{it.description}</Text>
              </View>
              <Feather name="chevron-right" size={26} color={colors.navy} />
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: colors.grayLine,
  },
  iconWrap: { width: 46 },
  textWrap: { flex: 1, paddingRight: 8 },
  title: { fontFamily: fonts.semibold, fontSize: 20, color: colors.navy },
  desc: { fontFamily: fonts.regular, fontSize: 15, color: colors.navy, marginTop: 2 },
});
