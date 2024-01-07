import { Box, Button, Center, FormControl, HStack, Heading, Input, Text, VStack,Spinner } from "native-base";
import { useState } from "react";
import firebase from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack,Link,router } from 'expo-router';
import { ForLogin1 } from '../../assets/svgs';
import { KeyboardAvoidingView, Platform ,Alert} from 'react-native';

const regis = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,SetName] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [image,setImage] = useState(null);
    const validateEmail = (email) => {
      // Regular expression for a valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const registerHandler = async () => {
      
      if (!name || !email || !password) {
        // Check if any of the required fields is empty
        Alert.alert("Perhatian", "Silahkan isi semua kolom");
        setShowAlert(true);
        return;
      }
      if (password.length < 6) {
        // Check if the password is less than 6 characters
        Alert.alert("Perhatian", "Password harus memiliki minimal 6 karakter");
        setShowAlert(true);
        return;
      }
      if (!validateEmail(email)) {
        // Check if the email format is valid
        Alert.alert("Perhatian", "Masukkan email dengan format yang benar");
        setShowAlert(true);
        return;
      }
      setLoading(true);
      firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        saveUserData(email, password, name, userCredential);
      }).catch((error) => {
        console.error(error);
      });
    };
    
    const saveUserData = async (email, password, name, credential) => {
      const userData = { email, password, name, credential };
      // console.log(userData); // Log userData
      try {
        await AsyncStorage.setItem("user-data", JSON.stringify(userData));
        // Extract email and name from userData and pass them to saveNamaDatabase
        saveNamaDatabase(userData.email, userData.name, userData);
        router.replace("/home");
      } catch (error) {
        console.error(error);
      }
    };
    
    const saveNamaDatabase = (email, name,userData) => {
      const data = {
        email,
        name
      };
      const uid = userData.credential.user.uid;
     // Include other userData properties
      firebase.database().ref("User/" + uid).push(data);
      router.replace("/home");
    };
    
    return (
      
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >

          <Stack.Screen options={{headerShown:false}}/>
          <Box flex={1}>
              <Box width={"full"} p={"10"} alignItems={"center"} h={"full"} pt={20} bg={"#D5DEEF"}>
                  <ForLogin1/>
                  <Heading mb={"6"}>Register</Heading>
                  <VStack space={"5"}>
                      <FormControl isRequired>
                          <Input type="text" w={"full"} placeholder="Masukkan Nama" borderRadius={"full"} onChangeText={(value) => SetName(value)} />
                      </FormControl>
                      <FormControl isRequired>
                          <Input type="text" w={"full"} placeholder="Masukkan Email" borderRadius={"full"} onChangeText={(value) => setEmail(value)} />
                      </FormControl>
                      <FormControl isRequired>
                          <Input type="password" w={"full"} placeholder="Masukkan Password" borderRadius={"full"} onChangeText={(value) => setPassword(value)} />
                      </FormControl>
                      {loading ? (
                        <Spinner accessibilityLabel="Loading" color="blue.500" />
                      ) : (
                        <Button colorScheme={"indigo"} borderRadius={"full"} onPress={registerHandler}>
                          Register
                        </Button>
                      )}
                      <HStack justifyContent={"center"}>
                          <Text>Sudah memiliki akun?</Text>
                          <Link _text={{ color: "indigo.50", fontWeight: "bold" }} href={'newloginscreen'} style={{color:'blue' ,textDecorationLine:'underline'}}>
                              Login
                          </Link>
                      </HStack>
                  </VStack>
              </Box>
          </Box>
      </KeyboardAvoidingView>
    )
};
export default regis