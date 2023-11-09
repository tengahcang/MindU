import React, {useState, useEffect} from 'react';
import { View, Text, TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


const Input = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Kuliah', value: 'kuliah'},
    {label: 'Rumah', value: 'rumah'},
    {label: 'Kerja', value: 'kerja'},
  ]);

  return (
  
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 18, padding: 10}} >
      Nama Task
    </Text>
    <View>
          <TextInput style={{width: "95%",
      marginLeft: 10,
      height: 48,
      borderColor: "#000",
      borderWidth: 2,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 22 }} placeholder="Masukkan Nama Task" />
      </View>
    

    <Text style={{fontWeight: 'bold', fontSize: 18, padding: 10}} >
      Kategori
    </Text>
    <View style={{
      width: "95%",
      marginLeft: 10,
    }}>
          <DropDownPicker placeholder="Pilih kategori" style={{borderRadius: 15, borderColor: "#000",
      borderWidth: 2,}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}>
          </DropDownPicker>

      </View>

      <Text style={{fontWeight: 'bold', fontSize: 18, padding: 10}} >
      Nama Task
    </Text>
    <View style={{width: "95%",
      marginLeft: 10,
      height: 150,}}>
          <TextInput placeholder="Masukkan Catatan" multiline={true}
          numberOfLines={10} style={{
      borderColor: "#000",
      borderWidth: 2,
      borderRadius: 15,
      paddingLeft: 22,
      padding: 12,
      textAlignVertical: "top" }}/>
      </View>
      
    </View>
  );
}

export default Input;