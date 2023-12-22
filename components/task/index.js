import React from 'react';
import { Text, View,TouchableOpacity
} from 'react-native';
import { DeleteIcon,EditIcon,CheckList,NoCheckList } from '../../assets/svgs';
import { useState } from 'react';
import { Alert } from "react-native";
import { firebase } from '../../config';
import { getDatabase, ref, remove } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
const Task = ({ title, Deadline, Catatan, Foto, Warna, Kategori, TaskId }) => {
  const categoryTaskMapping = {
    'Task1': { category: 'Kategori1', color: 'red' },
    'Task2': { category: 'Kategori2',  color: 'blue' },
    'Task3': { category: 'Kategori3',  color: 'green' },
    // tambahkan task dan relasi kategori sesuai kebutuhan
  };

  // const DeleteData = () => {
  //   remove(ref(db, 'Task/')).then(()=>{
  //       console.log('Remove success')
  //   })
  //   .catch((error) => {
  //     console.log('Remove failed: ' + error.message)
  //   });
  // }

  // const getData = async (key) => {
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     if (value !== null) {
  //       // value previously stored
  //       return JSON.parse(value)
  //     }else{
  //       return 0;
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const [Task, setTask] = useState([]);
  // const taskRef = firebase.firestore().collection('Task');
  // const deleteTodo = (Task) => {
  //   taskRef
  //     .doc(Task.id)
  //     .delete()
  //     .then(() => {
  //       //show success alert
  //       alert("Deleted Successfully")
  //     })
  //     .catch(error => {
  //       alert(error);
  //     })
  // }
  
  const deleteTask = async (TaskId) => {
      try {
        const userData = await getData("user-data");

        if (!userData) {
          Alert.alert("Error", "Login Terlebih Dahulu");
          return;
        }

        const noteRef = firebase.database().ref(`Task/${userData.uid}/${TaskId}`);
        const snapshot = await noteRef.once("value");
        const existingTask = snapshot.val();

        if (!existingTask) {
          console.log("Task not found");
          return;
        }

        await noteRef.remove();
        console.log("Task deleted successfully");
      } catch (error) {
        throw error;
      }
    }    

const handleDeleteClick = () => {
  deleteTask(TaskId);
  router.replace("/home")
};


  const taskInfo = categoryTaskMapping[title] || {};
  const { category, color } = taskInfo;
  const trimmedTitle = title.length > 20 ? title.substring(0, 20) + "..." : title;
  const [showChecklistItem, setshowChecklistItem] = useState(false);
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
        </Link>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
          <Link href="EditScreen/edit">
              <EditIcon width={35} height={35}/>
              </Link>
          </TouchableOpacity>
          <TouchableOpacity>
            <DeleteIcon onPress={handleDeleteClick} width={35} height={35}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


export default Task;