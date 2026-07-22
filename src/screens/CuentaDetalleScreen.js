import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import {
  ArrowRight,
  RotateCw,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import { colors, fonts, radius } from '../theme';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { useSanity, queries, formatMoney } from '../sanity';

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
        <View style={styles.yellowWrap}>
          <ChevronLeft size={26} color={colors.navy} style={styles.arrowLeft} />
          <ChevronRight size={26} color={colors.navy} style={styles.arrowRight} />

          <View style={styles.yellow}>
            <Text style={styles.tienes}>Tienes en tu {account?.type ?? 'Uni'}</Text>
            <Text style={styles.disponible}>
              Disponible:{' '}
              <Text style={styles.disponibleAmt}>{formatMoney(account?.detailBalance ?? account?.balance ?? 0)}</Text>
            </Text>

            <View style={styles.numRow}>
              <Text style={styles.numText}>{account?.fullNumber ?? ''}</Text>
              <View style={styles.shareCircle}>
                <Feather name="share-2" size={12} color={colors.navy} />
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
          <ActivityIndicator color={colors.navy} style={{ marginTop: 30 }} />
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
                  <Icon size={18} color={colors.navy} strokeWidth={1.8} />
                </View>
                <View style={styles.midCol}>
                  <Text style={styles.category}>{m.category}</Text>
                  <Text style={styles.description}>{m.description}</Text>
                </View>
                <View style={styles.amountCol}>
                  {m.positive ? (
                    <View style={styles.positiveBox}>
                      <Text style={styles.amountPos}>+ {formatMoney(m.amount)}</Text>
                    </View>
                  ) : (
                    <Text style={styles.amountNeg}>- {formatMoney(m.amount)}</Text>
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
  yellowWrap: { position: 'relative', justifyContent: 'center' },
  arrowLeft: { position: 'absolute', left: 4, zIndex: 2 },
  arrowRight: { position: 'absolute', right: 4, zIndex: 2 },
  yellow: {
    backgroundColor: colors.yellow, paddingVertical: 26, paddingHorizontal: 30,
    alignItems: 'center', marginHorizontal: 20, borderRadius: radius.card,
  },
  tienes: { fontFamily: fonts.medium, fontSize: 18, color: colors.navy, textAlign: 'center', letterSpacing: 0.1 },
  disponible: { fontFamily: fonts.regular, fontSize: 16, color: colors.navy, marginTop: 4, textAlign: 'center' },
  disponibleAmt: { fontFamily: fonts.bold, fontSize: 26, color: colors.navy, letterSpacing: -1 },
  numRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  numText: { fontFamily: fonts.regular, fontSize: 16, color: colors.navy },
  shareCircle: {
    marginLeft: 8, width: 20, height: 20, borderRadius: 10,
    borderWidth: 1, borderColor: colors.navy, alignItems: 'center', justifyContent: 'center',
  },
  estado: { fontFamily: fonts.regular, fontSize: 17, color: colors.navy, marginTop: 6 },
  estadoBold: { fontFamily: fonts.bold },
  pills: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 14 },
  pill: {
    minWidth: 90,
    borderWidth: 1.7, borderColor: colors.navy, borderRadius: radius.pill,
    paddingVertical: 6, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center',
  },
  pillText: { fontFamily: fonts.bold, fontSize: 11, color: colors.navy },
  sectionRow: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    marginTop: 24, marginBottom: 8, marginHorizontal: 20,
  },
  sectionTitle: { fontFamily: fonts.semibold, fontSize: 17, color: colors.navy, letterSpacing: -0.5, flex: 1 },
  limits: { alignItems: 'flex-end', paddingTop: 2 },
  limitText: { fontFamily: fonts.regular, fontSize: 13, color: colors.grayText },
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.grayLine,
  },
  dateCol: { width: 58 },
  dateTop: { fontFamily: fonts.semibold, fontSize: 14, color: colors.navy },
  dateBottom: { fontFamily: fonts.regular, fontSize: 14, color: colors.navy },
  iconCircle: {
    width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: colors.navy,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  midCol: { flex: 1, paddingRight: 8 },
  category: { fontFamily: fonts.semibold, fontSize: 16, color: colors.navy },
  description: { fontFamily: fonts.regular, fontSize: 14, color: colors.grayText, marginTop: 2 },
  amountCol: { alignItems: 'flex-end' },
  amountNeg: { fontFamily: fonts.semibold, fontSize: 16, color: colors.navy },
  positiveBox: { backgroundColor: colors.positiveBg, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  amountPos: { fontFamily: fonts.bold, fontSize: 16, color: colors.navy },
  balanceBottom: { fontFamily: fonts.regular, fontSize: 13, color: colors.grayText, marginTop: 4 },
});
