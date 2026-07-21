import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import TransferIcon from './TransferIcon';

// Barra inferior persistente: Movimientos / Transferencias / Ayuda
export default function BottomTabBar({ navigation }) {
  const go = (route) => () => navigation.navigate(route);
  return (
    <View style={styles.bar}>
      <Pressable style={styles.item} onPress={go('CuentaDetalle')}>
        <Feather name="file-text" size={24} color={colors.navy} />
        <Text style={styles.label}>Movimientos</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={go('Transferencias')}>
        <TransferIcon size={26} />
        <Text style={styles.label}>Transferencias</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={go('Ayuda')}>
        <Feather name="message-square" size={24} color={colors.navy} />
        <Text style={styles.label}>Ayuda</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.grayLine,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fonts.regular, fontSize: 13, color: colors.navy, marginTop: 4 },
});
