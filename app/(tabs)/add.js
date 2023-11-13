import { View, Text } from 'native-base'
import React from 'react'
import { PrimaryButton,NavbarTop, Task,Separator } from '../../components'
const add = () => {
  return (
    <View marginTop={50}>
      <NavbarTop/>
      <View flexDirection={'row'} marginTop={130}>
        <View w={200} p={2}>
          <PrimaryButton title="Tambah Task" color="#2196F3"/>
        </View>
        <View w={200} p={2}>
          <PrimaryButton title="Tambah Lategori" color="#2196F3"/>
        </View>
      </View>
      <Separator height={25}/>
      <View p={2}>
        <Task title="Pengen ke pro bahas inggris"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
      </View>
    </View>
  )
}

export default add