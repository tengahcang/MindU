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


  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      // Ambil data dari AsyncStorage
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        const valueObject = JSON.parse(value);
        // Update value state bernama "data"
        setUserData(valueObject);
        // console.log(userData.email);
        // Fetch Data
        fetchData(valueObject);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const fetchData = (userData) => {
    const uid = userData.credential.user.uid;
    // Mendefinisikan Ref
    const dataRef = firebase.database().ref("Task/" + uid);

    // Memantau perubahan Data di Firebase
    // dataRef.on("value", (snapshot) => {
    //   const dataValue = snapshot.val();
    //   if (dataValue != null) {
    //     const snapshotArr = Object.entries(dataValue).map((item) => {
    //       return {
    //         id: item[0],
    //         ...item[1],
    //       };
    //     });
    //     setData(snapshotArr);
    //   }
    //   setIsLoading(false);
    // });

    // Ambil Data dari Firebase
    dataRef
      .once("value")
      .then((snapshot) => {
        const dataValue = snapshot.val();
        if (dataValue != null) {
          // Dirapikan datanya disusun menjadi Array of Object
          const snapshotArr = Object.entries(dataValue).map((item) => {
            return {
              id: item[0],
              ...item[1],
            };
          });

          // Mengupdate State yang bernama "data"
          setData(snapshotArr);
          console.log(data)
        }
        setIsLoading(false);
        

      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#D5DEEF',}}>
      <NavbarTopNew name={ userData.email } />
      <Box background={'white'} w={173} h={27} borderRadius={12} marginTop={3} marginLeft={2} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={12} fontWeight={'semibold'}>Selasa, 24 Desember 2023</Text>
      </Box>
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
                <Task title={obj.NamaTugas} Deadline={obj.DeadlineTugas} Catatan={obj.TugasCatatan} Foto={obj.LampiranFoto} />
                <Separator height={5} />
              </React.Fragment>
            ))}
            
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
            
            {/* <Text>({data})</Text> */}
          </ScrollView>
        )
        
      )}
    </SafeAreaView>
  );
};

export default Home;