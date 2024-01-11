import firebase from '../../config';
import { Box ,HStack,Image,Text,Toast} from 'native-base'
import { NotifikasiIcon } from '../../assets/svgs'
import { TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NavbarTopNew = (  ) => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [name, SetName] = useState({});

// console.log(name)

  useEffect(() => {
    getUserData();

  }, []);

  const getUserData = async() => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if ( value !== null ) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
        ambilnama(valueObject);

      }
    } catch (error) {
      console.error(error)
    }
  };
  const ambilnama = (userData) => {
    const uid = userData.credential.user.uid;
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

  
  return (

        <Box flexDirection={"row"} background={"#A9BFE1"} h={68} alignItems={'center'} justifyContent={'space-between'}>
         <Link href={'setting'}>
            <HStack alignItems={'center'} mx={2}>
                <Image w={39} h={38} borderRadius={100} source={{
                    uri: "https://www.androidponsel.com/wp-content/uploads/2023/04/profil-kosong.jpg"
                }} alt="image" />
                <Text fontSize={15} fontWeight={'semibold'} mx={2}>Hi,{name.name} </Text>
                <Text></Text>
            </HStack>
      
          </Link>
            
            <TouchableOpacity style={{marginRight:5}} >
              <Link href={"notifikasi/notifikasi"}>
                <NotifikasiIcon/>
              
              </Link>
            </TouchableOpacity>
        </Box>
  )
}

export default NavbarTopNew