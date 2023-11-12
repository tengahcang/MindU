import { Input, Stack, Text, Image,TextArea, ScrollView,} from 'native-base'
import { Separator,PrimaryButton} from '../../components'
import { View } from 'react-native'
import React,{useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { UploadIcon } from '../../assets/svgs';

const edit = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Kuliah', value: 'kuliah'},
      {label: 'Rumah', value: 'rumah'},
      {label: 'Kerja', value: 'kerja'},
    ]);
    return (
        <ScrollView>
            <Stack space={4} w="80%"  mx="auto">
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
                <UploadIcon/>
            </View>
            <Separator height={20}/>
            <PrimaryButton title="Simpan Perubahan" color="#2196F3"/>
            <Separator height={20}/>
            </Stack>
        </ScrollView>
    );
  };

export default edit;