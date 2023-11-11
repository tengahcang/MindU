<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import { ProfilUser } from './components';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Haloo</Text>
      <ProfilUser/>
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
>>>>>>> 9c86cac (Initial commit)
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
