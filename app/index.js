import { Redirect } from "expo-router"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";



const StartPage =()=>{
  const [userData, setUserData] = useState({});

  useEffect( async() => {
    try {
      const value = await AsyncStorage.getItem("user-data");
      if ( value !== null ) {
        const valueObject = JSON.parse(value);
        setUserData(valueObject);
        return <Redirect href="/detail-task/detail-task"/>
      } else {
        
      }
    } catch (error) {
      console.error(error)
    }
  },[]);
  if (userData !== null && Object.keys(userData).length !== 0) {
    
    return <Redirect href="/Onboarding/Onboarding" />;
  } else {
    return <Redirect href="/detail-task/detail-task" />;
  }
};

export default StartPage;