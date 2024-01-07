import React, { useState, useEffect } from 'react';
import { NavbarTopNew, Separator, Task } from '../../components';
import { ScrollView, Box, Text, Center, Spinner, HStack, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
const Home = () => {
  const [isHaveData, setisHaveData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [name, SetName] = useState({});
  const [dataKategori, setDataKategori] = useState([]);
  const [tanggal, setTanggal] = useState('');
  const [cuaca, setCuaca] = useState();
  const [location, setLocation] = useState();
// console.log(name)

useEffect(() => {
  getUserData();
  getCurrentDate();
}, []);
const getUserData = async() => {
  try {
    const value = await AsyncStorage.getItem("user-data");

    if ( value !== null ) {
      const valueObject = JSON.parse(value);
      setUserData(valueObject);
      ambilkategori(valueObject);
      fetchData(valueObject);
      cekCuaca();
    }
  } catch (error) {
    console.error(error)
  }
};

  const fetchData = (userData) => {
    const uid = userData.credential.user.uid;
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

  const ambilkategori = (userData) => {
    const uid = userData.credential.user.uid;
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
  // const ambilnama = (userData) => {
  //   const uid = user.uid;
  //   const dataref = firebase.database().ref("User/" + uid);
  //   dataref.once("value").then((snapshot) => {
  //     const dataValue = snapshot.val();
  //     if (dataValue !== null) {
  //       const snapshotArr = Object.entries(dataValue).map((item) => ({
  //         id: item[0],
  //         ...item[1],
  //       }));
  //       console.log("Data from ambilnama function:", snapshotArr);
  //       if (snapshotArr.length > 0) {
  //         SetName(snapshotArr[0]);
  //       }
  //     }
  //   });
  // };
  // useEffect(() => {
  //   // Trigger ambilnama when userData or any other dependency changes
  //   ambilnama(userData);
  // }, [userData]);
  
  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);
    setTanggal(formattedDate);
  };

  const cekCuaca = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const apiKey = 'T3XCNFBK4M3LTRZN64KKD65ZB';
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=${apiKey}&contentType=json`)
    .then(response => response.json())
    .then(data => setCuaca(data.currentConditions))
    .catch(error => console.error(error));
    setIsLoading(false);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D5DEEF' }}>
      <NavbarTopNew/>
      <Box flexDirection={'row'} justifyContent={'space-between'} p={1}>
        <Box background={'white'} w={173} h={28} flexDirection={'row'} borderRadius={12} marginTop={3} alignItems={'center'} justifyContent={'center'}>
          <Text fontSize={12} fontWeight={'semibold'}>{tanggal}</Text>
        </Box>
        <Box background={'white'} w={173} h={27} flexDirection={'row'} borderRadius={12} marginTop={3} marginLeft={2} alignItems={'center'} justifyContent={'center'}>
          {cuaca ? (
            <HStack>
                {cuaca.icon === "clear-day" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "clear-night" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "cloudy" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "fog" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "partly-cloudy-day" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "partly-cloudy-night" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "rain" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "snow" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ) : cuaca.icon === "wind" ? (
                    <Image source={require("../../assets/svgs/weather/clear-day.png")} />
                ): null}
                <Text color={"black"}>{cuaca.feelslike}°C</Text>
            </HStack>
          ):(
            <Center flex={1}>
              <Spinner color={'black'} />
            </Center>
          )}
        </Box>
      </Box>
      <SafeAreaView>
        {isLoading ? (
          <Center flex={1}>
            <Spinner size={'lg'} color={'black'} />
          </Center>
        ) : (
          <ScrollView padding={5}>
            <Separator height={20} />
            {data.length === 0 ? (
              <Center flex={1}>
                <Text fontWeight={'bold'} fontSize={16}>TIDAK ADA TUGAS HARI INI</Text>
              </Center>
            ) : (
              data.map((obj, index) => (
                <React.Fragment key={index}>
                  <Task
                    id={obj.id}
                    title={obj.NamaTugas}
                    Deadline={obj.DeadlineTugas}
                    Catatan={obj.TugasCatatan}
                    Foto={obj.LampiranFoto}
                    Warna={dataKategori.find((index) => index.Kategori === obj.KategoriTugas)?.Color}
                    Kategori={obj.KategoriTugas}
                    status={obj.Status}
                  />
                  <Separator height={5} />
                </React.Fragment>
              ))
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Home;