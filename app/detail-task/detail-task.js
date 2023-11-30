import React from 'react';
import { ScrollView, Text, Image } from 'native-base';
import Lightbox from 'react-native-lightbox';
import { Separator } from '../../components';
import { Stack } from 'expo-router'

const detailtask = () => {
  return (
    <>
      <Stack.Screen options={{headerTitle:"Detail Tugas"}}/>
      <ScrollView style={{ backgroundColor:'#D5DEEF',}}>
        <Text ml={3} fontSize={25} color={"#2196F3"} fontWeight={'bold'}>Tugas Menpro Week 1</Text>
        <Text ml={4} fontSize={14}>Deadline : 21-03-2023 pukul 19:00</Text>
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Kategori</Text>
        <Text ml={4} fontSize={15}>Kuliah</Text>
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Catatan</Text>
        <Text ml={4} fontSize={15}>Tugas nya video</Text>
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Gambar Task</Text>
        <Lightbox>
          <Image ml={5} size={'2xl'} source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }} />
        </Lightbox>
      </ScrollView>
    </>
  )
}

export default detailtask