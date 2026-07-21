import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import BottomTabBar from '../components/BottomTabBar';
import TransferIcon from '../components/TransferIcon';

// Ítems del menú (labels fijos en código, según el diseño)
const ITEMS = [
  { key: 'Inicio', title: 'Inicio', desc: 'Todos tus productos de un vistazo', icon: (c) => <Feather name="home" size={26} color={c} />, route: 'Inicio' },
  { key: 'area', title: 'Área personal', desc: 'Datos personales y ajustes', icon: (c) => <Feather name="user" size={26} color={c} />, route: 'AreaPersonal' },
  { key: 'cuentas', title: 'Cuentas', desc: 'Detalle, alias, certificados, domiciliaciones y movimientos programados', icon: (c) => <Ionicons name="wallet-outline" size={26} color={c} />, route: 'CuentaDetalle' },
  { key: 'seg', title: 'Ajustes de seguridad', desc: 'Configurar limites y bloqueos', icon: (c) => <Feather name="shield" size={26} color={c} />, route: null },
  { key: 'cdt', title: 'CDT', desc: 'Detalle y renovación de tus CDTs', icon: (c) => <Ionicons name="cash-outline" size={26} color={c} />, route: null },
  { key: 'credito', title: 'Crédito libre inversión', desc: 'Información sobre tus préstamos', icon: (c) => <Feather name="credit-card" size={26} color={c} />, route: null },
  { key: 'trans', title: 'Transferencias', desc: 'Realizar transferencias y traspasos', icon: (c) => <TransferIcon size={26} color={c} />, route: 'Transferencias' },
  { key: 'mov', title: 'Movimientos', desc: 'Listado y búsqueda de movimientos', icon: (c) => <Feather name="file-text" size={26} color={c} />, route: 'CuentaDetalle' },
  { key: 'ayuda', title: 'Ayuda', desc: 'Ayuda con tus productos y operativas', icon: (c) => <Feather name="message-square" size={26} color={c} />, route: 'Ayuda' },
  { key: 'solicitar', title: 'Solicitar', desc: 'Todos los productos Pibank', icon: (c) => <Feather name="edit-2" size={26} color={c} />, route: null },
  { key: 'faq', title: 'Preguntas Frecuentes', desc: 'Más información sobre Pibank y sus productos', icon: (c) => <Feather name="help-circle" size={26} color={c} />, route: null },
];

export default function MenuScreen({ navigation }) {
  const open = (route) => () => {
    if (!route) return;
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.closeRow}>
        <Pressable hitSlop={12} onPress={() => navigation.goBack()}>
          <Feather name="x" size={30} color={colors.navy} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        {ITEMS.map((it) => (
          <Pressable key={it.key} style={styles.row} onPress={open(it.route)}>
            <View style={styles.iconWrap}>{it.icon(colors.navy)}</View>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{it.title}</Text>
              <Text style={styles.desc}>{it.desc}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <BottomTabBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  closeRow: { alignItems: 'flex-end', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  row: {
    flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 16, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: colors.grayLine,
  },
  iconWrap: { width: 44, paddingTop: 2 },
  textWrap: { flex: 1 },
  title: { fontFamily: fonts.semibold, fontSize: 18, color: colors.navy },
  desc: { fontFamily: fonts.regular, fontSize: 15, color: colors.grayText, marginTop: 2, lineHeight: 21 },
});
