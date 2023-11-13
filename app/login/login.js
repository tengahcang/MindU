import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, FlatList, ImageBackground} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React,{useCallback, useState,} from 'react'
import { NavbarTop,Task,Separator } from '../../components'
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import halamanlogin from '../../assets/halamanlogin.png';
import GoogleIcon from '../../assets/svgs/GoogleIcon';
import { Link } from 'expo-router';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const Login = () => {
  
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
    <View style={{flex:1}}>
      <ImageBackground source={halamanlogin} style={{flex:1, justifyContent:'center'}}>
      <Separator height={60}/>
      <Text style={{fontWeight: 'bold', fontSize: 35, color:'#2196F3', textAlign: 'center', top:50}}>
      Selamat Datang</Text>
      <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center', padding: 20, top:40}}>Selamat datang di MIND U. Bersiaplah
      untuk memulai perjalanan Anda menuju hal-hal yang terstruktur!
      </Text>
      <Separator height={40}/>
        <TouchableOpacity style={{
                  marginRight: 7, 
      backgroundColor: 'white', 
      elevation: 6,
      borderColor:'#2196F3',
      borderWidth: 2,
      alignItems: 'center',
      paddingVertical: 8,
      marginBottom: 10,
      borderRadius: 30,
      marginLeft: 40,
      height: 60,
      width: 300,
                }}>
                  <Link href="/home">
                    <View>
                    <Text style= {{fontWeight:'bold', color:'#2196F3', marginRight:30, marginTop:10}}>Masuk dengan Google</Text>
                    <GoogleIcon style={{marginLeft:180, bottom: 27}}>
              </GoogleIcon>

                    </View>
                  </Link>
        </TouchableOpacity>  
      </ImageBackground>
      
    </View>
    );
}

export default Login;
