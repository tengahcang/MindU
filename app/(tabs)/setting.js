import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { NavbarTop,ProfilUser } from '../../components'

const Setting = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:25}}>
        <NavbarTop/> 
      </View>
      <View>
        <Text>Profil Saya</Text>
        <ProfilUser/>
      </View>
    </SafeAreaView>
  )
}

export default Setting