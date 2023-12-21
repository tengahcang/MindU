import { Center, Heading, Button, VStack, FormControl, Input, Box, Text, HStack, Spinner, } from "native-base";
import React ,{useEffect, useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";


const logintest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigation = router();  
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
    <Center flex={1}>
      {isLoading ? (
        <Spinner size={"lg"} color={"black"} />
      ) : (
        <Box width={"full"} p={"10"} alignItems={"center"}>
          <Heading mb={"6"}>Login Form</Heading>
          <VStack space={"5"}>
            <FormControl>
              <Input type="text" w={"full"} placeholder="Input your email" borderRadius={"full"} onChangeText={(value) => setEmail(value)} />
            </FormControl>
            <FormControl>
              <Input type="password" w={"full"} placeholder="Input your password" borderRadius={"full"} onChangeText={(value) => setPassword(value)} />
            </FormControl>
            <Button colorScheme="indigo" borderRadius={"full"} onPress={login} > Log in </Button>
            <HStack justifyContent={"center"}>
              <Text> I'm a new user. </Text>
              <Link _text={{ color: "indigo.500", fontWeight: "bold" }} href="registertest/registertest" > Register </Link>
            </HStack>
          </VStack>
        </Box>
      )}
    </Center>
  );
}

export default logintest
