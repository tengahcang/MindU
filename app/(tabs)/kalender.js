import { View } from 'native-base'
import React from 'react'
import { NavbarTopNew,Calender,Separator } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
const kalender = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew/> 
      <View>
        <Calender/>
      </View>
    </SafeAreaView>
  )
}

export default kalender