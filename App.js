import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { colors } from './src/theme';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CuentaDetalleScreen from './src/screens/CuentaDetalleScreen';
import MenuScreen from './src/screens/MenuScreen';
import TransferenciasScreen from './src/screens/TransferenciasScreen';
import AreaPersonalScreen from './src/screens/AreaPersonalScreen';
import AyudaScreen from './src/screens/AyudaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.navy} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Screen name="CuentaDetalle" component={CuentaDetalleScreen} />
          <Stack.Screen name="Transferencias" component={TransferenciasScreen} />
          <Stack.Screen name="AreaPersonal" component={AreaPersonalScreen} />
          <Stack.Screen name="Ayuda" component={AyudaScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
