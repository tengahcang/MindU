import { View, StatusBar, SafeAreaView, Modal } from 'react-native'
import React from 'react'
import { Separator, PrimaryButton,Input3 } from '../../components'
const add = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:10 ,padding:20}}>
        <Input3 type="Basic" label="Nama Tugas" />
        <Separator height={500}/>
        <View p={10}>
          <PrimaryButton title="Simpan dan Lanjutkan" color="#2196F3"/>
        </View>
      </View> 
    </SafeAreaView>
  );
};

export default add;