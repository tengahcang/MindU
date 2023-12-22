import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, FlatList, ScrollView, Separator, Text } from 'native-base';
import { Task } from '../../components';
import datas from '../../todolist';
import { useEffect } from 'react';

const Calender = ( task ) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]); // Initialize with an empty array
  const [data,setData] = useState();
  useEffect(() => {
    // const dataref = JSON.parse(task)
    // setData(dataref);
    console.log(task);
  }, [task]);
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

  // const ToDoList = ({ item }) => {
  //   return (
  //   <ScrollView padding={5}>
  //     <Separator height={20}/>
  //     {data.map((obj, index) => (
  //       <React.Fragment key={index}>
  //         <Task title={obj.NamaTugas} Deadline={obj.DeadlineTugas} Catatan={obj.TugasCatatan} Foto={obj.LampiranFoto} Warna={dataKategori.find((index) => index.Kategori === obj.KategoriTugas)?.Color } Kategori={obj.KategoriTugas} />
  //         <Separator height={5} />
  //       </React.Fragment>
  //     ))}
  //   </ScrollView>
  //   );
  // };

  return (
    <View>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
      {/* {selectedItems && selectedItems.length > 0 && (
        <FlatList
          data={selectedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ToDoList item={item} />}
        />
      )} */}
      {/* {data.map(item => (
        <Text key={item.id}> {item.NamaTugas} </Text>
      ))} */}
      {/* {Object.keys(data).map((key,index) => (
        <Text key={index}>Nama Tugas: {task[key].NamaTugas}</Text>
      ))} */}

      {/* {task && task.NamaTugas && (
        <Text> {task.NamaTugas} </Text>
      )}
      <Text> {} </Text> */}
      {/* <Text> {data} </Text> */}
    </View>
    
  );
};

export default Calender;