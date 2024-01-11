import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { PrimaryButton, NavbarTopNew, Separator } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import firebase from "../../config";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {
  const [isHaveData, setisHaveData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [name, SetName] = useState({});
  const [dataKategori, setDataKategori] = useState([]);
  const [tanggal, setTanggal] = useState('');
  const { width } = Dimensions.get('window');
  const buttonWidth = width * 0.4;
// console.log(name)

  useEffect(() => {
    getUserData();
    
  }, []);

  const getUserData = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserData(user);
        ambilkategori(user);
        fetchData(user);
        SetName(user);
        console.log(name.name)
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchData = (user) => {
    const uid = user.uid;
    const dataRef = firebase.database().ref("Task/" + uid);
    dataRef.once("value")
      .then((snapshot) => {
        const dataValue = snapshot.val();
        if (dataValue !== null) {
          const snapshotArr = Object.entries(dataValue).map((item) => ({
            id: item[0],
            ...item[1],
          }));

          if (Array.isArray(snapshotArr) && snapshotArr.length > 0) {
            setData(snapshotArr);
            setisHaveData(false);
          } else {
            setisHaveData(true);
          }
        } else {
          setisHaveData(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setisHaveData(true);
      });
  };

  const ambilkategori = (user) => {
    const uid = user.uid;
    const dataref = firebase.database().ref("Kategori/" + uid);
    dataref.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue !== null) {
        const snapshotArr = Object.entries(dataValue).map((item) => ({
          id: item[0],
          ...item[1],
        }));
        setDataKategori(snapshotArr);
      }
    });
  };
  const ambilnama = (user) => {
    const uid = user.uid;
    const dataref = firebase.database().ref("User/" + uid);
    dataref.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue !== null) {
        const snapshotArr = Object.entries(dataValue).map((item) => ({
          id: item[0],
          ...item[1],
        }));
        console.log("Data from ambilnama function:", snapshotArr);
        if (snapshotArr.length > 0) {
          SetName(snapshotArr[0]);
        }
      }
    });
  };
  useEffect(() => {
    // Trigger ambilnama when userData or any other dependency changes
    ambilnama(userData);
  }, [userData]);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D5DEEF' }}>
    <NavbarTopNew />
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10, position: 'absolute', bottom: 20, left: 0, right: 0 }}>
        <View w={150}>
          <PrimaryButton title="Tambah Task" color="#2196F3" onPress={() => router.push("AddScreen/AddTask")} width={buttonWidth} />
        </View>
        <View w={150}>
          <PrimaryButton title="Tambah Kategori" color="#2196F3" onPress={() => router.push("AddScreen/AddKategori")} width={buttonWidth} />
        </View>
      </View>
      {/* Your main content goes here */}
    </View>
    {/* Your tab bar component goes here */}
  </SafeAreaView>
  );
}

export default Add;
