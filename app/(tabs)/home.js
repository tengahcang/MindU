import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { NavbarTop } from '../../components'
const Home = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:25}}>
        <NavbarTop/> 
      </View>
    </SafeAreaView>
    
  );
};

export default Home;
