import React, { useState } from 'react';
import { Heading, View, ScrollView } from 'native-base';
import { NavbarTopNew, PrimaryButton, Task, Separator } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import todolist from '../../todolist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import firebase from "../../config";

const extractUniqueCategories = (taskList) => {
  const uniqueCategories = {};
  taskList.forEach((task) => {
    if (task.category && task.category.nama && task.category.warna) {
      uniqueCategories[task.category.nama] = task.category.warna;
    }
  });
  return uniqueCategories;
};
const Categori = () => {
  const [userData,setUserData] = useState({});
  const [dataKategori,setDataKategori] = useState([]);
  const [dataTugas,setDataTugas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const uniqueCategories = extractUniqueCategories(todolist);
  useEffect(() => {
    getUserData();
  }, [])
  const getUserData = async() => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if ( value !== null ) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
        ambilkategori(valueObject);
        ambiltugas(valueObject);
      }
    } catch (error) {
      console.error(error)
    }
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
  const ambiltugas = (userData) => {
    const uid = userData.credential.user.uid;
    const dataref = firebase.database().ref("Task/"+uid);
    dataref.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue != null) {
        const snapshotArr = Object.entries(dataValue).map((item) => {
          return {
            id: item[0],
            ...item[1],
          };
        });
        setDataTugas(snapshotArr);
      }
    })
  };
  const handleCategoryPress = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  // const filteredTasks = todolist.filter(
  //   (task) => !selectedCategory || task.category.nama === selectedCategory
  // );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D5DEEF' }}>
      <NavbarTopNew name={ userData.email } />
      <Heading mt={10} ml={5}>
        Kategori
      </Heading>
      <SafeAreaView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dataKategori.map(index => (
            <View key={index.id} w={107} m={2}>
              <PrimaryButton 
                title={index.Kategori}
                color={index.Color}
                fs={16}
                onPress={() => handleCategoryPress(index.Kategori)}
                isSelected={index.Kategori === selectedCategory}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <Separator height={15} />
      <ScrollView p={5}>
        {dataTugas.filter((obj) => !selectedCategory || obj.KategoriTugas === selectedCategory).map((obj, task) => (
          <React.Fragment key={obj.id}>
            <Task title={obj.NamaTugas} Deadline={obj.DeadlineTugas} Catatan={obj.TugasCatatan} Foto={obj.LampiranFoto} Warna={dataKategori.find((index) => index.Kategori === obj.KategoriTugas)?.Color } Kategori={obj.KategoriTugas} />
            <Separator height={5} />
              {task.catatan && <Task title={`Catatan: ${task.catatan}`}  />}
            <Separator height={5} />
          </React.Fragment>
        ))}
        {/* {dataTugas.map((obj, index) => (
          <React.Fragment key={index}>
            <Task title={obj.NamaTugas} Deadline={obj.DeadlineTugas} Catatan={obj.TugasCatatan} Foto={obj.LampiranFoto} />
            <Separator height={5} />
          </React.Fragment>
        ))} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categori;
