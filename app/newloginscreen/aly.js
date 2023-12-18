import { Box, Button, Center, FormControl, HStack, Heading, Input, Text, VStack, Image } from "native-base";
import { useState } from "react";
import { Link, router } from "expo-router";
import firebase from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const noHead = { headerShown: false };

const regis = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const registerHandler = async () => { firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        saveUserData(name, email, password, userCredential);
      }).catch((error) => {
        console.error(error);
      })
    };
    const saveUserData = async (name, email, password, credential) => {
        const userData = { name, email, password, credential };
        try {
            await AsyncStorage.setItem("user-data", JSON.stringify(userData));
            router.replace("/home")
        }   catch (error) {
            console.error(error);
        }
    };
    
    return (
        <Center flex={1}>
            <Box width={"full"} p={"10"} alignItems={"center"} bg={"#D5DEEF"}>
                <Image
                    source={{ uri: ''}}
                    alt="Logo"
                    size={'lg'}
                    mb={'4'}
                />
                <Heading mb={"6"}>Register</Heading>
                <VStack space={"5"}>
                    <FormControl>
                        <Input type="text" w={"full"} placeholder="Masukkan Nama" borderRadius={"full"} onChangeText={(value) => setName(value)} />
                    </FormControl>
                    <FormControl>
                        <Input type="text" w={"full"} placeholder="Masukkan Email" borderRadius={"full"} onChangeText={(value) => setEmail(value)} />
                    </FormControl>
                    <FormControl>
                        <Input type="password" w={"full"} placeholder="Masukkan Password" borderRadius={"full"} onChangeText={(value) => setPassword(value)} />
                    </FormControl>
                    <Button colorScheme={"indigo"} borderRadius={"full"} onPress={registerHandler}>
                        Register
                    </Button>
                    <HStack justifyContent={"center"}>
                        <Text>Sudah memiliki akun?</Text>
                        <Link _text={{ color: "indigo.50", fontWeight: "bold" }} href={'logintest/logintest'}>
                            Login
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
};
export default regis