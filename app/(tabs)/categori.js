import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { NavbarTop, Categories, Task, Separator } from '../../components'

const Categori = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:25, Bottom: 10}}>
        <NavbarTop/> 
        <Separator height={30}/>
        <Categories/>
      </View>
      <View style={{padding:20, backgroundColor:'white', marginBottom: 40}}>
        <Task/>
          <Separator height={21}/>
          <Task/>
          <Separator height={21}/>
          <Task/>
          <Separator height={21}/>
          <Task/>
          <Separator height={21}/>
          <Task/>
          <Separator height={5}/>
        </View>
    </SafeAreaView>
  );
};

export default Categori;
