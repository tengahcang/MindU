import React from 'react';
import {
   StyleSheet, Text, View,TouchableOpacity
} from 'react-native';
import { DeleteIcon,EditIcon,CheckList } from '../../assets/svgs';
function Task() {
  return (
    <View style={styles.item}>
      <View>
        <TouchableOpacity>
            <CheckList width={36} height={36}/>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={2}>Nama Tugas</Text>
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

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    padding: 15,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  name: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});

export default Task;