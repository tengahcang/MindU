import { View, Text } from 'native-base'
import React ,{useEffect,useState} from 'react'
import { PrimaryButton,NavbarTopNew, Task,Separator } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const add = () => {
  const [userData,setUserData] = useState({});
  useEffect(() => {
    getUserData();
  }, [])
  const getUserData = async() => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if ( value !== null ) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew name={ userData.name }/>
      <View flexDirection={'row'} position={'absolute'} bottom={5}>
        {/* <Link href="AddScreen/AddTask" style={{textAlign:'center',justifyContent:'center'}}> */}
          <View w={200} p={2}>
            <PrimaryButton title="Tambah Task" color="#2196F3" onPress={()=>router.push("AddScreen/AddTask")}/>
          </View>
        {/* </Link> */}
        {/* <Link href="AddScreen/AddKategori" style={{textAlign:'center',justifyContent:'center'}}> */}
        <View w={200} p={2}>
          <PrimaryButton title="Tambah Kategori" color="#2196F3" onPress={()=>router.push("AddScreen/AddKategori")}/>
        </View>
        {/* </Link> */}
      </View>
    </SafeAreaView>
  )
}

export default add;