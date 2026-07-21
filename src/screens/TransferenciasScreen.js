import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { PrimaryButton, OutlineButton } from '../components/Buttons';
import { useSanity, queries, formatMoney } from '../sanity';

export default function TransferenciasScreen({ navigation }) {
  const { data: account } = useSanity(queries.account);
  const [monto, setMonto] = useState('');
  const [concepto, setConcepto] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header
        variant="title"
        title="Transferencias"
        onBack={() => navigation.goBack()}
        onMenu={() => navigation.navigate('Menu')}
      />

      <View style={styles.body}>
        {/* Cuenta de origen (dropdown) */}
        <View style={styles.field}>
          <Text style={styles.label}>Seleccione la cuenta de origen</Text>
          <View style={styles.dropdownLine}>
            <Text style={styles.placeholder}>Ej: Cuenta N. 1234</Text>
            <Feather name="chevron-down" size={22} color={colors.navy} />
          </View>
        </View>

        {/* Cantidad a enviar */}
        <View style={styles.field}>
          <Text style={styles.label}>Cantidad a enviar</Text>
          <View style={styles.inputLine}>
            <TextInput
              style={styles.input}
              placeholder="0,000"
              placeholderTextColor={colors.grayInput}
              keyboardType="decimal-pad"
              value={monto}
              onChangeText={setMonto}
            />
          </View>
          <Text style={styles.hint}>Saldo disponible {formatMoney(account?.balance ?? 0)}</Text>
        </View>

        {/* Concepto */}
        <View style={styles.field}>
          <Text style={styles.label}>Concepto</Text>
          <View style={styles.inputLine}>
            <TextInput
              style={styles.input}
              placeholder="Ej: Cena Amigos"
              placeholderTextColor={colors.grayInput}
              value={concepto}
              onChangeText={setConcepto}
            />
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <PrimaryButton title="Continuar" onPress={() => {}} />
        <OutlineButton title="Mis transferencias" onPress={() => {}} style={{ marginTop: 16 }} />
      </View>

      <BottomTabBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  body: { flex: 1, paddingHorizontal: 22, paddingTop: 10, paddingBottom: 12 },
  field: { marginTop: 22 },
  label: { fontFamily: fonts.regular, fontSize: 18, color: colors.navy, marginBottom: 8 },
  dropdownLine: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: colors.grayLine, paddingBottom: 8,
  },
  placeholder: { fontFamily: fonts.regular, fontSize: 17, color: colors.grayInput },
  inputLine: { borderBottomWidth: 1, borderBottomColor: colors.grayLine, paddingBottom: 8 },
  input: { fontFamily: fonts.regular, fontSize: 17, color: colors.navy, paddingVertical: 2 },
  hint: { fontFamily: fonts.regular, fontSize: 13, color: colors.grayText, marginTop: 6 },
});
