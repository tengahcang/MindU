import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Link } from 'expo-router'

const registertest = () => {
    const registerHandler = async () => {
        // Proses Buat User via Firebase
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Panggil method untuk menyimpan data ke AsyncStorage
            saveUserData(email, password, userCredential);
          })
          .catch((error) => {
            console.error(error);
          });
      };
  return (
    <Center flex={1}>
      <Box width={"full"} p={"10"} alignItems={"center"}>
        <Heading mb={"6"}>Register Form</Heading>
        <VStack space={"5"}>
          <FormControl>
            <Input
              type="text"
              w={"full"}
              placeholder="Input your email"
              borderRadius={"full"}
              onChangeText={(value) => setEmail(value)}
            />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              w={"full"}
              placeholder="Input your password"
              borderRadius={"full"}
              onChangeText={(value) => setPassword(value)}
            />
          </FormControl>
          <Button
            colorScheme="indigo"
            borderRadius={"full"}
            onPress={registerHandler}
          >
            Register
          </Button>
          <HStack justifyContent={"center"}>
            <Text>Already have an account? </Text>
            <Link
              _text={{ color: "indigo.500", fontWeight: "bold" }}
                href={'logintest/logintest'}
            >
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default registertest