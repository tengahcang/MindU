import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React, {useCallback} from 'react';
import { NavbarTop, Categories, Task, Separator } from '../../components'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const Categori = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });

  

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}} >
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
