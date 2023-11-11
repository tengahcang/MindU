import { Redirect } from "expo-router"

const noHead = { headerShown: false };

const StartPage =()=>{
  return <Redirect href="/login/login" options={noHead}/>
}

export default StartPage;