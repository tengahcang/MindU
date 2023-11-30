import React from 'react'
import { Box,Text } from 'native-base';
import { Stack } from 'expo-router';
import { Task } from '../../components';
const Arsip = () => {
  return (
  <Box p={5}>
    <Stack.Screen options={{headerTitle:"Arsip Completed"}}/>
    <Task title={"Tugas kUliah Menpro"}/>
  </Box>

  );
};

export default Arsip;