import React from 'react'
import { Box ,HStack,Image,Text,View} from 'native-base'
import { NotifikasiIcon } from '../../assets/svgs'
import { TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
const NavbarTopNew = ( {name} ) => {
  return (

        <Box flexDirection={"row"} background={"#A9BFE1"} h={68} alignItems={'center'} justifyContent={'space-between'}>
            <HStack alignItems={'center'} mx={2}>
                <Image w={39} h={38} borderRadius={100} source={{
                    uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                }} alt="image" />
                <Text fontSize={15} fontWeight={'semibold'} mx={2}>Hi,{name} </Text>
                <Text></Text>
            </HStack>
            
            <TouchableOpacity style={{marginRight:5}}>
                <Link href={"/notifikasi/notifikasi"}>
                    <NotifikasiIcon/>
                </Link>
            </TouchableOpacity>
        </Box>
  )
}

export default NavbarTopNew