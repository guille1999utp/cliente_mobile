import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import Logo from '../components/Logo';
import { PrimaryButton, OutlineButton } from '../components/Buttons';

export default function LoginScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          {/* Logo centrado arriba */}
          <View style={styles.logoWrap}>
            <Logo size={40} circle={44} />
          </View>

          <View style={{ flex: 1 }} />

          {/* Campos */}
          <View style={styles.field}>
            <Text style={styles.label}>Cédula</Text>
            <View style={styles.inputLine}>
              <TextInput
                style={styles.input}
                placeholder="Ingresa número de cédula"
                placeholderTextColor={colors.grayInput}
                keyboardType="number-pad"
                value={cedula}
                onChangeText={setCedula}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputLine}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Ingresa contraseña"
                placeholderTextColor={colors.grayInput}
                secureTextEntry={!showPass}
                value={pass}
                onChangeText={setPass}
              />
              <Pressable hitSlop={10} onPress={() => setShowPass((s) => !s)}>
                <Feather name={showPass ? 'eye' : 'eye-off'} size={20} color={colors.navy} />
              </Pressable>
            </View>
          </View>

          <Pressable onPress={() => {}} style={styles.forgotWrap}>
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </Pressable>

          <View style={{ flex: 1.4 }} />

          {/* Botones */}
          <PrimaryButton title="Continuar" onPress={() => navigation.replace('Inicio')} />
          <OutlineButton title="¿No eres cliente Pibank?" onPress={() => {}} style={{ marginTop: 16 }} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1, paddingHorizontal: 24, paddingBottom: 12 },
  logoWrap: { alignItems: 'center', marginTop: 40 },
  field: { marginBottom: 26 },
  label: { fontFamily: fonts.regular, fontSize: 18, color: colors.navy, marginBottom: 6 },
  inputLine: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLine,
    paddingBottom: 8,
  },
  input: { fontFamily: fonts.regular, fontSize: 17, color: colors.navy, paddingVertical: 2 },
  forgotWrap: { alignItems: 'center', marginTop: 6 },
  forgot: { fontFamily: fonts.medium, fontSize: 16, color: colors.link },
});
