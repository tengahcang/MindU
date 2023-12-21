import React, { useState } from 'react';
import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';

function ProfilUser({email,name}) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View>
      <View style={{ backgroundColor: '#8AAEED',
    height: 74,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#E0E0E0',}}>
        <View style={{    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',}}>
          <View style={{    marginRight: 15,
    marginTop: 0,
    marginLeft: 18}}>
            <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{    width: 51,
    height: 51,
    borderRadius: 26,
    backgroundColor: '#D9D9D9'}} />
          </View>
          <View style={{ 
    flexDirection: 'column',
    alignItems: 'flex-start'}}>
            {/* <Text style={styles.name}>{name}</Text> */}
            <Text style={{ maxWidth: '100%',
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight:'700'}}> {name} </Text>
            {/* <Text style={styles.email}>{email}</Text> */}
            <Text style={{    maxWidth: '100%',
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight:'500'}}> {email} </Text>
          </View>
        </View>
        <View style={{marginRight: 20}}>
        </View>
      </View>
    </View>
  );
}



export default ProfilUser;