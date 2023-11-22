import { Text } from 'react-native';
import React from 'react'
import { Box } from 'native-base';
import { Stack } from 'expo-router';
const Notifikasi = () => {
  return (
    <Box p={5}>
    <Stack.Screen options={{headerTitle:"Notifikasi"}}/>
    <Box borderWidth={1} p={4} my={2}>
      <Text>Tugas anda sudah mendekati waktu deadline</Text>
    </Box>
    <Box borderWidth={1} p={4} my={2}>
      <Text>Tugas anda hari ini ada 2</Text>
    </Box>
    <Box borderWidth={1} p={4} my={2}>
      <Text>Tugas anda deadline 2 jam lagi</Text>
    </Box>
  </Box>

  );
};

export default Notifikasi;