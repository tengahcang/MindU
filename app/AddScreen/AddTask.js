import { View, Button ,Input,Text,TextArea, ScrollView, FormControl } from 'native-base'
import React ,{useState,useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Separator, PrimaryButton} from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import firebase from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const add = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [Tugas,setTugas] = useState("");
  const [Catatan,setCatatan] = useState("");
  // const [Gambar,setGambar] = useState();
  const [Deadline,setDeadline] = useState(new Date().toLocaleString());
  const [image,setImage] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  
  const simpan = async () => {
    
      // console.log(Deadline)  
    if (image !== null) {
        uploadDataWithImageToFirebase();
      }else{
        uploadDataToFirebase(Tugas,Catatan,Deadline);
      }
      // const uploadedFilename = await uploadImageToFirebase();
      // setGambar(uploadedFilename);
      // console.log('gambar:',Gambar)
      // Lakukan hal lain setelah upload selesai
    
      // Handle error jika upload gagal
    
    
  };
  const pickimage = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect: undefined,
      quality:1,
    });
    if(!result.canceled){
      setImage(result.assets[0].uri);
    }
    
  };
  const uploadDataToFirebase = (Tugas, Catatan, Deadline) => {
    const data = {
      NamaTugas:  Tugas,
      TugasCatatan:  Catatan,
      DeadlineTugas:  Deadline,
      LampiranFoto: null
    };
    // console.log(data);
    const uid = userData.credential.user.uid;
    firebase.database().ref("Task/" + uid).push(data);
    router.replace("/home")
  };
  const uploadDataWithImageToFirebase = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    const filename = image.substring(image.lastIndexOf('/')+1);
    const ref = firebase.storage().ref().child(filename);

    try {
      await ref.put(blob);
      // console.log('Image uploaded:', filename);
      // console.log(Tugas, Catatan, Deadline, filename);
      adddata(Tugas, Catatan, Deadline, filename);
      // return setGambar(filename);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  const getUserData = async () => {
    try {
      // Ambil data dari AsyncStorage
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value);
        // Update value state bernama "data"
        setUserData(valueObject);
        // Fetch Data
        // fetchData(valueObject);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const adddata = (Tugas,Catatan,Deadline,filename) =>{
    const data = {
      NamaTugas:  Tugas,
      TugasCatatan:  Catatan,
      DeadlineTugas:  Deadline,
      LampiranFoto:  filename
    };
    // console.log(data);
    const uid = userData.credential.user.uid;
    firebase.database().ref("Task/" + uid).push(data);
    router.replace("/home")
  };

  // uploadmediafiles
  const uploadmedia = async () => {
    setUploading(true);
    try{
      const {uri} = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve,reject) => { 
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) =>{
          reject(new TypeError('Ntework request failed'))
        };
        xhr.responseType = 'blob'
        xhr.open('GET',uri,true);
        xhr.send(null)
      });
      const filename = image.substring(image.lastIndexOf('/')+1);
      const ref = firebase.storage().ref().child(filename);
      Gambar=>setGambar(filename);
      await ref.put(blob);
      setUploading(false);
      setImage(null);

    }catch(error){
      console.error(error);
      setUploading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
      setDeadline(selectedDate,toLocaleString());

    }
  };

  const onChangeTime = (event, selectedDate) => {
    setShowTimePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
      setDeadline(selectedDate.toLocaleString());
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
    setShowTimePicker(false); // Menutup TimePicker jika terbuka
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
    setShowDatePicker(false); // Menutup DatePicker jika terbuka
  };
  return (
    <View style={{backgroundColor:'#D5DEEF'}} h={"100%"}>

      <SafeAreaView>
        <Stack.Screen options={{headerTitle:"Add Task"}}/>
        <ScrollView >
          <FormControl>
            <View p={4}>
              <Text fontSize={20}>Nama Tugas</Text>
              <Input size="lg" placeholder="Isi Nama Tugas" onChangeText={(Tugas) => setTugas(Tugas)} />
              <Text fontSize={20}>Tugas Catatan</Text>
              <TextArea size="lg" placeholder="Isi Catatan Tugas" onChangeText={(Catatan) => setCatatan(Catatan)} />
              <Text fontSize={20}>Deadline Tugas</Text>
            {/* Button to show DateTimePicker for Date */}
            </View>
            <View p={4}>
            <Button onPress={showDatepicker}>
              <Text>Pick a Date</Text>
            </Button>
            <Separator height={20}/>
            {/* Button to show DateTimePicker for Time */}
            <Button onPress={showTimepicker}>
              <Text>Pick a Time</Text>
            </Button>

            {/* Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}

            {/* Time Picker */}
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode={"time"}
                is24Hour={true}
                onChange={onChangeTime}
              />
            )}
            <Separator height={20}/>
            {/* Display selected date and time */}
            <Input size="lg" placeholder="Isi Deadline Tugas" value={Deadline} onChangeDate={(newDeadline)=>setDeadline(newDeadline)} />

            {/* <UploadMedia/> */}
            <TouchableOpacity onPress={pickimage}>
              <Text>Pick Image</Text>
            </TouchableOpacity>
            <View>
              {image && <Image 
              source={{uri:image}}
              style={{width:300,height:300}} />
              }
            </View>
            {/* <TouchableOpacity onPress={uploadmedia}>
              <Text>UploadKan</Text>
            </TouchableOpacity> */}
            </View>
            <View p={10}>
              <PrimaryButton title="Simpan" color="#2196F3" onPress={()=>simpan()}/>
            </View>
          </FormControl>
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default add;