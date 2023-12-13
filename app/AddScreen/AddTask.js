import { View, Button ,Input,Text,TextArea, ScrollView, FormControl} from 'native-base'
import React ,{useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Separator, PrimaryButton ,UploadMedia} from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
const add = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [Tugas,setTugas] = useState("");
  const [Catatan,setCatatan] = useState("");
  const [Deadline,setDeadline] = useState(new Date().toLocaleString());
  const simpan = () =>{
    console.log(Tugas,Catatan,Deadline)
  }

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeTime = (event, selectedDate) => {
    setShowTimePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
    setShowTimePicker(false); // Menutup TimePicker jika terbuka
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
    setShowDatePicker(false); // Menutup DatePicker jika terbuka
  };
  return (
    <View style={{backgroundColor:'#D5DEEF'}} h={"100%"}>

      <SafeAreaView>
        <Stack.Screen options={{headerTitle:"Add Task"}}/>
        <ScrollView >
          <FormControl>
            <View p={4}>
              <Text fontSize={20}>Nama Tugas</Text>
              <Input size="lg" placeholder="Isi Nama Tugas" onChangeText={(Tugas) => setTugas(Tugas)} />
              <Text fontSize={20}>Tugas Catatan</Text>
              <TextArea size="lg" placeholder="Isi Catatan Tugas" onChangeText={(Catatan) => setCatatan(Catatan)} />
              <Text fontSize={20}>Deadline Tugas</Text>
            {/* Button to show DateTimePicker for Date */}
            </View>
            <View p={4}>
            <Button onPress={showDatepicker}>
              <Text>Pick a Date</Text>
            </Button>
            <Separator height={20}/>
            {/* Button to show DateTimePicker for Time */}
            <Button onPress={showTimepicker}>
              <Text>Pick a Time</Text>
            </Button>

            {/* Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}

            {/* Time Picker */}
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode={"time"}
                is24Hour={true}
                onChange={onChangeTime}
              />
            )}
            <Separator height={20}/>
            {/* Display selected date and time */}
            <Input size="lg" placeholder="Isi Deadline Tugas" value={Deadline} onChangeDate={(newDeadline)=>setDeadline(newDeadline)} />

            <UploadMedia/>
            </View>
            <View p={10}>
              <PrimaryButton title="Simpan" color="#2196F3" onPress={()=>simpan()}/>
            </View>
          </FormControl>
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default add;