import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ProfilUser,NavbarTop,} from '../components';
export default function App() {
  return (
    <View style={styles.container}>
      <NavbarTop/>
      <Categories/>
      <ProfilUser/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
