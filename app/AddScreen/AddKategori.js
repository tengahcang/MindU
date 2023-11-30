import React, { useState } from 'react';
import { View } from 'react-native';
import { Item, Input } from 'native-base';
import { ColorPicker } from 'react-native-color-picker'

const AddKategori = () => {
  const [selectedColor, setSelectedColor] = useState('#00ff00'); 

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <View>
      <ColorPicker
        onColorSelected={handleColorChange}
        style={{ flex: 1 }}
      />
      <Item style={{ marginTop: 10 }}>
        <Input
          value={selectedColor}
          placeholder="Hex Color"
          onChangeText={(text) => setSelectedColor(text)}
        />
      </Item>
    </View>
  );
};

export default AddKategori;
