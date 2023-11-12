import { View, Text } from 'native-base'
import React,{useState} from 'react'
import { Input3,Separator,PrimaryButton } from '../../components'
import DropDownPicker from 'react-native-dropdown-picker';
const AddDeadline = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Kuliah', value: 'kuliah'},
      {label: 'Rumah', value: 'rumah'},
      {label: 'Kerja', value: 'kerja'},
    ]);
  return (
    <View p={5}>
      <Text fontSize={16} fontWeight={'semibold'}>Tanggal Selesai</Text>
      <Input3 type="Basic"/>
      <Separator height={20}/>
      <Text fontSize={16} fontWeight={'semibold'}>Jam :</Text>
      <DropDownPicker placeholder="19.00" style={{borderRadius: 15, borderColor: "#000",
      borderWidth: 2,}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}>
          </DropDownPicker>
          <Separator height={450}/>
          <View p={10}>
            <PrimaryButton title="Simpan dan Lanjutkan" color="#2196F3"/>
        </View> 
    </View>
  )
}

export default AddDeadline