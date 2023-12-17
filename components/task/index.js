import React from 'react';
import { Text, View,TouchableOpacity
} from 'react-native';
import { DeleteIcon,EditIcon,CheckList,NoCheckList } from '../../assets/svgs';
import { useState } from 'react';
import { Link } from 'expo-router';
const Task = ({ title, Deadline, Catatan, Foto, Warna, Kategori }) => {
  const categoryTaskMapping = {
    'Task1': { category: 'Kategori1', color: 'red' },
    'Task2': { category: 'Kategori2',  color: 'blue' },
    'Task3': { category: 'Kategori3',  color: 'green' },
    // tambahkan task dan relasi kategori sesuai kebutuhan
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
            <DeleteIcon width={35} height={35}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


export default Task;