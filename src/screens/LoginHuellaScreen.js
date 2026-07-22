import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FingerprintPattern } from 'lucide-react-native';
import { colors, fonts } from '../theme';
import Logo from '../components/Logo';
import { OutlineButton } from '../components/Buttons';
import { useSanity, queries } from '../sanity';

const APP_VERSION = 'Pibank_Prod_1.8.5';

export default function LoginHuellaScreen({ navigation }) {
  const { data: account } = useSanity(queries.account);
  const name = (account?.holder || 'Alison').split(' ')[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Logo arriba */}
        <View style={styles.logoWrap}>
          <Logo size={34} circle={30} />
        </View>

        {/* Saludo */}
        <Text style={styles.hello}>Hola de nuevo, {name}</Text>
        <Pressable hitSlop={8} onPress={() => navigation.navigate('LoginPassword')}>
          <Text style={styles.link}>¿Cambiar de usuario?</Text>
        </Pressable>

        {/* Huella */}
        <Pressable style={styles.fingerWrap} onPress={() => navigation.replace('Inicio')}>
          <View style={styles.fingerCircle}>
            <FingerprintPattern size={44} color={colors.navy} strokeWidth={1.6} />
          </View>
        </Pressable>
        <Text style={styles.fingerText}>Accede a Pibank con tu huella</Text>

        <View style={{ flex: 1 }} />

        {/* Acceso alterno */}
        <Pressable hitSlop={8} onPress={() => navigation.navigate('LoginPassword')} style={{ alignItems: 'center' }}>
          <Text style={styles.link}>Quiero acceder con mi contraseña</Text>
        </Pressable>

        <OutlineButton title="¿No eres cliente Pibank?" onPress={() => {}} style={{ marginTop: 16,paddingVertical: 13 }} />

        <Text style={styles.version}>{APP_VERSION}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1, paddingHorizontal: 24, paddingBottom: 10 },
  logoWrap: { alignItems: 'center', marginTop: 24 },
  hello: {  letterSpacing: -1,fontFamily: fonts.regular, fontSize: 22, color: 'rgba(16, 41, 34, 1)', textAlign: 'center', marginTop: 70 },
  link: { letterSpacing: -0.5, fontFamily: fonts.regular, fontSize: 17, color: '#5879D5', textAlign: 'center', marginTop: 8 },
  fingerWrap: { alignItems: 'center', marginTop: 90 },
  fingerCircle: {
    width: 92, height: 92, borderRadius: 46, borderWidth: 1.5, borderColor: 'rgba(67, 85, 98, 1)',
    alignItems: 'center', justifyContent: 'center',
  },
  fingerText: { letterSpacing: -0.5, fontFamily: fonts.regular, fontSize: 17, color: 'rgba(67, 85, 98, 1)', textAlign: 'center', marginTop: 16, width: 199, margin:'auto' },
  version: { letterSpacing: -0.5, fontFamily: fonts.regular, fontSize: 12, color: 'rgba(67, 85, 98, 1)', textAlign: 'right', marginTop: 10 },
});
