import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, FlatList, ScrollView } from 'native-base';
import { Task } from '../../components';
import datas from '../../todolist';

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]); // Initialize with an empty array

  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    setSelectedDate(selectedDateString);
    const selectedItems = datas.filter((item) => item.date === selectedDateString);
    setSelectedItems(selectedItems);
  };

  const markedDates = {};
  datas.forEach((item) => {
    markedDates[item.date] = { selected: true, disableTouchEvent: false, selectedDotColor: 'orange' };
  });

  const ToDoList = ({ item }) => {
    return (
      <ScrollView p={3}>
        <Task title={item.namatask} />
      </ScrollView>
    );
  };

  return (
    <View>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
      {selectedItems && selectedItems.length > 0 && (
        <FlatList
          data={selectedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ToDoList item={item} />}
        />
      )}
    </View>
  );
};

export default Calender;
