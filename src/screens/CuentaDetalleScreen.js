import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import {
  ArrowRight,
  RotateCw,
  Receipt,
  ChevronRight,
  Plus,
} from 'lucide-react-native';
import { colors, fonts, radius } from '../theme';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { useSanity, queries, formatMoney } from '../sanity';
import Money from '../components/Money';

// Elige el ícono del movimiento: usa m.icon de Sanity o lo deduce por categoría/signo
function movementIcon(m) {
  let key = m.icon;
  if (!key) {
    const cat = (m.category || '').toLowerCase();
    if (cat.includes('interes')) key = 'interest';
    else if (cat.includes('impuesto')) key = 'tax';
    else key = m.positive ? 'received' : 'emitted';
  }
  const map = { received: ArrowRight, emitted: ArrowRight, interest: RotateCw, tax: Receipt };
  return map[key] || ArrowRight;
}

export default function CuentaDetalleScreen({ navigation }) {
  const { data: account } = useSanity(queries.account);
  const { data: movements, loading } = useSanity(queries.movements);

  const monthly = `${account?.limitMonthlyUsed ?? 0} de ${account?.limitMonthly ?? 20} mensuales`;
  const daily = `${account?.limitDailyUsed ?? 0} de ${account?.limitDaily ?? 20} diarias`;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header
        variant="title"
        title="Movimientos"
        onBack={() => navigation.goBack()}
        onMenu={() => navigation.navigate('Menu')}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Sección amarilla con flechas de carrusel */}
        <View style={styles.carousel}>
          <View style={styles.sideBoxLeft}>
            <Plus size={24} color={'rgba(0, 40, 74, 1)'} strokeWidth={1.5} />
          </View>
          <View style={styles.yellow}>
            <Text style={styles.tienes}>Tienes en tu {account?.type ?? 'Uni'}</Text>
            <Text style={styles.disponible}>
              Disponible:{' '}
              <Money value={account?.detailBalance ?? account?.balance ?? 0} style={styles.disponibleAmt} centsStyle={styles.disponibleCents} />
            </Text>

            <View style={styles.numRow}>
              <Text style={styles.numText}>{account?.fullNumber ?? ''}</Text>
              <View style={styles.shareCircle}>
                <Feather name="share-2" size={12} color={'rgba(0, 40, 74, 1)'} />
              </View>
            </View>
            <Text style={styles.estado}>
              Estado: <Text style={styles.estadoBold}>{account?.status ?? 'Activa'}</Text>
            </Text>

            <View style={styles.pills}>
              {['XLS', 'PDF', 'CERTIFICADO'].map((p) => (
                <View key={p} style={styles.pill}>
                  <Text style={styles.pillText} numberOfLines={1}>{p}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sideBoxRight}>
            <ChevronRight size={28} color={'rgba(0, 40, 74, 1)'} strokeWidth={1.5} />
          </View>
        </View>

        {/* Título + contador de límites */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>ÚLTIMOS MOVIMIENTOS</Text>
          <View style={styles.limits}>
            <Text style={styles.limitText}>{monthly}</Text>
            <Text style={styles.limitText}>{daily}</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color={'rgba(0, 40, 74, 1)'} style={{ marginTop: 30 }} />
        ) : (
          (movements ?? []).map((m) => {
            const Icon = movementIcon(m);
            return (
              <View key={m._id} style={styles.row}>
                <View style={styles.dateCol}>
                  <Text style={styles.dateTop}>{m.day} {m.month}</Text>
                  <Text style={styles.dateBottom}>{m.year}</Text>
                </View>
                <View style={styles.iconCircle}>
                  <Icon size={18} color={'rgba(0, 40, 74, 1)'} strokeWidth={1.3} />
                </View>
                <View style={styles.midCol}>
                  <Text style={styles.category}>{m.category}</Text>
                  <Text style={styles.description}>{m.description}</Text>
                </View>
                <View style={styles.amountCol}>
                  {m.positive ? (
                    <View style={styles.positiveBox}>
                      <Money prefix="+ " value={m.amount} style={styles.amountPos} centsStyle={styles.amountCents} />
                    </View>
                  ) : (
                    <Money prefix="- " value={m.amount} style={styles.amountNeg} centsStyle={styles.amountCents} />
                  )}
                  <Text style={styles.balanceBottom}>{formatMoney(m.balance ?? 0)}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <BottomTabBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  carousel: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 0,
    backgroundColor: '#FEEA00'
   },
  sideBoxLeft: {
    backgroundColor: 'white', width: 25, height: 190,
    borderTopRightRadius: 5, borderBottomRightRadius: 5,
    alignItems: 'center', justifyContent: 'center',
  },
  sideBoxRight: {
    backgroundColor: 'white', width: 25, height: 190,
    borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
    alignItems: 'center', justifyContent: 'center',
  },
  yellow: {
    flex: 1,
    backgroundColor: '#FEEA00', paddingVertical: 10, paddingHorizontal: 20,
    alignItems: 'center', marginHorizontal: 4, borderRadius: radius.card,
  },
  tienes: { marginTop:30,fontFamily: fonts.medium, fontSize: 10, color: 'rgba(0, 40, 74, 1)', textAlign: 'center', letterSpacing: 0.1 },
  disponible: { fontFamily: fonts.bold, fontSize: 14, color: 'rgba(0, 40, 74, 1)', marginTop: 4, textAlign: 'center' },
  disponibleAmt: { fontFamily: fonts.semibold, fontSize: 24, color: 'rgba(0, 40, 74, 1)', letterSpacing: -1 },
  disponibleCents: { fontSize: 14 },
  numRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  numText: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(0, 40, 74, 1)' },
  shareCircle: {
    marginLeft: 8, width: 20, height: 20, borderRadius: 10,
    borderWidth: 1, borderColor: 'rgba(0, 40, 74, 1)', alignItems: 'center', justifyContent: 'center',
  },
  estado: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(0, 40, 74, 1)', marginTop: 6 },
  estadoBold: { fontFamily: fonts.semibold, fontSize:12, letterSpacing:-0.7 },
  pills: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, gap: 14 },
  pill: {
    minWidth: 90,
    borderWidth: 1.4, borderColor: 'rgba(0, 40, 74, 1)', borderRadius: radius.pill,
    paddingVertical: 6, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center',
  },
  pillText: { fontFamily: fonts.medium, fontSize: 10, color: 'rgba(0, 40, 74, 1)' },
  sectionRow: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    marginTop: 24, marginBottom: 8, marginHorizontal: 20,
  },
  sectionTitle: { fontFamily: fonts.semibold, fontSize: 12, color: 'rgba(0, 40, 74, 1)', letterSpacing: -0.7, flex: 1 },
  limits: { alignItems: 'flex-end', paddingTop: 2 },
  limitText: { fontFamily: fonts.regular, fontSize: 10, color: 'rgba(0, 40, 74, 1)'},
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.grayLine,
  },
  dateCol: { width: 58 },
  dateTop: { fontFamily: fonts.medium, fontSize: 10, color: 'rgba(0, 40, 74, 1)' },
  dateBottom: { fontFamily: fonts.regular, fontSize: 8, color: 'rgba(0, 40, 74, 1)', left:6 },
  iconCircle: {
    width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: 'rgba(0, 40, 74, 1)',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  midCol: { flex: 1, paddingRight: 8 },
  category: { fontFamily: fonts.semibold, fontSize: 14, color: 'rgba(0, 40, 74, 1)', letterSpacing: -0.5 },
  description: { fontFamily: fonts.regular, fontSize: 10, color: 'rgba(0, 40, 74, 1)' },
  amountCol: { alignItems: 'flex-end' },
  amountNeg: { fontFamily: fonts.semibold, fontSize: 16, color: 'rgba(0, 40, 74, 1)', includeFontPadding: false },
  amountCents: { fontSize: 11 },
  positiveBox: { backgroundColor: colors.positiveBg, borderRadius: 4, paddingHorizontal: 6},
  amountPos: { fontFamily: fonts.bold, fontSize: 16, color: 'rgba(0, 40, 74, 1)', includeFontPadding: false },
  balanceBottom: { fontFamily: fonts.regular, fontSize: 10, color: 'rgba(0, 40, 74, 1)', includeFontPadding: false, marginTop: 1 },
});
