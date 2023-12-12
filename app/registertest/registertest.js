import { Box, Button, Center, FormControl, HStack, Heading, Input, Text, VStack, } from "native-base";
import { useState } from "react";
import { Link, router } from 'expo-router';
import firebase from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const registertest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerHandler = async () => { firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      saveUserData(email, password, userCredential);
    }).catch((error) => {
      console.error(error);
    });
  };
  const saveUserData = async (email, password, credential) => {
    const userData = { email, password, credential };
    try {
      await AsyncStorage.setItem("user-data", JSON.stringify(userData));
      router.replace("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Center flex={1}>
      <Box width={"full"} p={"10"} alignItems={"center"}>
        <Heading mb={"6"}>Register Form</Heading>
        <VStack space={"5"}>
          <FormControl>
            <Input type="text" w={"full"} placeholder="Input your email" borderRadius={"full"} onChangeText={(value) => setEmail(value)} />
          </FormControl>
          <FormControl>
            <Input type="password" w={"full"} placeholder="Input your password" borderRadius={"full"} onChangeText={(value) => setPassword(value)} />
          </FormControl>
          <Button colorScheme="indigo" borderRadius={"full"} onPress={registerHandler} >
            Register
          </Button>
          <HStack justifyContent={"center"}>
            <Text>Already have an account? </Text>
            <Link _text={{ color: "indigo.500", fontWeight: "bold" }} href={'logintest/logintest'} >
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};
export default registertest