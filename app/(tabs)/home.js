import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { NavbarTop,Task,Separator } from '../../components'
import { ScrollView } from 'native-base';
const Home = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:25}}>
        <NavbarTop/>
      </View>
      <ScrollView style={{marginTop:150}}>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
        <Task title="Pengen Sukses"/>
        <Separator height={21}/>
        <Task title="Pengen Punya Pacar"/>
        <Separator height={21}/>
        <Task title="Pengen Pinter Ngoding"/>
        <Separator height={21}/>
        <Task title="Pengen ke pro bahas inggris"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
        <Task title="Pengen ke bali"/>
        <Separator height={21}/>
        <Task title="Pengen ke Jogja"/>
        <Separator height={66}/>
      </ScrollView>
    </SafeAreaView>
    
  );
};

export default Home;
