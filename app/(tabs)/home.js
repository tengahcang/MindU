import { View, StatusBar } from 'react-native'
import React from 'react'
import { NavbarTop,Task,Separator } from '../../components'
import { ScrollView } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
const Home = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTop/>
    </SafeAreaView>
    
  );
};

export default Home;