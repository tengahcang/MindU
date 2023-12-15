import React, { useState } from 'react';
import { Alert } from "react-native";
import { View, Input,Text,FormControl } from 'native-base';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { PrimaryButton, Separator } from '../../components';
import { Stack, router } from 'expo-router';
// import { getData } from '../../utils/Localstorage';
import FIREBASE from '../../config'
const AddKategori = () => {
  const [currentColor, setCurrentColor] = useState('#000000'); // Default color or any initial color
  const [NamaKategori,SetNamaKategori] = useState("")
  const warnaApa = (color) => {
    setCurrentColor(color);
  };
  const addKategori = async (data) => {
    try {
      // Ambil data yg sudah login dari fungsi 'getData'
      
      const userData = {
        uid: 'GwYpmIPGmuUMEIPOrJbyw5FeQxH3', // Replace with the actual user ID
      };
      if (userData) {
        // Tambah note sesuai uid
        const dataBaru = {
          ...data,
          uid: userData.uid,
        };
  
        await FIREBASE.database()
          .ref("kategori/" + userData.uid)
          .push(dataBaru);
  
        console.log("kategori added successfully");
      } else {
        Alert.alert("Error", "Login Terlebih Dahulu");
      }
    } catch (error) {
      throw error;
    }
  };
const OnAddKategori = async () => {
    if (NamaKategori && currentColor) {
      const data = {
        currentColor: currentColor,
        NamaKategori: NamaKategori,
      };

      console.log(data);
      try {
        const user = await addKategori(data);
        router.replace("/home")
      } catch (error) {
        console.log("Error", error.message);
      }
    } else {
      console.log("Error", "Data tidak lengkap");
    }
    };

  return (
    <View flex={1} padding={4} backgroundColor={'#D5DEEF'}>
      <Stack.Screen options={{headerTitle:"Add Kategori"}}/>
      <FormControl isRequired>
        <FormControl.Label fontSize={20}>Nama Kategori</FormControl.Label>
        <Input 
        size="lg" 
        placeholder="Isi Nama Kategori" 
        value={NamaKategori}
        onChangeText={(NamaKategori) => SetNamaKategori(NamaKategori)}/>
        <FormControl.Label fontSize={20}>Pilih Warna</FormControl.Label>
        <ColorPicker
          onColorSelected={(color) => warnaApa(color)}
          onColorChange={(color) => warnaApa(fromHsv({ h: 200, s: 0.4, v: 8.4 }))}
          hideSliders={true}
          style={{ width: 200, height: 200 }}
        />
        <Input 
        size="lg" 
        placeholder="hex color" 
        value={currentColor} 
        onChangeText={(currentColor) => SetcurrentColor(currentColor)} />
        <Separator height={20}/>
        <PrimaryButton title="Tambah Kategori" color="#2196F3" onPress={OnAddKategori}/>
      </FormControl>
    </View>
  );
};

export default AddKategori;
