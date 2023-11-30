import { Tabs } from "expo-router";
import { HomeIcon,Categories,AddIcon,CalendarIcon,Settings } from "../../assets/svgs";
import { View } from "react-native";
export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" options={{title:"",headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center",paddingTop:20 }}>
                        <HomeIcon width={35} height={35} color={focused ? '#003554' : '#8AAEED'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="categori" options={{title:"",headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center",paddingTop:15}}>
                        <Categories width={34} height={30} color={focused ? '#003554' : '#8AAEED'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="add" options={{title:"",headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center",backgroundColor:"#8AAEED",width:50,height:50,top:-10,borderRadius:25}}>
                        <AddIcon name="Home" width={35} height={35} color={focused ? '#003554' : '#fff'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="kalender" options={{title:"",headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center",paddingTop:20}}>
                        <CalendarIcon name="Home" width={35} height={35} color={focused ? '#003554' : '#8AAEED'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="setting" options={{title:"",headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center",paddingTop:20}}>
                        <Settings name="Home" width={35} height={35} color={focused ? '#003554' : '#8AAEED'}/>
                    </View>
                );
            }}} />
        </Tabs>
    );
}