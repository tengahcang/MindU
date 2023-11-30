import { Input, View, Text, Image,TextArea, ScrollView} from 'native-base'
import { Separator,PrimaryButton} from '../../components'
import React,{useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { UploadIcon } from '../../assets/svgs';
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
const edit = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Kuliah', value: 'kuliah'},
      {label: 'Rumah', value: 'rumah'},
      {label: 'Kerja', value: 'kerja'},
    ]);
    return (
        <ScrollView >
            <Stack.Screen options={{headerTitle:"Edit Task"}}/>
            <View space={4} p={5}  mx="auto" style={{flex:1, backgroundColor:'#D5DEEF',}}>
                <Separator/>
                <Text bold>Nama Tugas</Text>
                <Input size="md" borderColor="black" borderRadius={12}/>
                <Text bold>Tanggal Selesai</Text>
                <Input size="md" borderColor="black" borderRadius={12}/>
                <Text bold>Catatan</Text>
                <TextArea aria-label="t1Disabled" placeholder="Catatan" h={400} borderColor="black" borderRadius={12} borderStyle="solid"/>
                <DropDownPicker placeholder="Pilih kategori" style={{borderRadius: 15, borderColor: "#000",
                    borderWidth: 2,}}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}>
            </DropDownPicker>
            <Text fontSize={16} fontWeight={'semibold'} >Gambar Task</Text>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                <Image ml={5} size={'2xl'} source={{uri:"https://wallpaperaccess.com/full/317501.jpg"}}/>
                <TouchableOpacity>
                    <UploadIcon/>
                </TouchableOpacity>
            </View>
            <Separator height={20}/>
            <PrimaryButton title="Simpan Perubahan" color="#2196F3" fs={16}/>
            <Separator height={20}/>
            </View>
        </ScrollView>
    );
  };

export default edit;