import { View, Text, ScrollView, FlatList } from 'native-base'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { NavbarTopNew, Separator, Task } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../config';
import { useEffect } from 'react';
import moment from 'moment';
const kalender = () => {
  const [userData, setUserData] = useState({});
  const [data,setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataKategori,setDataKategori] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async() => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if ( value !== null ) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
        ambilkategori(valueObject);
        fetchData(valueObject);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = (userData) => {
    const uid = userData.credential.user.uid;
    const dataRef = firebase.database().ref("Task/"+uid);
    dataRef.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue != null) {
        const snapshotArr = Object.entries(dataValue).map((item) => {
          return {
            id: item[0],
            ...item[1],
          }
        });
        setData(snapshotArr);
        // console.log(data)
      }
    }) .catch ((error) => {
      console.error(error);
    })
  };
  const ambilkategori = (userData) => {
    const uid = userData.credential.user.uid;
    const dataref = firebase.database().ref("Kategori/"+uid);
    dataref.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue != null) {
        const snapshotArr = Object.entries(dataValue).map((item) => {
          return {
            id: item[0],
            ...item[1],
          };
        });
        setDataKategori(snapshotArr);
      }
    })
  };
  const markedDates = {};
  data.map((item) => {
    const deadlineDate = moment(item.DeadlineTugas, 'MM/DD/YYYY, h:mm:ss A').format('YYYY-MM-DD');
    // console.log(deadlineDate);
    markedDates[deadlineDate] = { selected: true, disableTouchEvent: false, selectedDotColor: 'orange' };
  });
  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    setSelectedDate(selectedDateString);
    const selectedItems = data.filter((item) => {
      const deadlineDate = moment(item.DeadlineTugas, 'MM/DD/YYYY, h:mm:ss A').format('YYYY-MM-DD');
      return deadlineDate === selectedDateString;
    });

    setSelectedItems(selectedItems);
  };
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew /> 
      <ScrollView>
        <View>
          <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
        </View>
        <View p={5}>
        {selectedItems.length > 0 && (
          // <Box borderRadius={"$xl"} borderWidth={1}>
          //     <Text> {selectedItems.title} </Text>
          //     <Text> {selectedItems.date} </Text>
          //     <Text> {selectedItems.content} </Text>
          // </Box>
          <FlatList data={selectedItems} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => <React.Fragment>
            <Task id={item.id}
                  title={item.NamaTugas}
                  Deadline={item.DeadlineTugas}
                  Catatan={item.TugasCatatan}
                  Foto={item.LampiranFoto}
                  Warna={dataKategori.find((index) => index.Kategori === item.KategoriTugas)?.Color}
                  Kategori={item.KategoriTugas}
                  status={item.Status} /> 
            <Separator height={5} />
          </React.Fragment> }/>
                
                
        )}
        </View>
        
      </ScrollView>
      
      
    </SafeAreaView>
  )
}

export default kalender