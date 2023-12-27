
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { DeleteIcon, EditIcon, CheckList, NoCheckList } from '../../assets/svgs';
import { Link, router } from 'expo-router';
import firebase from '../../config';
import { Alert } from "react-native";
import { firebase } from '../../config';
import { getDatabase, ref, remove } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = ({ id, title, Deadline, Catatan, Foto, Warna, Kategori }) => {
  const [showChecklistItem, setshowChecklistItem] = useState(false);
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

      // Hapus catatan dari database
      await dataRef.remove();
      console.log("Note deleted successfully");
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteClick = () => {
    deleteNote(id);
    router.replace("/home");
  };
  const categoryTaskMapping = {
    'Task1': { category: 'Kategori1', color: 'red' },
    'Task2': { category: 'Kategori2',  color: 'blue' },
    'Task3': { category: 'Kategori3',  color: 'green' },
    // tambahkan task dan relasi kategori sesuai kebutuhan
  };



  const taskInfo = categoryTaskMapping[title] || {};
  const { category, color } = taskInfo;
  const trimmedTitle = title.length > 20 ? title.substring(0, 20) + "..." : title;
  // const [showChecklistItem, setshowChecklistItem] = useState(false);

  // ... (bagian lain dari komponen)

  return (
    <View style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Warna, padding: 15,}}>
      <View>
        <TouchableOpacity onPress={() => { 
          setshowChecklistItem(!showChecklistItem); 
        }}> 
          {showChecklistItem ?<CheckList width={36} height={36}/> :<NoCheckList width={36} height={36}/> }
        </TouchableOpacity>
      </View>
      <View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
        <Link href={{pathname:"/detail-task/detail-task", params:{"title":title,"deadline":Deadline,"catatan":Catatan,"foto":Foto,"kategori":Kategori}}} >
          <Text style={{ color: 'black', fontSize: 16 }} ellipsizeMode="tail" numberOfLines={2}>{trimmedTitle}</Text>
          <Text>{id}</Text>
        </Link>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
            <Link href="EditScreen/edit">
              <EditIcon width={35} height={35}/>
              </Link>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteClick}>
            <DeleteIcon width={35} height={35}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Task;

// import React from 'react';
// import { Text, View,TouchableOpacity
// } from 'react-native';
// import { DeleteIcon,EditIcon,CheckList,NoCheckList } from '../../assets/svgs';
// import { useState ,useEffect} from 'react';
// import { Link ,router} from 'expo-router';
// import firebase from '../../config';
// import { Alert } from "react-native";
// import { clearStorage, getData, storeData } from "../../utils/localStorage";
// const Task = ({id, title, Deadline, Catatan, Foto, Warna, Kategori }) => {
  
// const deleteNote = async (id) => {

//   try {
//     useEffect(() => {
//       getUserData();
//     }, []);
//     const getUserData = async () => {
//       try {
//         const value = await AsyncStorage.getItem("user-data");
//         if (value !== null) {
//           const valueObject = JSON.parse(value);
//           setUserData(valueObject);
//           ambilkategori(valueObject);
//           fetchData(valueObject);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     const uid = userData.credential.user.uid;
//     const dataRef = firebase.database().ref("Task/" + uid);
//     // const noteRef = firebase.database().ref(`Task/${userData.uid}/${id}`);
//     const snapshot = await noteRef.once("value");
//     const existingNote = snapshot.val();

//     if (!existingNote) {
//       console.log("Note not found");
//       return;
//     }

//     // Hapus catatan dari database
//     await dataRef.remove();
//     console.log("Note deleted successfully");
//   } catch (error) {
//     throw error;
//   }
// };
//   const categoryTaskMapping = {
//     'Task1': { category: 'Kategori1', color: 'red' },
//     'Task2': { category: 'Kategori2',  color: 'blue' },
//     'Task3': { category: 'Kategori3',  color: 'green' },
//     // tambahkan task dan relasi kategori sesuai kebutuhan
//   };
//   const taskInfo = categoryTaskMapping[title] || {};
//   const { category, color } = taskInfo;
//   const trimmedTitle = title.length > 20 ? title.substring(0, 20) + "..." : title;
//   const [showChecklistItem, setshowChecklistItem] = useState(false);
//   const handleDeleteClick = () => {
//     deleteNote(id);
//     router.replace("/home");
//   };
//   return (
//     <View style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Warna, padding: 15,}}>
//       <View>
//         <TouchableOpacity onPress={() => { 
//           setshowChecklistItem(!showChecklistItem); 
//         }}> 
//           {showChecklistItem ?<CheckList width={36} height={36}/> :<NoCheckList width={36} height={36}/> }
//         </TouchableOpacity>
//       </View>
//       <View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
//         <Link href={{pathname:"/detail-task/detail-task", params:{"title":title,"deadline":Deadline,"catatan":Catatan,"foto":Foto,"kategori":Kategori}}} >
//           <Text style={{ color: 'black', fontSize: 16 }} ellipsizeMode="tail" numberOfLines={2}>{trimmedTitle}</Text>
//           <Text>{id}</Text>
//         </Link>
//         <View style={{flexDirection:'row'}}>
//           <TouchableOpacity>
//             <Link href={{pathname:"/EditScreen/edit", params:{"title":title,"deadline":Deadline,"catatan":Catatan,"foto":Foto,"kategori":Kategori}}} >
//               <EditIcon width={35} height={35}/>
//             </Link>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleDeleteClick}>
//             <DeleteIcon width={35} height={35}/>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }


// export default Task;