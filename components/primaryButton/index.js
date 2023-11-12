import React from 'react';
import {  Text, TouchableOpacity } from 'react-native';

function PrimaryButton({ title ,color }) {
  return (
    <TouchableOpacity style={{    height: 40,
      backgroundColor: color,
      alignItems: 'center',
      borderRadius: 12,}}>
      <Text style={{    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
    fontWeight:'700'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;

