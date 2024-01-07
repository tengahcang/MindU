import React from 'react'
import { Box,Text } from 'native-base';
import { Stack } from 'expo-router';
const AboutUs = () => {
  return (
  <Box p={5}>
    <Stack.Screen options={{headerTitle:"About Us"}}/>
    <Text>Salah satu fitur unggulan kami adalah "evidence of task completion" yang memungkinkan Anda memberikan bukti konkrit atas penyelesaian tugas. Dengan kemampuan untuk melakukan scan sebagai bukti, Anda dapat dengan mudah memastikan bahwa setiap tugas terlaksana secara optimal. Tak hanya itu, Mind-U juga memberikan notifikasi pengingat kepada Anda dalam jangka waktu 12 jam sebelum batas waktu penyelesaian tugas. Dengan begitu, Anda akan tetap terorganisir dan efisien dalam menyelesaikan setiap tanggung jawab.</Text>
    <Box alignItems={'center'}>
        <Text fontSize={30} alignItems={'center'} justifyContent={'center'}>Dibuat Oleh</Text>
    </Box>
    <Box>
        <Text fontWeight={'bold'}>- Muhammad Paksi Satriawan 1204210041</Text>
        <Text fontWeight={'bold'}>- Rochmat Wahyu Prayogi 1204210079</Text>
        <Text fontWeight={'bold'}>- Alfira Santa Praja 1204210056</Text>
        <Text fontWeight={'bold'}>- Alfonsus Antero Arnayusrendito 1204210085</Text>
        <Text fontWeight={'bold'}>- Muhammad Aly Tamam Sirajuddin 1204210125</Text>
        <Text fontWeight={'bold'}>- Dennis Michael A 1204210167</Text>
    </Box>
  </Box>

  );
};

export default AboutUs;