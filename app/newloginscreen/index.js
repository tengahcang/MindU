import React ,{useEffect, useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Text, Input,Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Stack,Link,router } from 'expo-router';

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigation = router();
  const auth = getAuth();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      // Ambil data dari AsyncStorage
      const userData = await AsyncStorage.getItem("user-data");
      if (userData !== null) {
        // Diarahkan ke Halaman Home
        router.replace("/home");
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const login = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      // const user = userCredential.user
      saveUserData(email, password, userCredential);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  const saveUserData = async (email, password, credential) => {
    const userData = { email, password, credential };
    try {
      // Menyimpan data ke AsyncStorage
      await AsyncStorage.setItem("user-data", JSON.stringify(userData));
      // Diarahkan ke Home
      router.replace("/home")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <> 
    <Stack.Screen options={{headerShown:false}}/>
    <Box  flex={1} justifyContent={'center'} alignItems={'center'} p={16} backgroundColor={'#D5DEEF'}>
      <Text fontSize={30} fontWeight={'bold'} mb={2}>Welcome Back</Text>
      <Text fontSize={16} fontWeight={'bold'} mb={10}>We’re Glad you”re here</Text>
      <Text fontSize={16} mb={1}>Email</Text>
      <Box h={20}>
        <Input
           borderColor={'gray.400'} borderWidth={1} mb={2} pl={8} w={'100%'}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </Box>
      <Text fontSize={16} mb={1}>Password</Text>
      <Box h={20}>
        <Input
           borderColor={'gray.400'} borderWidth={1} mb={2} pl={8} w={'100%'}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />
      </Box>

      <TouchableOpacity>
        <Box backgroundColor={'blue.700'} w={'100'}>
          <Button colorScheme="indigo" borderRadius={"full"} onPress={login} > Log in </Button>
        </Box>
      </TouchableOpacity>
      <Box flexDirection={'row'} marginTop={16}>
        <Text fontSize={14} marginRight={2}>Don't have an account?</Text>
        <TouchableOpacity >
          <Link  href="newresgisscreen" style={{color:'blue' ,textDecorationLine:'underline'}}> Register </Link>
        </TouchableOpacity>
      </Box>
    </Box>
    </>
  );
}
export default Login;
