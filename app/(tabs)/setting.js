import React from 'react'
import { NavbarTopNew,ProfilUser,Separator, PrimaryButton} from '../../components'
import { Heading,Center,View, Button } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
const Setting = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      // Ambil data dari AsyncStorage
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value);
        // Update value state bernama "data"
        setUserData(valueObject);
        // console.log(valueObject);
        // Fetch Data
        // fetchData(valueObject);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const logout = async () => {
    firebase.auth().signOut().then(() => {
        clearUserData();
      }).catch((error) => {
        console.error(error);
      });
  };
  const clearUserData = async () => {
    try {
      await AsyncStorage.clear();
      router.replace("newloginscreen");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew/> 
      <View ml={5}>
        <Separator height={5}/>
        <Heading>Profil & Settings</Heading>
        <Separator height={20}/>
        <View p={5}>
          <ProfilUser name={userData.name} email={userData.email} />
        </View>
      </View>
      <Separator height={350}/>
      <View style={{padding:20}}>
          <PrimaryButton title="Keluar" color={'#B31217'} fs={20} onPress={logout}/>
        <Center>App Version 1.0</Center>
      </View>
    </SafeAreaView>
  )
}

export default Setting