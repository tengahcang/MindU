import React, {useState, useEffect} from 'react';
import { View, Text } from "@gluestack-ui/themed"
import { styled } from "@gluestack-style/react"
import {FlatList, TouchableOpacity} from 'react-native';


const Categories = () => {
    const [kategori, setKategori] = useState(
        [
            {
                nama: 'Kuliah'
            },
            {
                nama: 'Rumah'
            },
            {
                nama: 'Kerja'
            },
        ]
    );

    const [kategoriSeleksi, setKategoriSeleksi] = useState({
        nama: 'Kuliah',
    })

    return (
        <View marginTop={150}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20, padding: 10}}> Kategori</Text>
            <FlatList 
            data={kategori}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity 
              style={{
                marginRight: 10, 
    backgroundColor: kategoriSeleksi.nama == item.nama ? '#2196F3' : '#A4A4A4', 
    elevation: 3,
    paddingHorizontal: 20, 
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 15,
    marginLeft: 10,
    width: 100,
    height: 35,
              }}>
                    <Text color={'white'} fontWeight={'bold'}>{item.nama}</Text>
                </TouchableOpacity>
            )}
            />
            </View>
        </View>
    );
};
export default Categories;

// const menu = {
//     marginRight: 10, 
//     backgroundColor: kategoriSeleksi.nama == item.nama ? '#2196F3' : '#A4A4A4', 
//     elevation: 3,
//     paddingHorizontal: 20, 
//     paddingVertical: 8,
//     marginBottom: 10,
//     borderRadius: 15,
//     marginLeft: 5,
//     width: 110,
// }
