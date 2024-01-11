import React, { useEffect, useState } from 'react';
import { Alert } from "react-native";
import { View, Input,Text,FormControl } from 'native-base';
import { ColorPicker, fromHsv, toHsv } from 'react-native-color-picker';
import { PrimaryButton, Separator } from '../../components';
import { Stack, router } from 'expo-router';
// import { getData } from '../../utils/Localstorage';
import firebase from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddKategori = () => {
  const [currentColor, setCurrentColor] = useState('#000000'); // 
  const [NamaKategori,SetNamaKategori] = useState("");
  const [value,setValue] = useState (null);
  const [userData,setUserData] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  const warnaApa = (color) => {
    setCurrentColor(color);
  };
  const getUserData = async() => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value)
        setUserData(valueObject)
      }
    } catch (error) {
      console.error(error)
    }
  };
  const addKategori = (Kategori,Color) => {
    const data = {
      Kategori: Kategori,
      Color: Color
    };
    const uid = userData.credential.user.uid;
    firebase.database().ref("Kategori/"+uid).push(data);
    router.replace("/home")
  };
  const handleAddKategori = () => {
    if (NamaKategori.trim() === '') {
      Alert.alert('Error', 'Nama Kategori tidak boleh kosong');
    } else {
      addKategori(NamaKategori, currentColor);
    }
  };
  return (
    <View flex={1} padding={4} backgroundColor={'#D5DEEF'}>
      <Stack.Screen options={{headerTitle:"Add Kategori"}}/>
      <FormControl isRequired>
        <FormControl.Label fontSize={20}>Nama Kategori</FormControl.Label>
        <Input size="lg" placeholder="Isi Nama Kategori"  value={NamaKategori} onChangeText={(NamaKategori) => SetNamaKategori(NamaKategori)}/>
        <FormControl.Label fontSize={20}>Pilih Warna</FormControl.Label>
        <ColorPicker
          onColorSelected={(color) => warnaApa(color)}
          onColorChange={(color) => warnaApa(fromHsv({ h: 200, s: 0.4, v: 8.4 }))}
          hideSliders={true}
          style={{ width: 200, height: 200 }}
        />
        
        <Input size="lg" placeholder="hex color" value={currentColor} onChangeText={(currentColor) => setCurrentColor(currentColor)} />
        
        <Separator height={20}/>
        <PrimaryButton title="Tambah Kategori" color="#2196F3" onPress={()=>handleAddKategori(NamaKategori,currentColor)}/>
      </FormControl>
    </View>
  );
};

export default AddKategori;
