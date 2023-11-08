import React, {useState, useEffect} from 'react';
import { View, Text, Input, InputField, Textarea, TextareaInput} from "@gluestack-ui/themed";
import DropDownPicker from 'react-native-dropdown-picker';
import { styled } from "@gluestack-style/react"
import { Select } from "native-base";

const Input = () => {
//   const [kategori, setKategori] = useState(
//     [
//         {
//             nama: 'Kuliah'
//         },
//         {
//             nama: 'Rumah'
//         },
//         {
//             nama: 'Kerja'
//         },
//     ]
// );

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Kuliah', value: 'kuliah'},
      {label: 'Rumah', value: 'rumah'},
      {label: 'Kerja', value: 'kerja'},
    ])

  return (
  <View style= {{marginBottom: 12}}>
    <Text style={{fontWeight: 'bold', fontSize: 18, padding: 10}} >
      Nama Task
    </Text>
    <View style={{
      width: "95%",
      marginLeft: 10,
      height: 48,
      borderColor: "#000",
      borderWidth: 2,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 22
    }}>
          <Input>
            <InputField type="text" />
          </Input>
    </View>

    <Text style={{fontWeight: 'bold', fontSize: 18, padding: 10}} >
      Kategori
    </Text>
    <View style={{
      width: "95%",
      marginLeft: 10,
    }}>
          <DropDownPicker style={{borderRadius: 15, borderColor: "#000",
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
      Catatan
    </Text>




      <Textarea style={{
  width: "95%",
  marginLeft: 10,
  borderColor: "#000",
  borderWidth: 2,
  borderRadius: 15,
  paddingLeft: 22,
  height: "30%",
      }}>
  <TextareaInput placeholder="" />
</Textarea>
  </View>
  )
}

export default Input;