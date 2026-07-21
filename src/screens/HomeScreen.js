import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, fonts, radius } from '../theme';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { CardPillButton } from '../components/Buttons';
import { useSanity, queries, formatMoney } from '../sanity';

export default function HomeScreen({ navigation }) {
  const { data: account, loading, reload } = useSanity(queries.account);
  const { data: cdt } = useSanity(queries.cdt);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header variant="home" onMenu={() => navigation.navigate('Menu')} onMail={() => {}} />

      <View style={styles.lastBar}>
        <Text style={styles.lastText}>Última conexión: 05:14:18 09/02/2023</Text>
      </View>

      {loading ? (
        <View style={styles.loader}><ActivityIndicator color={colors.navy} /></View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} onScrollEndDrag={reload}>
          {/* Tarjeta Cuenta */}
          <View style={styles.card}>
            <View style={styles.cardHead}>
              <Ionicons name="wallet-outline" size={26} color={colors.navy} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Cuenta</Text>
            </View>
            <View style={styles.divider} />

            <Text style={styles.saldoLabel}>Saldo</Text>
            <Text style={styles.saldo}>{formatMoney(account?.balance ?? 0)}</Text>
            <Text style={styles.accName}>Cuenta pibank ...{account?.masked ?? '----'}</Text>
            <Text style={styles.estado}>
              Estado: <Text style={styles.estadoBold}>{account?.status ?? 'Activa'}</Text>
            </Text>
            <View style={styles.numRow}>
              <Text style={styles.numText}>{account?.fullNumber ?? ''}</Text>
              <View style={styles.shareCircle}>
                <Feather name="share-2" size={12} color={colors.navy} />
              </View>
            </View>

            <View style={[styles.divider, { marginTop: 10 }]} />
            <View style={styles.cardBtnWrap}>
              <CardPillButton title="Quiero una cuenta" style={{ width: 250, paddingVertical: 14,paddingHorizontal: 40 }} onPress={() => {}} />
            </View>
          </View>

          {/* Tarjeta CDT */}
          <View style={[styles.card, { marginTop: 26 }]}>
            <View style={styles.cardHead}>
              <Feather name="box" size={24} color={colors.navy} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>CDT</Text>
            </View>
            <View style={styles.divider} />

            <Text style={styles.promo}>
              {renderPromo(cdt?.promo)}
            </Text>

            <View style={styles.divider} />
            <View style={styles.cardBtnWrap}>
              <CardPillButton title="Quiero otro CDT" style={{width: 250}} onPress={() => {}} />
            </View>
          </View>
        </ScrollView>
      )}

      <BottomTabBar navigation={navigation} />
    </SafeAreaView>
  );
}

// Convierte "**negrita**" en Text en negrita dentro del promo del CDT
function renderPromo(promo) {
  const text =
    promo ||
    '¿Te gustaría obtener **más rentabilidad** por tus ahorros? **Abre el CDT Pibank**';
  return text.split('**').map((seg, i) =>
    i % 2 === 1 ? (
      <Text key={i} style={{ fontFamily: fonts.bold }}>{seg}</Text>
    ) : (
      <Text key={i}>{seg}</Text>
    )
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  lastBar: { backgroundColor: colors.bar, paddingVertical: 5, paddingHorizontal: 20 },
  lastText: { fontFamily: fonts.regular, fontSize: 14, color: colors.grayText, letterSpacing: -0.5 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingBottom: 30 },
  card: { backgroundColor: colors.yellow, borderRadius: radius.card, paddingVertical: 15, paddingHorizontal: 20 },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  cardIcon: { position: 'absolute', left: 0 },
  cardTitle: { fontFamily: fonts.regular, fontSize: 17, color: colors.navy },
  divider: { height: 1, backgroundColor: 'rgba(246, 247, 250, 0.98)' },
  saldoLabel: { fontFamily: fonts.bold, fontSize: 15, color: colors.navy, textAlign: 'center', marginTop: 16 },
  saldo: { fontFamily: fonts.bold, fontSize: 28,marginBottom: 0, color: colors.navy, textAlign: 'center', marginTop: 6, letterSpacing: -2 },
  accName: { fontFamily: fonts.regular, fontSize: 20, color: colors.navy, textAlign: 'center', marginTop: 0 },
  estado: { fontFamily: fonts.regular, fontSize: 14, color: colors.navy, textAlign: 'center', marginTop: 8 },
  estadoBold: { fontFamily: fonts.bold },
  numRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  numText: { fontFamily: fonts.regular, fontSize: 16, color: colors.navy },
  shareCircle: {
    marginLeft: 8, width: 20, height: 20, borderRadius: 10,
    borderWidth: 1, borderColor: colors.navy, alignItems: 'center', justifyContent: 'center',
  },
  cardBtnWrap: { alignItems: 'center', marginTop: 15 },
  promo: { fontFamily: fonts.regular, fontSize: 18, color: colors.navy, textAlign: 'center', lineHeight: 26, marginVertical: 15 },
});
