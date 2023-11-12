import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AddImageIcon } from '../../assets/svgs'
import { PrimaryButton ,Separator} from '../../components'
import { Center } from 'native-base'
const AddImageTask = () => {
  return (
    <View>
      <View style={{borderColor:"black" , borderStyle:"solid",borderWidth:2 , height:250 , justifyContent:"center" ,alignItems:'center'}}>
        <TouchableOpacity>
          <Center>
            <AddImageIcon/>
            <Text>Tambah Foto</Text>
          </Center>
        </TouchableOpacity>
      </View>
      <Separator height={300}/>
      <View style={{padding:10}}>
          <PrimaryButton title="Simpan" color="#2196F3"/>
      </View>
    </View>

  )
}

export default AddImageTask