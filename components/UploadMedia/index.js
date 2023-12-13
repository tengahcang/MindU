import { View, Text, Alert, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import firebase from '../../config'


const uploadmedia = () => {
    const [image,setImage] = useState(null);
    const [uploading,setUploading] = useState(false);
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
    }

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

            await ref.put(blob);
            setUploading(false);
            Alert.alert("photo Upload");
            setImage(null);
        }catch(error){
            console.error(error);
            setUploading(false);
        }
    };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={pickimage}>
        <Text>Pick Image</Text>
      </TouchableOpacity>
      <View>
        {image && <Image 
        source={{uri:image}}
        style={{width:300,height:300}} />
        }
      </View>
      <TouchableOpacity onPress={uploadmedia}>
        <Text>UploadKan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default uploadmedia