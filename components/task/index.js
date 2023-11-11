import React from 'react';
import { Text, View,TouchableOpacity
} from 'react-native';
import { DeleteIcon,EditIcon,CheckList,NoCheckList } from '../../assets/svgs';
import { useState } from 'react';
const Task = ({title}) => {
  const trimmedTitle = title.length > 30 ? title.substring(0, 30) + "..." : title;
  const [showChecklistItem, setshowChecklistItem] = useState(false);
  return (
    <View style={{borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#2196F3',
      padding: 15,}}>
      <View>
        <TouchableOpacity onPress={() => {
            setshowChecklistItem(!showChecklistItem);
          }}>
            {showChecklistItem ?<CheckList width={36} height={36}/> :<NoCheckList width={36} height={36}/> }
        </TouchableOpacity>
      </View>
      <View style={{width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'}}>
        <Text style={{    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,}} ellipsizeMode="tail" numberOfLines={2}>{trimmedTitle}</Text>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity>
                <EditIcon width={35} height={35}/>
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