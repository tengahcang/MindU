import React, { useState } from 'react';
import { View, Input,Text } from 'native-base';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { PrimaryButton, Separator } from '../../components';
import { Stack } from 'expo-router';
const AddKategori = () => {
  const [currentColor, setCurrentColor] = useState('#000000'); // Default color or any initial color

  const warnaApa = (color) => {
    setCurrentColor(color);
  };
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  return (
    <View flex={1} padding={4} backgroundColor={'#D5DEEF'}>
      <Stack.Screen options={{headerTitle:"Add Kategori"}}/>
      <Text fontSize={20}>Nama Kategori</Text>
      <Input size="lg" placeholder="Isi Nama Kategori" />
      <Text fontSize={20}>Pilih Warna Border</Text>
      <ColorPicker
        onColorSelected={(color) => warnaApa(color)}
        onColorChange={(color) => warnaApa(fromHsv({ h: 200, s: 0.4, v: 8.4 }))}
        hideSliders={true}
        style={{ width: 200, height: 200 }}
      />
      <Input size="lg" placeholder="hex color" value={currentColor} />
      <Separator height={20}/>
      <PrimaryButton title="Tambah Kategori" color="#2196F3"/>
    </View>
  );
};

export default AddKategori;
