import React,{useState,useEffect} from 'react'
import { NavbarTopNew, Separator, Task} from '../../components'
import { ScrollView ,Box,Text, Center, Spinner} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import datas from '../../todolist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../config';


const Home = () => {
  const [isHaveData, setisHaveData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [dataKategori,setDataKategori] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
        ambilkategori(valueObject);
        fetchData(valueObject);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const fetchData = (userData) => {
    const uid = userData.credential.user.uid;
    const dataRef = firebase.database().ref("Task/" + uid);
    dataRef.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue != null) {
        const snapshotArr = Object.entries(dataValue).map((item) => {
          return {
            id: item[0],
            ...item[1],
          };
        });
        setData(snapshotArr);
      }
      setIsLoading(false);
      }).catch((e) => {
        console.error(e);
      });
  };
  const ambilkategori = (userData) => {
    const uid = userData.credential.user.uid;
    const dataref = firebase.database().ref("Kategori/"+uid);
    dataref.once("value").then((snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue != null) {
        const snapshotArr = Object.entries(dataValue).map((item) => {
          return {
            id: item[0],
            ...item[1],
          };
        });
        setDataKategori(snapshotArr);
      }
    })
  };
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew name={ userData.name } />
      <Box background={'white'} w={173} h={27} borderRadius={12} marginTop={3} marginLeft={2} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={12} fontWeight={'semibold'}>Selasa, 24 Desember 2023</Text>
      </Box>
      <SafeAreaView >
        
        {isHaveData ? (
          <Center flex={1}>
            <Text fontWeight={"bold"} fontSize={16}>TIDAK ADA TUGAS HARI INI</Text>
          </Center>
        ) : (
          isLoading ? (
            <Center>
              <Spinner size={"lg"} color={"black"} />
            </Center>
          ):(
            <ScrollView padding={5}>
              <Separator height={20}/>
              {data.map((obj, index) => (
                <React.Fragment key={index}>
                  <Task title={obj.NamaTugas} Deadline={obj.DeadlineTugas} Catatan={obj.TugasCatatan} Foto={obj.LampiranFoto} Warna={dataKategori.find((index) => index.Kategori === obj.KategoriTugas)?.Color } Kategori={obj.KategoriTugas} />
                  <Separator height={5} />
                </React.Fragment>
              ))}
            </ScrollView>
          )
          
        )}
      </SafeAreaView>
    
    </SafeAreaView>
  );
};

export default Home;