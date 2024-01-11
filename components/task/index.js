import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { DeleteIcon, EditIcon, CheckList, NoCheckList } from '../../assets/svgs';
import { Link, router } from 'expo-router';
import firebase from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = ({ id, title, Deadline, Catatan, Foto, Warna, Kategori, status }) => {
  const [showChecklistItem, setshowChecklistItem] = useState(status);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteNote = async (id) => {
    try {
      if (!userData) {
        Alert.alert("Error", "Login Terlebih Dahulu");
        return;
      }

      const uid = userData.credential.user.uid;
      const dataRef = firebase.database().ref(`Task/${uid}/${id}`);
      const snapshot = await dataRef.once("value");
      const existingNote = snapshot.val();

      if (!existingNote) {
        console.log("Note not found");
        return;
      }

      // Show confirmation alert
      Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              // User confirmed, proceed with deletion
              await dataRef.remove();
              console.log("Note deleted successfully");
              router.replace("/home");
            },
          },
        ]
      );
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteClick = () => {
    deleteNote(id);
  };

  const categoryTaskMapping = {
    'Task1': { category: 'Kategori1', color: 'red' },
    'Task2': { category: 'Kategori2',  color: 'blue' },
    'Task3': { category: 'Kategori3',  color: 'green' },
    // tambahkan task dan relasi kategori sesuai kebutuhan
  };
  const updateStatusToFirebase = async (newStatus) => {
    try {
      if (!userData) {
        Alert.alert("Error", "Login Terlebih Dahulu");
        return;
      }
  
      const uid = userData.credential.user.uid;
      const dataRef = firebase.database().ref(`Task/${uid}/${id}`);
      const snapshot = await dataRef.once("value");
      const existingNote = snapshot.val();
  
      if (!existingNote) {
        console.log("Note not found");
        return;
      }
  
      // Update status pada database
      await dataRef.update({ status: newStatus });
      console.log("Status updated successfully");
    } catch (error) {
      throw error;
    }
  };
  const taskInfo = categoryTaskMapping[title] || {};
  const { category, color } = taskInfo;
  const trimmedTitle = title.length > 20 ? title.substring(0, 20) + "..." : title;

  return (
    <View style={{ borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Warna, padding: 15, backgroundColor:'white'}}>
      <View>
        <TouchableOpacity onPress={() => { 
          const newStatus = !showChecklistItem;
          setshowChecklistItem(newStatus);
          updateStatusToFirebase(newStatus); 
        }}> 
          {showChecklistItem ? <CheckList width={36} height={36} /> : <NoCheckList width={36} height={36} />}
        </TouchableOpacity>
      </View>
      <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href={{ pathname: "/detail-task/detail-task", params: { "title": title, "deadline": Deadline, "catatan": Catatan, "foto": Foto, "kategori": Kategori } }} >
          <Text style={{ color: showChecklistItem ? 'gray' : 'black', fontSize: 16, textDecorationLine: showChecklistItem ? 'line-through' : 'none' }} ellipsizeMode="tail" numberOfLines={2}>{trimmedTitle}</Text>
        </Link>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Link href={{ pathname: "/EditScreen/edit", params: { "title": title, "deadline": Deadline, "catatan": Catatan, "foto": Foto, "kategori": Kategori, "ID": id } }}>
              <EditIcon width={35} height={35} />
            </Link>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteClick}>
            <DeleteIcon width={35} height={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Task;
