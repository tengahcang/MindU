import React from 'react'
import { NavbarTopNew,ProfilUser,Separator, PrimaryButton} from '../../components'
import { Heading,Center,View } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';
const Setting = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew/> 
      <View ml={5}>
        <Separator height={5}/>
        <Heading>Profil & Settings</Heading>
        <Separator height={20}/>
        <View p={5}>
          <ProfilUser/>
        </View>
      </View>
      <Separator height={350}/>
      <View style={{padding:20}}>
        <PrimaryButton title="Keluar" color={'#B31217'} fs={20}/>
        <Center>App Version 1.0</Center>
      </View>
    </SafeAreaView>
  )
}

export default Setting