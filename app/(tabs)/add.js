import { View, Text } from 'native-base'
import React from 'react'
import { PrimaryButton,NavbarTopNew, Task,Separator } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
const add = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew/>
      <View flexDirection={'row'} position={'absolute'} bottom={5}>
        <View w={200} p={2}>
          <PrimaryButton title="Tambah Task" color="#2196F3"/>
        </View>
        <Link href="/AddScreen/AddKategori" style={{textAlign:'center',justifyContent:'center'}}>
          <View w={200} p={2}>
            <PrimaryButton title="Tambah Kategori" color="#2196F3"/>
          </View>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default add