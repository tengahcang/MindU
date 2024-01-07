import { View, Button ,Input,Text,TextArea, ScrollView, FormControl ,Box} from 'native-base'
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
import DropDownPicker from 'react-native-dropdown-picker';
import { useLocalSearchParams } from 'expo-router';

const edit = () => {
  const params = useLocalSearchParams();
  const moment = require('moment');
  const formattedDateString = moment(params.deadline, 'MM/DD/YYYY, h:mm:ss A').toISOString();
  const [date, setDate] = useState(new Date(formattedDateString));
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [Tugas,setTugas] = useState(params.title);
  const [Catatan,setCatatan] = useState(params.catatan);
  const [Kategori,setKategori] = useState();
  const [Deadline,setDeadline] = useState(new Date(formattedDateString).toLocaleString());
  const [image,setImage] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [userData, setUserData] = useState({});
  const [value, setValue] = useState(params.kategori);
  const [dataKategori,setDataKategori] = useState([]);
  const imageRef = params.foto ? firebase.storage().ref(params.foto) : null;
  console.log(params)
  useEffect(() => {
    getUserData();
    if (imageRef) {
      getpic();
    }
  }, []);
  const getpic = () => {
    if (!imageRef) {
      console.warn('Referensi gambar tidak ditemukan.');
      // Set UrlPic ke nilai default atau kosong sesuai kebutuhan aplikasi Anda
      setImage(null); // atau setUrlPic(''); atau setUrlPic(DEFAULT_URL);
      return;
    }

    imageRef
      .getDownloadURL()
      .then((url) => {
        // Gunakan URL ini untuk menampilkan gambar di aplikasi Anda
        console.log('URL gambar:', url);
        setImage(url);
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          console.warn('Gambar tidak ditemukan.');
          // Set UrlPic ke nilai default atau kosong sesuai kebutuhan aplikasi Anda
          setImage(null); // atau setUrlPic(''); atau setUrlPic(DEFAULT_URL);
        } else {
          console.error('Error mendapatkan URL gambar:', error);
        }
      });
  };
  const update = async () => {
    if (image !== null) {
        if (image && image.startsWith('file://')) {
          updateDataWithImageToFirebase();
        }else {
          updateDataWithImageNoChanggeToFirebase(Tugas,Catatan,params.foto,value,Deadline,params.ID);
        }
      }else{
        updateDataToFirebase(Tugas,Catatan,value,Deadline,params.ID);
        // console.log(Tugas,Catatan,value,Deadline)
      }
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
  const updateDataWithImageNoChanggeToFirebase = async(Tugas, Catatan, Foto, Kategori, Deadline, ID) => {
    try {
      const data = {
        NamaTugas:  Tugas,
        TugasCatatan:  Catatan,
        KategoriTugas: Kategori,
        DeadlineTugas:  Deadline,
        LampiranFoto: Foto
      };
      const uid = userData.credential.user.uid;
      const noteRef = firebase.database().ref("Task/"+uid + "/" + ID);
        const snapshot = await noteRef.once("value");
        const existingNote = snapshot.val();
        if (existingNote) {
          const updatedNote = {
            ...existingNote,
            ...data,
          };
          await noteRef.update(updatedNote);
        } else {
          console.log("Note not found");
        }
      // firebase.database().ref("Task/" + uid).push(data);
      // router.replace("/home")
      router.replace("/home")
    } catch (error) {
      throw error;
    }
  };
  const updateDataToFirebase = async(Tugas, Catatan, Kategori, Deadline, ID) => {
    try {
      const data = {
        NamaTugas:  Tugas,
        TugasCatatan:  Catatan,
        KategoriTugas: Kategori,
        DeadlineTugas:  Deadline,
        LampiranFoto: null
      };
      const uid = userData.credential.user.uid;
      const noteRef = firebase.database().ref("Task/"+uid + "/" + ID);
        const snapshot = await noteRef.once("value");
        const existingNote = snapshot.val();
        if (existingNote) {
          const updatedNote = {
            ...existingNote,
            ...data,
          };
          await noteRef.update(updatedNote);
        } else {
          console.log("Note not found");
        }
      // firebase.database().ref("Task/" + uid).push(data);
      // router.replace("/home")
      router.replace("/home")
    } catch (error) {
      throw error;
    }
  };
  const updateDataWithImageToFirebase = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/')+1);
    const ref = firebase.storage().ref().child(filename);
    try {
      await ref.put(blob);
      updatedata(Tugas, Catatan, Deadline, value, filename, params.ID);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
        ambilkategori(valueObject);
        // console.log(dataKategori);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const ambilkategori = (userData) => {
    const uid = userData.credential.user.uid;
    const dataref = firebase.database().ref("Kategori/"+uid);
    dataref.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue != null) {
        const snapshotArr = Object.entries(dataValue).map((item) => {
          return {
            id: item[0],
            ...item[1],
          };
        });
        setDataKategori(snapshotArr);
      }
    })
  };
  const updatedata = async (Tugas,Catatan,Deadline,Kategori,filename,ID) =>{
    try {
      const data = {
        NamaTugas:  Tugas,
        TugasCatatan:  Catatan,
        KategoriTugas: Kategori,
        DeadlineTugas:  Deadline,
        LampiranFoto:  filename
      };
      const uid = userData.credential.user.uid;
      const noteRef = firebase.database().ref("Task/"+uid + "/" + ID);
        const snapshot = await noteRef.once("value");
        const existingNote = snapshot.val();
        if (existingNote) {
          const updatedNote = {
            ...existingNote,
            ...data,
          };
          await noteRef.update(updatedNote);
        } else {
          console.log("Note not found");
        }
      // firebase.database().ref("Task/" + uid).push(data);
      // router.replace("/home")
      router.replace("/home")
    } catch (error) {
      throw error;
    }
    
    // console.log(data);
    // const uid = userData.credential.user.uid;
    // firebase.database().ref("Task/" + uid).push(data);
    // router.replace("/home")
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
        <Stack.Screen options={{headerTitle:"Edit Task"}}/>
        <ScrollView >
          <FormControl>
            <View p={4}>
              <Text fontSize={20}>Nama Tugas</Text>
              <Input size="lg" placeholder="Isi Nama Tugas" defaultValue={Tugas} onChangeText={(Tugas) => setTugas(Tugas)} />
              <Text fontSize={20}>kategori Tugas</Text>
              <DropDownPicker open={open} value={value} defaultValue={value} items={dataKategori.map(item => ({
                label: item.Kategori,
                value: item.Kategori
              }))} setOpen={setOpen} setValue={setValue} />
              <Text fontSize={20}>Tugas Catatan</Text>
              <TextArea size="lg" placeholder="Isi Catatan Tugas" defaultValue={Catatan} onChangeText={(Catatan) => setCatatan(Catatan)} />
              <Text fontSize={20}>Deadline Tugas</Text>
            </View>
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
              {/* <Input size="lg"  placeholder="Isi Deadline Tugas" value={Deadline} onChangeDate={(newDeadline)=>setDeadline(newDeadline)} /> */}
              <TouchableOpacity onPress={pickimage}>
                <Text>Pick Image</Text>
              </TouchableOpacity>
              <View>
                { image && <Image source={{uri:image}} style={{width:300,height:300}} /> }
              </View>
            </View>
            <View p={10}>
              <PrimaryButton title="Simpan" color="#2196F3" onPress={()=>update()}/>
            </View>
          </FormControl>  
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default edit;



// import { Input, View, Text, Image,TextArea, ScrollView,Button,Box} from 'native-base'
// import { Separator,PrimaryButton} from '../../components'
// import React,{useState} from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { UploadIcon } from '../../assets/svgs';
// import { Stack } from 'expo-router'
// import { TouchableOpacity } from 'react-native'
// import { useLocalSearchParams } from 'expo-router';
// import { useEffect } from 'react';
// import firebase from '../../config';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// const edit = () => {
//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [Tugas,setTugas] = useState("");
//   const [Catatan,setCatatan] = useState("");
//   const [Kategori,setKategori] = useState();
//   const [Deadline,setDeadline] = useState(new Date().toLocaleString());
//   const [image,setImage] = useState(null);
//   const [uploading,setUploading] = useState(false);
//   const [userData, setUserData] = useState({});
//   const [value, setValue] = useState(null);
//   const [dataKategori,setDataKategori] = useState([]);
//   useEffect(() => {
//     getUserData();
//   }, []);
//   const simpan = async () => {
//     if (image !== null) {
//         uploadDataWithImageToFirebase();
//       }else{
//         uploadDataToFirebase(Tugas,Catatan,value,Deadline);
//       }
//   };
//   const pickimage = async ()=>{
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes:ImagePicker.MediaTypeOptions.All,
//       allowsEditing:true,
//       aspect: undefined,
//       quality:1,
//     });
//     if(!result.canceled){
//       setImage(result.assets[0].uri);
//     }
//   };
//   const uploadDataToFirebase = (Tugas, Catatan, Kategori, Deadline) => {
//     const data = {
//       NamaTugas:  Tugas,
//       TugasCatatan:  Catatan,
//       KategoriTugas: Kategori,
//       DeadlineTugas:  Deadline,
//       LampiranFoto: null
//     };
//     const uid = userData.credential.user.uid;
//     firebase.database().ref("Task/" + uid).push(data);
//     router.replace("/home")
//   };
//   const uploadDataWithImageToFirebase = async () => {
//     const response = await fetch(image);
//     const blob = await response.blob();
//     const filename = image.substring(image.lastIndexOf('/')+1);
//     const ref = firebase.storage().ref().child(filename);
//     try {
//       await ref.put(blob);
//       adddata(Tugas, Catatan, Deadline,value, filename);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw error;
//     }
//   };
//   const getUserData = async () => {
//     try {
//       const value = await AsyncStorage.getItem("user-data");
//       if (value !== null) {
//         const valueObject = JSON.parse(value);
//         setUserData(valueObject);
//         ambilkategori(valueObject);
//         console.log(dataKategori);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   const ambilkategori = (userData) => {
//     const uid = userData.credential.user.uid;
//     const dataref = firebase.database().ref("Kategori/"+uid);
//     dataref.once("value").then((snapshot) => {
//       const dataValue = snapshot.val();
//       if (dataValue != null) {
//         const snapshotArr = Object.entries(dataValue).map((item) => {
//           return {
//             id: item[0],
//             ...item[1],
//           };
//         });
//         setDataKategori(snapshotArr);
//       }
//     })
//   };
//   const adddata = (Tugas,Catatan,Deadline,Kategori,filename) =>{
//     const data = {
//       NamaTugas:  Tugas,
//       TugasCatatan:  Catatan,
//       KategoriTugas: Kategori,
//       DeadlineTugas:  Deadline,
//       LampiranFoto:  filename
//     };
//     // console.log(data);
//     const uid = userData.credential.user.uid;
//     firebase.database().ref("Task/" + uid).push(data);
//     router.replace("/home")
//   };
//   const onChangeDate = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setDate(selectedDate);
//       setDeadline(selectedDate,toLocaleString());
//     }
//   };
//   const onChangeTime = (event, selectedDate) => {
//     setShowTimePicker(false);
//     if (selectedDate) {
//       setDate(selectedDate);
//       setDeadline(selectedDate.toLocaleString());
//     }
//   };
//   const showDatepicker = () => {
//     setShowDatePicker(true);
//     setShowTimePicker(false); // Menutup TimePicker jika terbuka
//   };
//   const showTimepicker = () => {
//     setShowTimePicker(true);
//     setShowDatePicker(false); // Menutup DatePicker jika terbuka
//   };

//   return (
//     <ScrollView >
//       <Stack.Screen options={{headerTitle:"Edit Task"}}/>
//       <View space={4} p={5}  mx="auto" style={{flex:1, backgroundColor:'#D5DEEF',}}>
//         <Separator/>
//         <Text bold>Nama Tugas</Text>
//         <Input  size="md" borderColor="black" borderRadius={12} defaultValue={updatedTitle !== '' ? updatedTitle : params.title} onChangeText={handleTitleChange} />
//         <Text bold>Tanggal Selesai</Text>
//         <View p={4}>
//           <Button onPress={showDatepicker}>
//             <Text>Pick a Date</Text>
//           </Button>
//           <Separator height={20}/>
//           <Button onPress={showTimepicker}>
//             <Text>Pick a Time</Text>
//           </Button>
//           {showDatePicker && (
//             <DateTimePicker value={date} mode={"date"} is24Hour={true} onChange={onChangeDate} />
//           )}
//           {showTimePicker && (
//             <DateTimePicker value={date} mode={"time"} is24Hour={true} onChange={onChangeTime} />
//           )}
//           <Separator height={20}/>
//           <Box>
//             <Text onChangeDate={(newDeadline)=>setDeadline(newDeadline)}>{Deadline}</Text>
//           </Box>
//           <View>
//             { image && <Image source={{uri:image}} style={{width:300,height:300}} /> }
//           </View>
//         </View>
//         <Text bold>Catatan</Text>
//         <TextArea aria-label="t1Disabled" value={updatedCatatan || params.kategori} placeholder="Catatan" h={400} borderColor="black" borderRadius={12} borderStyle="solid" onChangeText={handleCatatanChange} />
//         <Text>Kategori</Text>
//         <DropDownPicker open={open} value={value} items={dataKategori.map(item => ({ label: item.Kategori, value: item.Kategori }))} setOpen={setOpen} setValue={setValue} />
//         <Text fontSize={16} fontWeight={'semibold'} >Gambar Task</Text>
//         <View style={{flexDirection:'row',alignItems:'flex-end'}}>
//           <Image ml={5} flex={1} h={300} w={300}  resizeMode='contain' source={{ uri: UrlPic }}/>
//           <TouchableOpacity onPress={pickimage}>
//             <UploadIcon/>
//           </TouchableOpacity>
//         </View>
//         <Separator height={20}/>
//         <PrimaryButton title="Simpan Perubahan" color="#2196F3" fs={16}/>
//         <Separator height={20}/>
//       </View>
//     </ScrollView>
//   );
//   };

// export default edit;