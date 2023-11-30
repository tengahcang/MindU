import React from 'react'
import { Heading,View ,ScrollView} from 'native-base'
import { NavbarTopNew, PrimaryButton ,Task,Separator} from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Center from 'native-base/src/theme/components/center';

const categori = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew/>
      <Heading mt={10} ml={5}>Kategori</Heading>
      <View flexDirection={"row"}>
        <View w={107} m={2}>
          <PrimaryButton title={"Kuliah"} color={"#2196F3"} fs={16}/>
        </View>
        <View w={107} m={2}>
          <PrimaryButton title={"Kerja"} color={"#FF1493"}fs={16}/>
        </View>
        <View w={107} m={2}>
          <PrimaryButton title={"Rumah"} color={"#30C10B"}fs={16}/>
        </View>
      </View>
      
      <Link href="/Arsip/Arsip" style={{textAlign:'center',justifyContent:'center'}}>
        <View w={322}>
          <PrimaryButton title={"Arsip"} color={"#FFBE55"}fs={16}/>
        </View>
      </Link>
      <Separator height={20}/>
      <ScrollView p={5}>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
        <Task title="Pengen ke bali"/>
        <Separator height={5}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default categori