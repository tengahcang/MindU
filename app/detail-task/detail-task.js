import { View, Text, Image } from 'native-base'
import React from 'react'
import { Separator } from '../../components'

const detailtask = () => {
  return (
    <View>
      <Separator height={30}/>
      <Text ml={3} fontSize={25} color={"#2196F3"} fontWeight={'bold'}>Tugas Menpro Week 1</Text>
      <Text ml={4} fontSize={14} >21-03-2023 pukul 19:00</Text>
      <Separator height={30}/>
      <Text ml={4} fontSize={16} fontWeight={'semibold'} >Kategori</Text>
      <Text ml={4} fontSize={15}>Kuliah</Text>
      <Separator height={30}/>
      <Text ml={4} fontSize={16} fontWeight={'semibold'} >Catatan</Text>
      <Text ml={4} fontSize={15}>Tugas nya video</Text>
      <Separator height={30}/>
      <Text ml={4} fontSize={16} fontWeight={'semibold'} >Gambar Task</Text>
      <Image ml={5} size={'2xl'} source={{uri:"https://wallpaperaccess.com/full/317501.jpg"}}/>
    </View>
  )
}

export default detailtask