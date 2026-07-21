import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';

export default function AyudaScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header
        variant="title"
        title="Ayuda"
        onBack={() => navigation.goBack()}
        onMenu={() => navigation.navigate('Menu')}
      />
      <View style={styles.body}>
        <Text style={styles.text}>Ayuda con tus productos y operativas</Text>
      </View>
      <BottomTabBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  text: { fontFamily: fonts.regular, fontSize: 16, color: colors.grayText, textAlign: 'center' },
});
