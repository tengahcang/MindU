import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React,{useCallback} from 'react'
import { NavbarTop,Input } from '../../components'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const add = () => {
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
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <View style={{flex:1,backgroundColor:'white', marginTop:25}}>
        <NavbarTop/> 
      </View>
      <Input type="Basic" label="Nama Lengkap"/>
    </SafeAreaView>
  )
}

export default add