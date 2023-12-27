import { Input, View, Text, Image,TextArea, ScrollView,Button,Box} from 'native-base'
import { Separator,PrimaryButton} from '../../components'
import React,{useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { UploadIcon } from '../../assets/svgs';
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import firebase from '../../config';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const edit = () => {


    return (
        <ScrollView >
            <Stack.Screen options={{headerTitle:"Edit Task"}}/>
            <View space={4} p={5}  mx="auto" style={{flex:1, backgroundColor:'#D5DEEF',}}>
                <Separator/>
                <Text bold>Nama Tugas</Text>
                <Input  size="md"
    borderColor="black"
    borderRadius={12}
    defaultValue={updatedTitle !== '' ? updatedTitle : params.title}
    onChangeText={handleTitleChange}/>
                <Text bold>Tanggal Selesai</Text>
                <View p={4}>
              <Button onPress={showDatepicker}>
                <Text>Pick a Date</Text>
              </Button>
              <Separator height={20}/>
              <Button onPress={showTimepicker}>
                <Text>Pick a Time</Text>
              </Button>
              {showDatePicker && (
                <DateTimePicker value={date} mode={"date"} is24Hour={true} onChange={onChangeDate} />
              )}
              {showTimePicker && (
                <DateTimePicker value={date} mode={"time"} is24Hour={true} onChange={onChangeTime} />
              )}
              <Separator height={20}/>
              <Box>
                <Text onChangeDate={(newDeadline)=>setDeadline(newDeadline)}>{Deadline}</Text>
              </Box>
              <View>
                { image && <Image source={{uri:image}} style={{width:300,height:300}} /> }
              </View>
            </View>
                <Text bold>Catatan</Text>
                <TextArea aria-label="t1Disabled"
    value={updatedCatatan || params.kategori}
    placeholder="Catatan"
    h={400}
    borderColor="black"
    borderRadius={12}
    borderStyle="solid"
    onChangeText={handleCatatanChange}/>
                <Text>Kategori</Text>
                <DropDownPicker open={open} value={value} items={dataKategori.map(item => ({
                label: item.Kategori,
                value: item.Kategori
              }))} setOpen={setOpen} setValue={setValue} />
            <Text fontSize={16} fontWeight={'semibold'} >Gambar Task</Text>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                <Image ml={5} flex={1} h={300} w={300}  resizeMode='contain' source={{ uri: UrlPic }}/>
                <TouchableOpacity onPress={pickimage}>
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