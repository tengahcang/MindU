import {
  Center,
  Heading,
  Button,
  VStack,
  FormControl,
  Input,
  Box,
  Text,
  HStack,
  Spinner,
} from "native-base";
import React ,{useState} from 'react'
import { Link } from "expo-router";


const logintest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginHandler = () => {
    // Verifikasi Login via Firebase
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Panggil method untuk Menyimpan data User ke AsyncStorage
        saveUserData(email, password, userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
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
              onPress={loginHandler}
            >
              Log in
            </Button>
            <HStack justifyContent={"center"}>
              <Text>I'm a new user. </Text>
              <Link
                _text={{ color: "indigo.500", fontWeight: "bold" }}
                href="registertest/registertest"
              >
                Register
              </Link>
            </HStack>
          </VStack>
        </Box>
      )}
    </Center>
  )
}

export default logintest
