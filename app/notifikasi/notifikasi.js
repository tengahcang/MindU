import React from 'react'
import { Box,Text } from 'native-base';
import { Stack } from 'expo-router';
import { NotifikasiIcon } from '../../assets/svgs';
const Notifikasi = () => {
  return (
  <Box p={5}>
    <Stack.Screen options={{headerTitle:"Notifikasi"}}/>
    <Box borderWidth={1} p={4} my={2} flexDirection={'row'} alignItems={'center'}>
      <NotifikasiIcon/>
      <Text pl={2}>Tugas anda sudah mendekati waktu deadline</Text>
    </Box>
    <Box borderWidth={1} p={4} my={2} flexDirection={'row'} alignItems={'center'}>
      <NotifikasiIcon/>
      <Text pl={2}>Tugas anda sudah mendekati waktu deadline</Text>
    </Box>
    <Box borderWidth={1} p={4} my={2} flexDirection={'row'} alignItems={'center'}>
      <NotifikasiIcon/>
      <Text pl={2}>Tugas anda sudah mendekati waktu deadline</Text>
    </Box>
    <Box borderWidth={1} p={4} my={2} flexDirection={'row'} alignItems={'center'}>
      <NotifikasiIcon/>
      <Text pl={2}>Tugas anda sudah mendekati waktu deadline</Text>
    </Box>
  </Box>

  );
};

export default Notifikasi;