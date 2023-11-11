import { StyleSheet, Text, View } from 'react-native';
import { ProfilUser } from './components';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Haloo</Text>
      <ProfilUser/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
