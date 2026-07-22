import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MessagesSquare,
  Mail,
  MessageSquareText,
  FileText,
  FileSpreadsheet,
  File,
} from 'lucide-react-native';
import { colors, fonts } from '../theme';
import Header from '../components/Header';
import { useSanity, queries } from '../sanity';

// Mapea el nombre de icono guardado en Sanity a un icono Lucide
const ICONS = {
  solicitudes: MessagesSquare,
  correspondencia: Mail,
  notificaciones: MessageSquareText,
  contrato: FileText,
  certificados: FileSpreadsheet,
  extractos: File,
};

// Fallback por si el buzón aún no tiene datos en Sanity
const DEFAULT_ITEMS = [
  { label: 'Mis solicitudes', icon: 'solicitudes' },
  { label: 'Correspondencia', icon: 'correspondencia' },
  { label: 'Notificaciones', icon: 'notificaciones', badge: 1 },
  { label: 'Contrato', icon: 'contrato' },
  { label: 'Certificados tributarios', icon: 'certificados' },
  { label: 'Extractos', icon: 'extractos' },
];

export default function BuzonScreen({ navigation }) {
  const { data: mailbox } = useSanity(queries.mailbox);
  const items = mailbox?.items?.length ? mailbox.items : DEFAULT_ITEMS;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header
        variant="title"
        title="Buzón virtual"
        onMenu={() => navigation.navigate('Menu')}
      />

      <ScrollView contentContainerStyle={{ paddingTop: 18 }}>
        <Text style={styles.heading}>Elige una opción</Text>

        <View style={{ marginTop: 20 }}>
          {items.map((it, i) => {
            const Icon = ICONS[it.icon] || File;
            return (
              <Pressable key={i} style={styles.row} onPress={() => {}}>
                <View style={styles.iconWrap}>
                  <Icon size={24} color={colors.navy} strokeWidth={1.8} />
                </View>
                <Text style={styles.label}>{it.label}</Text>
                {it.badge != null && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{it.badge}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  heading: { fontFamily: fonts.regular, fontSize: 26, color: colors.navy, marginHorizontal: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.navy,
  },
  iconWrap: { width: 42 },
  label: { flex: 1, fontFamily: fonts.regular, fontSize: 18, color: colors.navy },
  badge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  badgeText: { fontFamily: fonts.medium, fontSize: 14, color: colors.navy },
});
