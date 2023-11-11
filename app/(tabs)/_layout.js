import { Tabs } from "expo-router";
import { HomeIcon,Categories,AddIcon,CalendarIcon,Settings } from "../../assets/svgs";
import { View } from "react-native";
export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" options={{headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <HomeIcon width={38} height={38} color={focused ? '#2196F3' : '#525151'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="categori" options={{headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <Categories width={38} height={38} color={focused ? '#2196F3' : '#525151'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="add" options={{headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center" ,backgroundColor:"#525151",width:50,height:50,top:-10,borderRadius:25}}>
                        <AddIcon name="Home" width={38} height={38} color={focused ? '#2196F3' : '#fff'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="kalender" options={{headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <CalendarIcon name="Home" width={38} height={38} color={focused ? '#2196F3' : '#525151'}/>
                    </View>
                );
            }}} />
            <Tabs.Screen name="setting" options={{headerShown: false,tabBarIcon:({focused})=>{
                return(
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <Settings name="Home" width={38} height={38} color={focused ? '#2196F3' : '#525151'}/>
                    </View>
                );
            }}} />
        </Tabs>
    );
}