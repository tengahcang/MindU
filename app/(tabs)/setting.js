import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { NavbarTop,ProfilUser,Separator, PrimaryButton} from '../../components'
import { Heading,Center } from "native-base";
const Setting = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:25}}>
        <NavbarTop/> 
      </View>
      <View>
        <Heading>Profil Saya</Heading>
        <Separator height={24}/>
        <ProfilUser/>
      </View>
      <Separator height={350}/>
      <View style={{padding:20}}>
        <PrimaryButton title="Keluar" color={'#B31217'}/>
        <Center>App Version 1.0</Center>
      </View>
    </SafeAreaView>
  )
}

export default Setting