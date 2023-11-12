import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, FlatList} from 'react-native'
import React,{useCallback, useState,} from 'react'
import { NavbarTop,Task,Separator } from '../../components'
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const add = () => {
  const [tambah, setTambah] = useState(
    [
        {
            nama: 'Tambah Task'
        },
        {
            nama: 'Tambah Kategori'
        },
    ]
  );
  
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
      <SafeAreaView style={{flex:1, backgroundColor: 'white'}} >
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <View style={{flex:1,backgroundColor:'white', marginTop:25, marginBottom: 50}}>
          <NavbarTop/>
        </View>
        <View style={{alignItems:"center", justifyContent:"center", backgroundColor:'white', bottom: 60}}>
        <FlatList 
            data={tambah}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity 
              style={{
                marginRight: 10, 
    backgroundColor: '#2196F3',
    elevation: 3,
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingVertical: 13,
    borderRadius: 15,
    marginLeft: 10,
    width: 160,
              }}>
                    <Text style= {{color:'white', fontWeight:'bold', alignItems:'center' }}>{item.nama}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
        <View style={{padding:20, backgroundColor:'white', bottom:50}}>
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
}

export default add;
