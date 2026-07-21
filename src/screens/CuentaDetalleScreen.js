import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radius } from '../theme';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { useSanity, queries, formatMoney } from '../sanity';

export default function CuentaDetalleScreen({ navigation }) {
  const { data: account } = useSanity(queries.account);
  const { data: movements, loading } = useSanity(queries.movements);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header
        variant="title"
        title={`Cuenta N. ${account?.number ?? '6250'}`}
        onBack={() => navigation.goBack()}
        onMenu={() => navigation.navigate('Menu')}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Sección amarilla */}
        <View style={styles.yellow}>
          <Text style={styles.tienes}>Tienes en tu Cuenta Pibank</Text>
          <Text style={styles.balance}>{formatMoney(account?.detailBalance ?? account?.balance ?? 0)}</Text>
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

        {/* Movimientos */}
        <Text style={styles.sectionTitle}>ÚLTIMOS MOVIMIENTOS</Text>

        {loading ? (
          <ActivityIndicator color={colors.navy} style={{ marginTop: 30 }} />
        ) : (
          (movements ?? []).map((m) => (
            <View key={m._id} style={styles.row}>
              <View style={styles.dateCol}>
                <Text style={styles.dateTop}>{m.day} {m.month}</Text>
                <Text style={styles.dateBottom}>{m.year}</Text>
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
          ))
        )}
      </ScrollView>

      <BottomTabBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white},
  yellow: { backgroundColor: colors.yellow, paddingVertical: 40, paddingHorizontal: 20, alignItems: 'center' },
  tienes: { fontFamily: fonts.medium, fontSize: 20, color: colors.navy, textAlign: 'center', letterSpacing: 0.1},
  balance: { fontFamily: fonts.bold, fontSize: 34, color: colors.navy, marginTop: 4, letterSpacing: -2 },
  numRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  numText: { fontFamily: fonts.regular, fontSize: 17, color: colors.navy },
  shareCircle: {
    marginLeft: 8, width: 20, height: 20, borderRadius: 10,
    borderWidth: 1, borderColor: colors.navy, alignItems: 'center', justifyContent: 'center',
  },
  estado: { fontFamily: fonts.regular, fontSize: 18, color: colors.navy, marginTop: 4 },
  estadoBold: { fontFamily: fonts.bold },
  pills: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 22, gap: 18 },
  pill: {
    minWidth: 90,
    borderWidth: 1.7, borderColor: colors.navy, borderRadius: radius.pill,
    paddingVertical: 3, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center'
  },
  pillText: { fontFamily: fonts.bold, fontSize:10, color: colors.navy },
  sectionTitle: {
    fontFamily: fonts.semibold, fontSize: 18, color: colors.navy,
    letterSpacing: -1, marginTop: 26, marginBottom: 8, marginHorizontal: 20,

  },
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 16,
    paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.grayLine,
  },
  dateCol: { width: 78 },
  dateTop: { fontFamily: fonts.semibold, fontSize: 15, color: colors.navy },
  dateBottom: { fontFamily: fonts.regular, fontSize: 15, color: colors.navy },
  midCol: { flex: 1, paddingHorizontal: 8 },
  category: { fontFamily: fonts.semibold, fontSize: 16, color: colors.navy },
  description: { fontFamily: fonts.regular, fontSize: 15, color: colors.navy, marginTop: 2 },
  amountCol: { alignItems: 'flex-end' },
  amountNeg: { fontFamily: fonts.semibold, fontSize: 16, color: colors.navy },
  positiveBox: { backgroundColor: colors.positiveBg, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  amountPos: { fontFamily: fonts.bold, fontSize: 16, color: colors.navy },
  balanceBottom: { fontFamily: fonts.regular, fontSize: 14, color: colors.navy, marginTop: 4 },
});
