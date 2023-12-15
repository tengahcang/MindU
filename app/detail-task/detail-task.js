import React from 'react';
import { ScrollView, Text, Image } from 'native-base';
import Lightbox from 'react-native-lightbox';
import { Separator } from '../../components';
import { Stack } from 'expo-router'
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from '../../config';


const detailtask = () => {
  const [UrlPic,setUrlPic]= useState();
  const params =useLocalSearchParams();
  const imageRef = firebase.storage().ref(params.foto);
  useEffect(() => {
    getpic();
  },[]);
  const getpic = () =>{
    imageRef.getDownloadURL().then((url) => {
      // Gunakan URL ini untuk menampilkan gambar di aplikasi Anda
      console.log('URL gambar:', url);
      setUrlPic(url);
    }).catch((error) => {
      // Tangani kesalahan jika terjadi
      console.error('Error mendapatkan URL gambar:', error);
    });    
  }
  


  return (
    <>
      <Stack.Screen options={{headerTitle:"Detail Tugas"}}/>
      <ScrollView style={{ backgroundColor:'#D5DEEF',}}>
        <Text ml={3} fontSize={25} color={"#2196F3"} fontWeight={'bold'}> { params.title } </Text>
        <Text ml={4} fontSize={14}> {params.deadline} </Text>
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Kategori</Text>
        <Text ml={4} fontSize={15}>Kuliah</Text>
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Catatan</Text>
        <Text ml={4} fontSize={15}> {params.catatan} </Text>
        {/* <Text> {UrlPic} </Text> */}
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Gambar Task</Text>
        <Lightbox>
          <Image ml={5} size={'2xl'} source={{ uri: UrlPic }} />
        </Lightbox>
      </ScrollView>
    </>
  )
}

export default detailtask