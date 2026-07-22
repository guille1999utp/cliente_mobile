import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet, PiggyBank, ChevronDown } from 'lucide-react-native';
import { colors, fonts, radius } from '../theme';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { CardPillButton } from '../components/Buttons';
import { useSanity, queries } from '../sanity';
import Money from '../components/Money';

export default function HomeScreen({ navigation }) {
  const { data: account, loading, reload } = useSanity(queries.account);
  const { data: cdt } = useSanity(queries.cdt);

  const total = account?.totalBalance ?? account?.balance ?? 0;
  const cardBalance = account?.balance ?? 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header
        variant="home"
        mailBadge={1}
        onMenu={() => navigation.navigate('Menu')}
        onMail={() => navigation.navigate('Buzon')}
      />

      <View style={styles.lastBar}>
        <Text style={styles.lastText}>Última conexión: {account?.lastConnection ?? '05:14:18 09/02/2023'}</Text>
      </View>

      {loading ? (
        <View style={styles.loader}><ActivityIndicator color={'rgba(0, 40, 74, 1)'} /></View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} onScrollEndDrag={reload}>
          {/* Total en Pibank */}
          <Text style={styles.totalLabel}>Tienes en Pibank</Text>
          <Money value={total} style={styles.totalValue} centsStyle={styles.totalCents} />

          {/* Tarjeta Cuenta */}
          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHead}>
              <Wallet size={26} color={'rgba(0, 40, 74, 1)'} strokeWidth={1.3} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Cuenta</Text>
              <ChevronDown size={24} color={'rgba(0, 40, 74, 1)'} strokeWidth={1.3} style={styles.cardChevron} />
            </View>
            <View style={styles.divider} />

            <Money value={cardBalance} style={styles.cardBalance} centsStyle={styles.cardCents} />

            <View style={styles.divider} />
            <View style={styles.cardBtnWrap}>
              <CardPillButton title="Quiero una Cuenta" style={{ width: 250, paddingVertical:10 }} onPress={() => {}} />
            </View>
          </View>

          {/* Tarjeta CDT */}
          <View style={[styles.card, { marginTop: 26 }]}>
            <View style={styles.cardHead}>
              <PiggyBank size={26} color={'rgba(0, 40, 74, 1)'} strokeWidth={1.3} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>CDT</Text>
            </View>
            <View style={styles.divider} />

            <Text style={styles.promo}>{renderPromo(cdt?.promo)}</Text>

            <View style={styles.divider} />
            <View style={styles.cardBtnWrap}>
              <CardPillButton title="Quiero un CDT" style={{ width: 220, paddingVertical:10 }} onPress={() => {}} />
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
      <Text key={i} style={{ fontFamily: fonts.semibold }}>{seg}</Text>
    ) : (
      <Text key={i}>{seg}</Text>
    )
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  lastBar: { backgroundColor: colors.bar, paddingVertical: 5, paddingHorizontal: 20 },
  lastText: { fontFamily: fonts.regular, fontSize: 14, color: 'rgba(0, 40, 74, 1)', letterSpacing: -0.5 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingBottom: 30 },
  totalLabel: { fontFamily: fonts.regular, fontSize: 20, color: 'rgba(0, 40, 74, 1)', textAlign: 'center' },
  totalValue: { fontFamily: fonts.regular, fontSize: 25, color: 'rgba(0, 40, 74, 1)', textAlign: 'center', marginTop: 4, letterSpacing: -1 },
  totalCents: { fontSize: 15 },
  card: { backgroundColor: '#FEEA00', borderRadius: radius.card, paddingVertical: 15, paddingHorizontal: 0 },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, minHeight: 28 },
  cardIcon: { position: 'absolute', left: 20 },
  cardChevron: { position: 'absolute', right: 20 },
  cardTitle: { fontFamily: fonts.regular, fontSize: 14, color: 'rgba(0, 40, 74, 1)' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,1)' },
  cardBalance: { fontFamily: fonts.regular, fontSize: 28, color: 'rgba(0, 40, 74, 1)', textAlign: 'center', marginVertical: 8, letterSpacing: -1 },
  cardCents: { fontSize: 16 },
  cardBtnWrap: { alignItems: 'center', marginTop: 15 },
  promo: { fontFamily: fonts.regular, fontSize: 11, color: 'rgba(0, 40, 74, 1)', textAlign: 'center', lineHeight: 15, marginVertical: 15 },
});
