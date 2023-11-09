import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { Heading } from "native-base";
import { NavbarTop,Task,Separator } from '../../components'
const Home = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:25}}>
        <NavbarTop/>
        <Heading>Brooo</Heading>
      </View>
      <View style={{padding:15}}>
      <Task/>
        <Separator height={21}/>
        <Task/>
        <Separator height={21}/>
        <Task/>
        <Separator height={21}/>
        <Task/>
        <Separator height={21}/>
        <Task/>
        <Separator height={21}/>
        <Task/>
        <Separator height={66}/>
      </View>
    </SafeAreaView>
    
  );
};

export default Home;
