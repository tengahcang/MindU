import React,{useState} from 'react'
import { NavbarTopNew, Separator, Task} from '../../components'
import { ScrollView ,Box,Text, Center} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import datas from '../../todolist'
const Home = () => {
  const [isHaveData, setisHaveData] = useState(false);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew/>
      <Box background={'white'} w={173} h={27} borderRadius={12} marginTop={3} marginLeft={2} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={12} fontWeight={'semibold'}>Selasa, 24 Desember 2023</Text>
      </Box>
      {isHaveData ? (
        <Center flex={1}>
          <Text fontWeight={"bold"} fontSize={16}>TIDAK ADA TUGAS HARI INI</Text>
        </Center>
      ) : (
<ScrollView padding={5}>
        <Separator height={20}/>
        <Task title={"Task1"}/>
        <Separator height={5}/>
        <Task title={"Task2"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
        <Task title={"pengen ke bali"}/>
        <Separator height={5}/>
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;