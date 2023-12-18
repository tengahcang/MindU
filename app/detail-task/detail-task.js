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
  const [UrlPic, setUrlPic] = useState();
  const params = useLocalSearchParams();
  const imageRef = params.foto ? firebase.storage().ref(params.foto) : null;

  useEffect(() => {
    if (imageRef) {
      getpic();
    }
  }, []);

  const getpic = () => {
    if (!imageRef) {
      console.warn('Referensi gambar tidak ditemukan.');
      // Set UrlPic ke nilai default atau kosong sesuai kebutuhan aplikasi Anda
      setUrlPic(null); // atau setUrlPic(''); atau setUrlPic(DEFAULT_URL);
      return;
    }

    imageRef
      .getDownloadURL()
      .then((url) => {
        // Gunakan URL ini untuk menampilkan gambar di aplikasi Anda
        console.log('URL gambar:', url);
        setUrlPic(url);
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          console.warn('Gambar tidak ditemukan.');
          // Set UrlPic ke nilai default atau kosong sesuai kebutuhan aplikasi Anda
          setUrlPic(null); // atau setUrlPic(''); atau setUrlPic(DEFAULT_URL);
        } else {
          console.error('Error mendapatkan URL gambar:', error);
        }
      });
  };

  return (
    <>
      <Stack.Screen options={{headerTitle:"Detail Tugas"}}/>
      <ScrollView style={{ backgroundColor:'#D5DEEF',}}>
        <Text ml={3} fontSize={25} color={"#2196F3"} fontWeight={'bold'}> { params.title } </Text>
        <Text ml={4} fontSize={14}> {params.deadline} </Text>
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Kategori</Text>
        <Text ml={4} fontSize={15}> { params.kategori } </Text>
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Catatan</Text>
        <Text ml={4} fontSize={15}> {params.catatan} </Text>
        {/* <Text> {UrlPic} </Text> */}
        <Separator height={30}/>
        <Text ml={4} fontSize={16} fontWeight={'semibold'} >Gambar Task</Text>
        {UrlPic ? (
        <Lightbox>
          <Image ml={5} flex={1} h={150} resizeMode='contain' source={{ uri: UrlPic }} />
        </Lightbox>
        ) : (
          <Text ml={5} fontSize={15}>Gambar tidak tersedia</Text>
        )}
      </ScrollView>
    </>
  )
}

export default detailtask