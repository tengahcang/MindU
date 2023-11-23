// import { Calendar } from 'react-native-calendario';
import { Calendar, LocaleConfig } from "react-native-calendars";
import {useState} from "react";
import {Task} from "../../components";


import datas from "../../todolist";

import { View } from 'react-native'
import { Box, Text, FlatList } from 'native-base';
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
      <Box rounded="xl" borderWidth={1} m={10} bg="white">
        <Text> {item.title} </Text>
        <Text> {item.date} </Text>
        <Text> {item.content} </Text>
      </Box>
    );
  };


  return (
    <View>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
            <View></View>
            {selectedItems.length > 0 && (
                // <Box borderRadius={"$xl"} borderWidth={1}>
                //     <Text> {selectedItems.title} </Text>
                //     <Text> {selectedItems.date} </Text>
                //     <Text> {selectedItems.content} </Text>
                // </Box>
                <FlatList data={selectedItems} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => <ToDoList item={item}/>}/>
                
                
            )}
      {/* <Calendar
  onChange={(range) => console.log(range)}
  minDate={new Date(2018, 3, 20)}
  startDate={new Date(2018, 3, 30)}
  endDate={new Date(2018, 4, 5)}
  theme={{
    activeDayColor: {
    },
    monthTitleTextStyle: {
      color: '#6d95da',
      fontWeight: '300',
      fontSize: 16,
    },
    emptyMonthContainerStyle: {},
    emptyMonthTextStyle: {
      fontWeight: '200',
    },
    weekColumnsContainerStyle: {},
    weekColumnStyle: {
      paddingVertical: 10,
    },
    weekColumnTextStyle: {
      color: '#b6c1cd',
      fontSize: 13,
    },
    nonTouchableDayContainerStyle: {},
    nonTouchableDayTextStyle: {},
    startDateContainerStyle: {},
    endDateContainerStyle: {},
    dayContainerStyle: {},
    dayTextStyle: {
      color: '#2d4150',
      fontWeight: '200',
      fontSize: 15,
    },
    dayOutOfRangeContainerStyle: {},
    dayOutOfRangeTextStyle: {},
    todayContainerStyle: {},
    todayTextStyle: {
      color: '#6d95da',
      
    },
    activeDayContainerStyle: {
      backgroundColor: '#6d95da',
    },
    activeDayTextStyle: {
      color: 'white',
    },
    nonTouchableLastMonthDayTextStyle: {},
  }}
/> */}
    </View>
  )
}

export default Calender
