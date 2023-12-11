import { Calendar } from "react-native-calendars";
import {useState} from "react";
import {Separator, Task} from "../../components";
import datas from "../../todolist";
import { View, FlatList, ScrollView } from 'native-base';
import React from 'react'

const Calender = () => {
  const[selectedDate,setSelectedDate]=useState('');
  const[selectedItems,setSelectedItems]=useState([]);
  const handleDayPress = (day) => {
      const selectedDateString = day.dateString;
      setSelectedDate(selectedDateString);
      const selectedItems = datas.filter((item)=>item.date === selectedDateString);
      setSelectedItems(selectedItems);
  };

  const markedDates= {};
  datas.forEach((item) => {
      markedDates[item.date] = {selected: true, disableTouchEvent:false, selectedDotColor: 'orange'};
  });
  const ToDoList = ({ item }) => {
    return(
      <ScrollView p={3}>
        <Task title={item.title}/>
      </ScrollView>
    );
  };


  return (
    <View>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
            {selectedItems.length > 0 && (
                // <Box borderRadius={"$xl"} borderWidth={1}>
                //     <Text> {selectedItems.title} </Text>
                //     <Text> {selectedItems.date} </Text>
                //     <Text> {selectedItems.content} </Text>
                // </Box>
                <FlatList data={selectedItems} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => <ToDoList item={item}/>}/>
                
                
            )}
    </View>
  )
}

export default Calender;
