import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MessageSquare, FileText } from 'lucide-react-native';
import { colors, fonts } from '../theme';
import TransferIcon from './TransferIcon';

// Barra inferior persistente: Movimientos / Transferencias / Ayuda
export default function BottomTabBar({ navigation }) {
  const go = (route) => () => navigation.navigate(route);
  return (
    <View style={styles.bar}>
      <Pressable style={styles.item} onPress={go('CuentaDetalle')}>
        <FileText size={24} color={colors.navy} strokeWidth={1.3} />
        <Text style={styles.label}>Movimientos</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={go('Transferencias')}>
        <TransferIcon size={26} />
        <Text style={styles.label}>Transferencias</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={go('Ayuda')}>
        <MessageSquare size={24} color={colors.navy} strokeWidth={1.3} />
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
