import { View, Button ,Input,Text,TextArea, ScrollView, FormControl ,Box} from 'native-base'
import React ,{useState,useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../config';
import { TouchableOpacity, Alert, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { PrimaryButton } from '../../components';
import { useLocalSearchParams ,router} from 'expo-router';
const EditProfile = () => {
    const params = useLocalSearchParams();
    const [name,SetName] = useState(params.name);
    const [image,setImage] = useState(null);
    const [userData, setUserData] = useState({});
    const imageRef = params.foto ? firebase.storage().ref(params.foto) : null;
    console.log('tai',params)
    console.log('co',name)
    useEffect(() => {
      getUserData();
      if (imageRef) {
        getpic();
      }
    }, []);
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("user-data");
        if (value !== null) {
          const valueObject = JSON.parse(value);
          setUserData(valueObject);
          // console.log(dataKategori);
        }
      } catch (e) {
        console.error(e);
      }
    };
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
      const update = async () => {
        if (image !== null) {
            if (image && image.startsWith('file://')) {
              updateDataWithImageToFirebase();
            }else {
              updateDataWithImageNoChanggeToFirebase(params.name,params.foto,params.ID);
            }
          }else{
            updateDataToFirebase(params.name,params.ID);
            // console.log(Tugas,Catatan,value,Deadline)
          }
      };
      const updateDataWithImageNoChanggeToFirebase = async(name, Foto, ID) => {
        try {
          const data = {
            name:  name,
            PhotoProfile: Foto
          };
          const uid = userData.credential.user.uid;
          const noteRef = firebase.database().ref("User/"+uid + "/" + ID);
            const snapshot = await noteRef.once("value");
          router.replace("/home")
        } catch (error) {
          throw error;
        }
      };
      const updateDataToFirebase = async (name, ID) => {
        try {
          const data = {
            name: name,
            PhotoProfile: null,
          };
          const uid = userData.credential.user.uid;
          const noteRef = firebase.database().ref("User/" + uid + "/" + ID);
          const snapshot = await noteRef.once("value");
      
          // firebase.database().ref("Task/" + uid).push(data);
          // router.replace("/home")
          router.replace("/home");
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
          updatedata(name, filename, params.ID);
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      };

      const updatedata = async (name,filename,ID) =>{
        try {
          const data = {
            name:  name,
            PhotoProfile:  filename
          };
          const uid = userData.credential.user.uid;
          const noteRef = firebase.database().ref("User/"+uid + "/" + ID);
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

  return (
<View style={{backgroundColor:'#D5DEEF'}} h={"100%"}>
      <SafeAreaView>
        <Stack.Screen options={{headerTitle:"Edit Profile"}}/>
        <ScrollView >
          <FormControl>
            <View p={4}>
              <Text fontSize={20}>Nama Pengguna</Text>
              <Input size="lg" placeholder="Isi Nama Tugas" defaultValue={name} onChangeText={(Tugas) => SetName(Tugas)} />
              <Text fontSize={20}>Photo Profile</Text>
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
  )
}

export default EditProfile