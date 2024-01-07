import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { EditIcon } from '../../assets/svgs';
import { Link } from 'expo-router';
import firebase from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfilUser({ id, userData, foto }) {
  const [userProfile, setUserProfile] = useState({});
  const [nameData, setNameData] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value);
        setUserProfile(valueObject);
        ambilnama(valueObject);
      }
    } catch (error) {
      console.error(error);
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
          setNameData(snapshotArr[0]);
        }
      }
    });
  };

  return (
    <View>
      <View style={{
        backgroundColor: '#8AAEED',
        height: 74,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#E0E0E0',
      }}>
        <View style={{ zIndex: 1, position: 'absolute', right: -10, top: -10 }}>
          <TouchableOpacity>
            <Link href={{ pathname: "EditProfile/EditProfile", params: { "name": nameData.name, "foto": foto, "ID": id } }}>
              <EditIcon width={30} height={30} />
            </Link>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <View style={{
            marginRight: 15,
            marginTop: 0,
            marginLeft: 18,
          }}>
            <Image src={'https://www.androidponsel.com/wp-content/uploads/2023/04/profil-kosong.jpg'} style={{
              width: 51,
              height: 51,
              borderRadius: 26,
              backgroundColor: '#D9D9D9'
            }} />
          </View>
          <View style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <Text style={{ maxWidth: '100%', color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
              {nameData.name}
            </Text>
            <Text style={{ maxWidth: '100%', color: '#FFFFFF', fontSize: 14, fontWeight: '500' }}>
              {nameData.email}
            </Text>
          </View>
        </View>
        <View style={{ marginRight: 20 }}>
        </View>
      </View>
    </View>
  );
}

export default ProfilUser;
