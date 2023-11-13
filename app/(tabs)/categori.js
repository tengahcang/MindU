import React from 'react'
import { Center,Heading,View } from 'native-base'
import { NavbarTop, PrimaryButton ,Task,Separator} from '../../components'

const categori = () => {
  return (
    <View marginTop={50}>
      <NavbarTop/>
      <Heading position={'absolute'}top={150} left={5}>Kategori</Heading>
      <View position={'absolute'} top={200} left={25} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
        <View w={100}marginX={2}>
          <PrimaryButton title="Kuliah" color="#2196F3"/>
        </View>
        <View w={100} marginX={2}>
          <PrimaryButton title="Rumah" color="#A4A4A4"/>
        </View>
        <View w={100} marginX={2}>
          <PrimaryButton title="Kerja" color="#A4A4A4"/>
        </View>
      </View>
      <View marginTop={250} p={2}>
        <PrimaryButton title="Arsip" color="#FFBE55"/>
      </View>
      <Task title="Pengen ke pro bahas inggris"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
    </View>
  )
}

export default categori